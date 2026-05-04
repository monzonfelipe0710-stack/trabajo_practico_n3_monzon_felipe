import { useState, useCallback, useMemo, memo } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import { ACTIONS } from '../context/reducer';
import './ItemList.css';

// Componente Card para mostrar el elemento
const ItemCard = memo(({ item, isEditing, editFormData, onEditClick, onSaveEdit, onCancel, onEditChange, onDelete }) => {
  return (
    <div className="item-card">
      {isEditing ? (
        <div className="item-edit-form">
          <div className="form-group">
            <label htmlFor={`edit-title-${item.id}`}>Título:</label>
            <input
              type="text"
              id={`edit-title-${item.id}`}
              name="title"
              value={editFormData.title}
              onChange={onEditChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`edit-description-${item.id}`}>Descripción:</label>
            <textarea
              id={`edit-description-${item.id}`}
              name="description"
              value={editFormData.description}
              onChange={onEditChange}
              rows="3"
            />
          </div>

          <div className="edit-actions">
            <button onClick={onSaveEdit} className="btn btn-success">
              Guardar
            </button>
            <button onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="item-display">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="item-actions">
            <button onClick={onEditClick} className="btn btn-edit">
              Editar
            </button>
            <button onClick={onDelete} className="btn btn-delete">
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ItemCard.displayName = 'ItemCard';

const ItemListComponent = () => {
  const { state, dispatch } = useGlobalContext();
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
  });

  // Optimizado con useCallback
  const handleEditClick = useCallback((item) => {
    setEditingId(item.id);
    setEditFormData({
      title: item.title,
      description: item.description,
    });
  }, []);

  // Optimizado con useCallback
  const handleEditChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Optimizado con useCallback
  const handleSaveEdit = useCallback((id) => {
    if (!editFormData.title.trim()) {
      alert('Por favor ingresa un título');
      return;
    }

    dispatch({
      type: ACTIONS.EDIT_ITEM,
      payload: {
        id,
        data: editFormData,
      },
    });

    setEditingId(null);
  }, [editFormData, dispatch]);

  // Optimizado con useCallback
  const handleCancel = useCallback(() => {
    setEditingId(null);
  }, []);

  // Optimizado con useCallback
  const handleDelete = useCallback((id) => {
    if (confirm('¿Estás seguro que deseas eliminar este elemento?')) {
      dispatch({
        type: ACTIONS.DELETE_ITEM,
        payload: id,
      });
    }
  }, [dispatch]);

  // Optimizado con useMemo para calcular items memoizados
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

  if (state.items.length === 0) {
    return (
      <div className="item-list">
        <h2>Elementos</h2>
        <p className="empty-state">No hay elementos registrados</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      <h2>Elementos ({state.items.length})</h2>
      <div className="items-container">{renderedItems}</div>
    </div>
  );
};

// Envolver con memo para evitar re-renders innecesarios
export const ItemList = memo(ItemListComponent);
