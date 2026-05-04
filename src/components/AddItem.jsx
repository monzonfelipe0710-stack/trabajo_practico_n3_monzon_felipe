import { useState } from 'react';
import { useGlobalContext } from '../context/useGlobalContext';
import { ACTIONS } from '../context/reducer';
import './AddItem.css';

export const AddItem = () => {
  const { dispatch } = useGlobalContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Por favor ingresa un título');
      return;
    }

    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: formData,
    });

    setFormData({
      title: '',
      description: '',
    });
  };

  return (
    <div className="add-item">
      <h2>Agregar Nuevo Elemento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ingresa un título"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ingresa una descripción"
            rows="4"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Elemento
        </button>
      </form>
    </div>
  );
};
