
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/hl7';

const getHL7Messages = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los mensajes HL7:', error);
    throw error;
  }
};

export default getHL7Messages
