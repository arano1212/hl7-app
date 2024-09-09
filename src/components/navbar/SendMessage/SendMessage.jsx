import axios from 'axios';
import { useState } from 'react';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/hl7', message, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      setResponse('Mensaje enviado con éxito', res);
    } catch (error) {
      setResponse('Error al enviar el mensaje', error);
    }
  };

  return (
    <div className="container">
    <h1 className="title">Enviar Mensaje</h1>
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">HL7</label>
        <div className="control">
          <textarea
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe el mensaje HL7 aquí"
          />
        </div>
      </div>
      <div className="control">
        <button className="button is-primary" type="submit">
          Enviar
        </button>
      </div>
    </form>
    <div className="notification">
      <p>{response}</p>
    </div>
  </div>
  );
};

export default SendMessage;
