import { useState } from 'react';
import axios from 'axios';

const HL7Form = () => {
  const [mshFields, setMshFields] = useState({
    sendingApplication: '',
    dateTime: '',
    messageType: '',
    controlId: '',
    processingId: '',
  });

  const [pidFields, setPidFields] = useState({
    patientId: '',
  });

  const [obrFields, setObrFields] = useState({
    orderNumber: '',
    testDate: '',
    testName: '',
  });

  const [obxFields, setObxFields] = useState([
    { id: 1, name: '', result: '', units: '' },
  ]);

  const handleChangeMsh = (e) => {
    setMshFields({ ...mshFields, [e.target.name]: e.target.value });
  };

  const handleChangePid = (e) => {
    setPidFields({ ...pidFields, [e.target.name]: e.target.value });
  };

  const handleChangeObr = (e) => {
    setObrFields({ ...obrFields, [e.target.name]: e.target.value });
  };

  const handleChangeObx = (index, e) => {
    const updatedObx = [...obxFields];
    updatedObx[index][e.target.name] = e.target.value;
    setObxFields(updatedObx);
  };

  const addObx = () => {
    setObxFields([...obxFields, { id: obxFields.length + 1, name: '', result: '', units: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hl7Message = `
      MSH|^~\\&|${mshFields.sendingApplication}|||||${mshFields.dateTime}||${mshFields.messageType}|${mshFields.controlId}|${mshFields.processingId}|2.3.1||||0||ASCII|||
      PID|${pidFields.patientId}||||||||||||||||||||||||||||
      OBR|${obrFields.orderNumber}|||${obrFields.testName}|N|${obrFields.testDate}|${obrFields.testDate}||||||||||||
      ${obxFields.map((obx, idx) => `OBX|${idx + 1}|NM||${obx.name}|${obx.result}|${obx.units}|N|||F||${obx.result}|||||0|`).join('\n')}
    `;

    try {
      const response = await axios.post('http://localhost:8000/hl7', { hl7Message });
      console.log('Mensaje enviado:', response.data);
    } catch (error) {
      console.error('Error al enviar el mensaje HL7:', error);
    }
  };

  return (
    <div className="container mt-5">
    <h1 className="title is-3 has-text-centered">Enviar Mensaje HL7</h1>
    <form onSubmit={handleSubmit}>
    
      <div className="box">
        <h3 className="title is-4">MSH</h3>
        <div className="field">
          <label className="label">Sending Application:</label>
          <div className="control">
            <input className="input" type="text" name="sendingApplication" value={mshFields.sendingApplication} onChange={handleChangeMsh} />
          </div>
        </div>
        <div className="field">
          <label className="label">Date/Time:</label>
          <div className="control">
            <input className="input" type="text" name="dateTime" value={mshFields.dateTime} onChange={handleChangeMsh} />
          </div>
        </div>
        <div className="field">
          <label className="label">Message Type:</label>
          <div className="control">
            <input className="input" type="text" name="messageType" value={mshFields.messageType} onChange={handleChangeMsh} />
          </div>
        </div>
        <div className="field">
          <label className="label">Control ID:</label>
          <div className="control">
            <input className="input" type="text" name="controlId" value={mshFields.controlId} onChange={handleChangeMsh} />
          </div>
        </div>
        <div className="field">
          <label className="label">Processing ID:</label>
          <div className="control">
            <input className="input" type="text" name="processingId" value={mshFields.processingId} onChange={handleChangeMsh} />
          </div>
        </div>
      </div>
  
    
      <div className="box">
        <h3 className="title is-4">PID</h3>
        <div className="field">
          <label className="label">Patient ID:</label>
          <div className="control">
            <input className="input" type="text" name="patientId" value={pidFields.patientId} onChange={handleChangePid} />
          </div>
        </div>
      </div>
  
      
      <div className="box">
        <h3 className="title is-4">OBR</h3>
        <div className="field">
          <label className="label">Order Number:</label>
          <div className="control">
            <input className="input" type="text" name="orderNumber" value={obrFields.orderNumber} onChange={handleChangeObr} />
          </div>
        </div>
        <div className="field">
          <label className="label">Test Name:</label>
          <div className="control">
            <input className="input" type="text" name="testName" value={obrFields.testName} onChange={handleChangeObr} />
          </div>
        </div>
        <div className="field">
          <label className="label">Test Date:</label>
          <div className="control">
            <input className="input" type="text" name="testDate" value={obrFields.testDate} onChange={handleChangeObr} />
          </div>
        </div>
      </div>
  
      
      <div className="box">
        <h3 className="title is-4">OBX</h3>
        {obxFields.map((obx, index) => (
          <div key={obx.id} className="box">
            <div className="field">
              <label className="label">OBX {obx.id} Name:</label>
              <div className="control">
                <input className="input" type="text" name="name" value={obx.name} onChange={(e) => handleChangeObx(index, e)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Result:</label>
              <div className="control">
                <input className="input" type="text" name="result" value={obx.result} onChange={(e) => handleChangeObx(index, e)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Units:</label>
              <div className="control">
                <input className="input" type="text" name="units" value={obx.units} onChange={(e) => handleChangeObx(index, e)} />
              </div>
            </div>
          </div>
        ))}
        <button className="button is-info is-light" type="button" onClick={addObx}>Agregar OBX</button>
      </div>
  
      <div className="control">
        <button className="button is-primary" type="submit">Enviar Mensaje</button>
      </div>
    </form>
  </div>
  
  );
};

export default HL7Form;
