import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import axios from 'axios';
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';
const client = axios.create({ adapter: axiosTauriApiAdapter });

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  async function fetchServerMessage() {
    try {
      const response = await client.get('https://tauribe.onrender.com');
      setServerMessage(response.data); // Assuming the server returns a message
    } catch (error) {
      console.error('Error fetching server message:', error);
    }
  }

  useEffect(() => {
    fetchServerMessage();
  }, []); // Fetch the server message when the component mounts

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <h2>Server Message: {serverMessage}</h2>
      <div className="row">
        {/* ... (rest of your component remains the same) */}
      </div>
      {/* ... (rest of your component remains the same) */}
    </div>
  );
}

export default App;
