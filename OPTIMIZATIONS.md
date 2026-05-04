# Trabajo Práctico N°4 - Optimizaciones de Performance

## Rama: `feature/tp4-optimizations`

Este trabajo implementa optimizaciones de performance en la aplicación desarrollada en TP N°3 utilizando:
- **React.memo**
- **useMemo**
- **useCallback**

## Cambios Implementados

### 1. React.memo en Componentes

#### AddItem.jsx
```jsx
const AddItemComponent = () => {
  // ... implementación
};

export const AddItem = memo(AddItemComponent);
```

**Beneficio:** El componente AddItem no se re-renderiza si sus props no cambian, evitando renders innecesarios cuando otros componentes se actualizan.

#### ItemList.jsx
```jsx
const ItemListComponent = () => {
  // ... implementación
};

export const ItemList = memo(ItemListComponent);
```

**Beneficio:** Previene re-renders innecesarios del ItemList cuando los cambios no afectan sus props.

#### ItemCard (nuevo subcomponente)
```jsx
const ItemCard = memo(({ item, isEditing, ... }) => {
  // ... implementación
});
```

**Beneficio:** Cada card se memoiza individualmente, permitiendo que solo re-rendericen si sus props específicas cambian.

### 2. useCallback para Funciones

En **AddItem.jsx**:
```javascript
const handleChange = useCallback((e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}, []);

const handleSubmit = useCallback((e) => {
  // ... lógica
}, [formData, dispatch]);
```

**Beneficio:** 
- Las funciones mantienen la misma referencia entre renders
- Se evita crear nuevas funciones innecesariamente
- Las dependencias se especificaran explícitamente

En **ItemList.jsx**:
```javascript
const handleEditClick = useCallback((item) => {
  setEditingId(item.id);
  setEditFormData({ ... });
}, []);

const handleEditChange = useCallback((e) => {
  // ... actualización de formulario
}, []);

const handleSaveEdit = useCallback((id) => {
  // ... lógica de guardado
}, [editFormData, dispatch]);

const handleCancel = useCallback(() => {
  setEditingId(null);
}, []);

const handleDelete = useCallback((id) => {
  // ... lógica de eliminación
}, [dispatch]);
```

**Beneficio:**
- Las funciones se pasan estables a componentes memoizados
- Evita re-renders de ItemCard causados por referencias nuevas de funciones
- Mejora signi ficativa en performance con muchos elementos

### 3. useMemo para Cálculos

En **ItemList.jsx**:
```javascript
const renderedItems = useMemo(() => {
  return state.items.map((item) => (
    <ItemCard
      key={item.id}
      item={item}
      isEditing={editingId === item.id}
      editFormData={editFormData}
      onEditClick={() => handleEditClick(item)}
      onSaveEdit={() => handleSaveEdit(item.id)}
      onCancel={handleCancel}
      onEditChange={handleEditChange}
      onDelete={() => handleDelete(item.id)}
    />
  ));
}, [state.items, editingId, editFormData, handleEditClick, handleSaveEdit, handleCancel, handleEditChange, handleDelete]);
```

**Beneficio:**
- La lista de items renderizados se memoiza
- Solo se recalcula cuando las dependencias cambian
- Evita recrear el array de componentes en cada render
- Especialmente útil con listas grandes

## Estructura de Optimización

```
App (sin cambios necesarios)
  ↓
GlobalProvider
  ↓
├── AddItem (memo)
│   ├── useCallback: handleChange, handleSubmit
│   └── Evita re-renders innecesarios
│
└── ItemList (memo)
    ├── useCallback: handleEditClick, handleEditChange, handleSaveEdit, handleCancel, handleDelete
    ├── useMemo: renderedItems
    └── ItemCard (memo) - Subcomponentes
        └── Solo re-renderiza si sus props cambian
```

## Impacto de Performance

### Antes (TP N°3)
- Componentes se renderizan en cada cambio de estado global
- Funciones se crean nuevamente en cada render
- No hay memoización de cálculos

### Después (TP N°4)
- Componentes solo se renderizan si sus props cambian (memo)
- Funciones mantienen referencias estables (useCallback)
- Cálculos se reutilizan (useMemo)
- **Menos renders = Mejor performance**

## Casos de Uso Optimizados

1. **Agregar un elemento**: Solo AddItem se renderiza + el nuevo ItemCard
2. **Editar un elemento**: Solo ese ItemCard se re-renderiza
3. **Eliminar un elemento**: ItemList recalcula (necesario), otros componentes no se afectan
4. **Navegar en la aplicación**: Los componentes no se renderizan sin necesidad

## Pruebas de Performance

Para verificar el impacto:
1. Abrir herramientas de desarrollador (F12)
2. Ir a la pestaña Performance o Profiler de React
3. Grabar mientras interactúas
4. Observar cuáles componentes se renderizan

## Ventajas Implementadas

✅ **Reducción de renders innecesarios**  
✅ **Referencias estables de funciones**  
✅ **Memoización de cálculos complejos**  
✅ **Mejor escalabilidad con muchos elementos**  
✅ **Código más optimizado y profesional**  

## Notas Importantes

- `displayName` se agregó a ItemCard para mejor debugging
- Las dependencias de useCallback y useMemo se especifican correctamente
- El componente ItemCard se extrae para mejor memoización
- Toda funcionalidad del TP N°3 se mantiene sin cambios

## Conclusiones

Las optimizaciones implementadas significan:
- **Mejor UX**: La aplicación responde más rápido
- **Más eficiente**: Menos trabajo para React
- **Escalable**: Puede manejar más elementos sin degradación de performance
- **Profesional**: Implementación de best practices de React
