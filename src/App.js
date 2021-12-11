import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useEffect ,useState } from "react";
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages ,setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then(response => {
      console.log(response.data);
      setMessages(response.data);
    })

  },[]);

  useEffect(() => {
    const pusher = new Pusher('4890e749ec224811b4a1', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
