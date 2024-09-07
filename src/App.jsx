import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [activated,setActivated] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);

  if(firstOpen) {
    chrome.runtime.sendMessage( {action: "getLocalStorage"},
      (response) => {
        console.log("Content of localStorage:", response);
        setActivated(response.selectMode);
      }
    )
  }

  useEffect(() => {
    const fetchAndSendMessage = async () => {
      if(!firstOpen) {
      chrome.runtime.sendMessage({action: "setLocalStorage", value: activated});
      await chrome.tabs.query({}, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          console.log(tabs[i]);
          chrome.tabs.sendMessage(tabs[i].id,{action : activated ? "activate" : "desactivate"}, (result) => {
            console.log("signal send : " , result);
            })
          }
        })
      }
    }

    fetchAndSendMessage();
  },[activated]);

  const onClick = async () => {
    if(firstOpen) {
      setFirstOpen(false);
    }
    activated ? setActivated(false) : setActivated(true);
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>
          {activated ? "desactivate": "activate"}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
