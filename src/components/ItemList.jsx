import { useState } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import { ACTIONS } from '../context/reducer';
import './ItemList.css';

export const ItemList = () => {
  const { state, dispatch } = useGlobalContext();
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
  });

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditFormData({
      title: item.title,
      description: item.description,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveEdit = (id) => {
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
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro que deseas eliminar este elemento?')) {
      dispatch({
        type: ACTIONS.DELETE_ITEM,
        payload: id,
      });
    }
  };

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
      <h2>Elementos</h2>
      <div className="items-container">
        {state.items.map((item) => (
          <div key={item.id} className="item-card">
            {editingId === item.id ? (
              <div className="item-edit-form">
                <div className="form-group">
                  <label htmlFor={`edit-title-${item.id}`}>Título:</label>
                  <input
                    type="text"
                    id={`edit-title-${item.id}`}
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`edit-description-${item.id}`}>
                    Descripción:
                  </label>
                  <textarea
                    id={`edit-description-${item.id}`}
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    rows="3"
                  />
                </div>

                <div className="edit-actions">
                  <button
                    onClick={() => handleSaveEdit(item.id)}
                    className="btn btn-success"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="item-display">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="item-actions">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="btn btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
