import { useState, useEffect } from 'react';
import getHL7Messages from '../Service/HL7Service';
import io from 'socket.io-client';
import SendMessage from '../components/navbar/SendMessage';
import Search from '@/components/search';

const HL7Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState(0);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const hours = dateStr.slice(8, 10);
    const minutes = dateStr.slice(10, 12);
    const seconds = dateStr.slice(12, 14);
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getHL7Messages();
        const parsedMessages = data
          .trim()
          .split('\n')
          .map((msg) => JSON.parse(msg));
        setMessages(parsedMessages);
      } catch (error) {
        setError('Error al obtener los mensajes.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    const socket = io('http://localhost:8000');

    socket.on('newHL7Message', (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    socket.on('newConnection', (clientCount) => {
      setConnectedUsers(clientCount);
    });

    return () => {
      socket.off('newConnection');
      socket.off('newHL7Message');
    };
  }, []);

  const handleSearchResults = (searchResults) => {
    console.log('Resultados de búsqueda:', searchResults);
    setMessages(searchResults);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Search onSearchResults={handleSearchResults} />
      <div className="container is-flex is-flex-direction-column is-align-items-center">
        <h1 className="title is-3">Resultados</h1>

        <div className="box hl7-messages" style={{ maxHeight: '100%', overflowY: 'auto', width: '100%', maxWidth: '100%' }}>
          {messages.length > 0 ? (
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Control ID</th>
                  <th>Order Number</th>
                  <th>Tipo de Mensaje</th>
                  <th>Aplicación Emisora</th>
                  <th>ID del Paciente</th>
                  <th>Nombre del Paciente</th>
                  <th>Fecha del Estudio</th>
                  <th>Nombre del Estudio</th>
                  <th>fin</th>
                  <th>Clave o Nombre</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
  {messages.slice().reverse().map((message, index) => {
    console.log('Mensaje:', message); // Verifica el contenido del mensaje

    return Array.isArray(message.OBX) ? (
      message.OBX.map((obx, obxIndex) => (
        <tr key={obxIndex}>
          <td>{message.MSH?.controlId || 'No disponible'}</td>
          <td>{message.OBR?.orderNumber || 'No disponible'}</td>
          <td>{message.MSH?.messageType || 'No disponible'}</td>
          <td>{message.MSH?.sendingApplication || 'No disponible'}</td>
          <td>{message.PID?.patientId || 'No disponible'}</td>
          <td>{message.PID?.patientName || 'No disponible'}</td>
          <td>{formatDate(message.PID?.dob)}</td>
          <td>{message.OBR?.testName || 'No disponible'}</td>
          <td>{formatDate(message.OBR?.testDate)}</td>
          <td>{obx.name}</td>
          <td>{obx.results}</td>
          <td>{formatDate(obx.resultsDate)}</td>
        </tr>
      ))
    ) : (
      <tr key={index}>
        <td colSpan="12">No hay datos disponibles para este mensaje</td>
      </tr>
    );
  })}
</tbody>

            </table>
          ) : (
            <p>No hay mensajes disponibles.</p>
          )}
        </div>

        <SendMessage />

        <h2 className="subtitle is-4">Usuarios Conectados: {connectedUsers}</h2>
      </div>
    </>
  );
};

export default HL7Messages;
