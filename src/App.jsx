import { useEffect, useState } from "react";
import "./App.css";

/**
 *
 * App component to manage the state and interaction of the magic wand extension
 */
function App() {
  const [activated, setActivated] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);

  /**
   * Fetch the initial state of the magic wand feature from localStorage.
   * This runs only when the component is first opened.
   */
  if (firstOpen) {
    chrome.runtime.sendMessage({ action: "getLocalStorage" }, (response) => {
      console.log("Content of localStorage:", response);
      setActivated(response.selectMode);
    });
  }

  /**
   * Effect that runs whenever the `activated` state changes.
   * Sends the select mode (if activated or not) state to the background script and all open tabs to update their state.
   */
  useEffect(() => {
    const fetchAndSendMessage = async () => {
      if (!firstOpen) {
        chrome.runtime.sendMessage({
          action: "setLocalStorage",
          value: activated,
        });
        await chrome.tabs.query({}, (tabs) => {
          for (let i = 0; i < tabs.length; i++) {
            console.log(tabs[i]);
            chrome.tabs.sendMessage(
              tabs[i].id,
              { action: activated ? "activate" : "desactivate" },
              (result) => {
                console.log("signal send : ", result);
              }
            );
          }
        });
      }
    };

    fetchAndSendMessage();
  }, [activated]);

  const onClick = async () => {
    if (firstOpen) {
      setFirstOpen(false);
    }
    activated ? setActivated(false) : setActivated(true);
  };
  return (
    <>
      <h1>
        {activated
          ? "The magic wand is activated"
          : "The magic wand is deactivated"}
      </h1>
      <div className="card">
        <button onClick={onClick}>
          {activated ? "Deactivate" : "Activate"}
        </button>
      </div>
      <p className="read-the-docs">
        {activated
          ? "Click on the element you want on the website to change its background color"
          : "Please activate the magic wand to do some magic"}
      </p>
    </>
  );
}

export default App;
