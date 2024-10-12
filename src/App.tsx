import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

   //  const localHost = "http://localhost:8080"
 const localHost = "https://encurta-dev.onrender.com"

  const [iconUrl, setIconUrl] = useState(faCopy);
  const [textUrl, setTextUrl] = useState("Copiar");
  const [urlOriginal, setUrlOriginal] = useState('');
  const [urlEncurtada, setUrlEncurtada] = useState('');
  const [urlQrCode, setUrlQrCode] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [mensagemDiv, setMensagemDiv] = useState('Carregando aplicação...');

  const handleObterUrlOriginal = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUrlOriginal(event.target.value);
  };

  //function para extrair urlEncurtada
  const handleEncurtarUrlOriginal = async () => {
    setIsPending(true);
    try {
      const response = await axios.post(`${localHost}/encurta-dev`, { urlOriginal });
      setUrlEncurtada(response.data.urlEncurtada);
      setUrlQrCode(response.data.urlQrCode);
    } catch (error) {
      console.error('Erro ao buscar URL encurtada: ', error);
    } finally {
      setIsPending(false);
    }
  };

  {/* ESSA FUNÇÃO SERVE PRA COPIAR A URL ENCURTADA*/ }
  const handleCopiarClique = () => {
    navigator.clipboard.writeText(urlEncurtada)
      .then(() => {
        setIconUrl(faCheck);
        setTextUrl("Copiado");

        {/* SE FUNCIONA NÃO MEXE*/ }
        setTimeout(() => {
          setIconUrl(iconUrl);
          setTextUrl("Copiar");
        }, 1000);
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto: ', error);
      });
  };


    useEffect(() => {
      setIsPending(true);
      const initializeApp = async () => {
        setMensagemDiv("Carregando aplicação...");
        try {
          await axios.get(`${localHost}/connect`);
          setIsAppLoaded(true);  
          setIsPending(false);
        } catch (error) {
          console.error('Erro ao inicializar a aplicação: ', error);
          setMensagemDiv("Não foi possível carregar a aplicação. Aguarde alguns instantes e recarregue a página.");
        } finally {
        }
      };
  
      initializeApp();
    }, []);

   if (isPending && !isAppLoaded) {
    return <div className="loading-screen">{mensagemDiv}</div>;
  }

  return (
    <div className='container'>
      <h1>Encurta Dev {'{</>}'}</h1>
      <div className="encurta-body">
        <div className="encurta-url">
          <input className='input-url' placeholder='Digite a URL original' onChange={handleObterUrlOriginal} ></input>
          <button className='button-url' onClick={handleEncurtarUrlOriginal}>{isPending ? 'Encurtando...' : 'Encurtar Url'}</button>
        </div>
        <p className='copiar-nova-url' onClick={handleCopiarClique}>
          <span>{urlEncurtada}</span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={iconUrl} style={{ margin: '0px 5px' }} />
            {textUrl}
          </span>
        </p>
        <div className="encurta-qrcode">
          {urlQrCode != '' ? (
            <img src={`data:image/png;base64,${urlQrCode}`} alt='QR CODE' />
          ) : ''}
        </div>
        <a href={`data:image/png;base64,${urlQrCode}`} download="qrcode.png" className="download-link"
>
          Baixar QR Code
        </a>
      </div>
    </div>
  )
}

export default App
