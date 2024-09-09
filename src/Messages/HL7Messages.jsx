import { useState, useEffect } from 'react';
import getHL7Messages from '../Service/HL7Service';
import io from 'socket.io-client'
import SendMessage from '../components/navbar/SendMessage';

const HL7Messages = () => {
  const [messages, setMessages] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getHL7Messages();
        setMessages(data);
      } catch (error) {
        setError('Error al obtener los mensajes.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    const socket = io('http://localhost:8000')

    socket.on('newConnection', (clientCount) => {
      setConnectedUsers(clientCount);
    });


    return () => {
      socket.off('newConnection');
    };
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container is-flex is-flex-direction-column is-align-items-center">
    <h1 className="title is-3">Mensajes</h1>

    <div className="box hl7-messages" style={{ maxHeight: '300px', overflowY: 'auto', width: '100%', maxWidth: '800px' }}>
      <pre>{messages}</pre>
    </div>

    <SendMessage />

    <h2 className="subtitle is-4">Usuarios conectados: {connectedUsers}</h2>
  </div>
  );
};

export default HL7Messages;
