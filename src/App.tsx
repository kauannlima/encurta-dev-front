import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';


function App() {


  const [iconUrl, setIconUrl] = useState(faCopy);
  const [textUrl, setTextUrl] = useState("Copiar");
  
  const urlParaCopiar = 'http://localhost:8080/r/UFfsS';

  {/* ESSA FUNÇÃO SERVE PRA COPIAR A URL ENCURTADA*/}
  const handleCopiarClique = () => {
    navigator.clipboard.writeText(urlParaCopiar)
      .then(() => {
        setIconUrl(faCheck);
        setTextUrl("Copiado");

      {/* SE FUNCIONA NÃO MEXE*/}
        setTimeout(() => {
          setIconUrl(iconUrl);
          setTextUrl("Copiar");
        }, 1000);
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto: ', error);
      });
  };

  return (
    <div className='container'>
      <h1>Encurta Dev {'{</>}'}</h1>
      <div className="encurta-body">
        <div className="encurta-url">
          <input className='input-url' placeholder='Digite a URL original'></input>
          <button className='button-url'>Encurtar URL</button>
        </div>
        <p className='copiar-nova-url' onClick={handleCopiarClique}>
          <span>{urlParaCopiar}</span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={iconUrl} style={{ margin: '0px 5px' }} />
            {textUrl}
          </span>
        </p>
        <div className="encurta-qrcode">
        </div>
      </div>
    </div>
  )
}

export default App
