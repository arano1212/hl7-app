import { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearchResults }) => {
  const [nombreEstudio, setNombreEstudio] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreEstudio) {
      setError('Por favor ingresa un nombre de estudio.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/search', {
        params: { nombreestudio: nombreEstudio },
      });

      onSearchResults(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError(error.response?.data?.message || 'Error al enviar la solicitud');
    }
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nombre Estudio</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Ingresa Nombre del Estudio"
              value={nombreEstudio}
              onChange={(e) => setNombreEstudio(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-success" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Search;
