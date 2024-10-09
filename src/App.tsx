import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


function App() {
  const urlParaCopiar = 'http://localhost:8080/r/UFfsS';

  const handleCopiarClique = () => {
    navigator.clipboard.writeText(urlParaCopiar)
      .then(() => {
        alert('Texto copiado');
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
            <FontAwesomeIcon icon={faCopy} style={{ margin: '0px 5px' }} />
            Copiar
          </span>
        </p>
        <div className="encurta-qrcode">
        </div>
      </div>
    </div>
  )
}

export default App
