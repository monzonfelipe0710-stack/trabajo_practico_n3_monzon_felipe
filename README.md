# Trabajo Práctico N°3 - Estado Global con Context API y useReducer

**Materia:** Taller de Lenguajes de Programación III (React Native)  
**Docente a cargo:** Rolón Lautaro Emanuel  
**Docente auxiliar:** Mereles Juliana Aracelli  
**Estudiante:** Felipe Monzón

## Descripción

Este proyecto implementa un sistema de gestión de elementos utilizando **Context API** y **useReducer** en React con Vite. La aplicación permite agregar, editar y eliminar elementos de forma centralizada utilizando estado global.

## Características Principales

✅ **Context API**: Implementación de contexto global para gestionar el estado de la aplicación  
✅ **useReducer**: Patrón reducer para manejar acciones complejas  
✅ **Operaciones CRUD**: Agregar, editar y eliminar elementos  
✅ **Código Organizado**: Código bien organizado y modularizado  
✅ **Interfaz Responsiva**: Diseño moderno con estilos CSS profesionales

## Componentes Principales

### Context (`src/context/`)

#### 1. **reducer.js**
Define el reducer que gestiona el estado global:
- **Acciones disponibles:**
  - `ADD_ITEM`: Agrega un nuevo elemento (genera ID automático)
  - `EDIT_ITEM`: Edita un elemento existente
  - `DELETE_ITEM`: Elimina un elemento
  - `SET_ITEMS`: Establece la lista completa de elementos

```javascript
export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_ITEMS: 'SET_ITEMS',
};
```

#### 2. **GlobalContext.jsx**
Crea el contexto global y el Provider:
```javascript
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
```

#### 3. **useGlobalContext.js**
Hook personalizado para consumir el contexto:
```javascript
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext debe ser usado dentro de GlobalProvider');
  }
  return context;
};
```

### Componentes (`src/components/`)

#### 1. **AddItem.jsx**
Componente para agregar nuevos elementos:
- Formulario con campos de título y descripción
- Validación de campos
- Dispatch de acción `ADD_ITEM`
- Limpieza del formulario después de agregar

#### 2. **ItemList.jsx**
Componente para mostrar y gestionar elementos:
- Listado dinámico de elementos
- Edición inline de elementos
- Eliminación con confirmación
- Manejo de estado de edición local
- Responsivo con grid layout

## Estructura del Proyecto

```
src/
├── context/
│   ├── reducer.js           # Lógica del reducer
│   ├── GlobalContext.jsx    # Contexto y Provider
│   └── useGlobalContext.js  # Hook personalizado
├── components/
│   ├── AddItem.jsx          # Componente agregar
│   ├── AddItem.css
│   ├── ItemList.jsx         # Componente listar/editar/eliminar
│   └── ItemList.css
├── App.jsx                  # Componente principal
├── App.css                  # Estilos globales
├── main.jsx                 # Punto de entrada
└── index.css
```

## Cómo Usar

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### Construcción

```bash
npm run build
```

## Funcionalidades Implementadas

### 1. Agregar Elemento
- Acceder a la sección "Agregar Nuevo Elemento"
- Completar los campos de título y descripción
- Hacer clic en "Agregar Elemento"
- El elemento se agregará a la lista instantáneamente

### 2. Editar Elemento
- Hacer clic en el botón "Editar" en un elemento
- Modificar los datos en el formulario inline
- Hacer clic en "Guardar" para confirmár los cambios
- O hacer clic en "Cancelar" para descartar cambios

### 3. Eliminar Elemento
- Hacer clic en el botón "Eliminar" en un elemento
- Confirmar en el diálogo de confirmación
- El elemento se eliminará de la lista

## Uso de Context API y useReducer

### Ventajas Implementadas

1. **Centralización del Estado**: Todo el estado global está en un solo lugar
2. **Escalabilidad**: Fácil agregar nuevas acciones al reducer
3. **Debugging**: Mejor trazabilidad con acciones explícitas
4. **Performance**: Evita prop drilling (pasar props a través de múltiples componentes)
5. **Mantenibilidad**: Código más organizado y fácil de entender

### Flujo de Datos

```
GlobalProvider (Root)
    ↓
GlobalContext.Provider
    ↓
useGlobalContext (en componentes)
    ↓
dispatch(action)
    ↓
reducer (actualiza estado)
    ↓
Components re-render
```

## Requisitos Cumplidos

- ✅ Implementación de Context API con `createContext`
- ✅ Provider funcionando correctamente
- ✅ Hook `useContext` personalizado
- ✅ Reducer con máximo de acciones (ADD, EDIT, DELETE)
- ✅ Acciones mínimas implementadas y funcionando
- ✅ Código bien organizado en módulos
- ✅ Interfaz de usuario funcional
- ✅ README con explicación de implementación

## Tecnologías Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool moderno
- **Context API** - Gestión de estado global
- **useReducer** - Hook para lógica compleja de estado
- **CSS3** - Estilos modernos y responsivos

## Notas de Desarrollo

- El ID de cada elemento se genera automáticamente usando `Date.now()`
- Los elementos se almacenan en el array `items` del estado global
- La edición se realiza inline sin recargar la página
- Los cambios son instantáneos gracias al contexto global
- El proyecto está listo para agregar persistencia con localStorage si es necesario

## Autor

Felipe Monzón

## Fecha de Entrega

Mayo 2026
