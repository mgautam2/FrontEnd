import { io } from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";

/**
 * Class used to handle socket connection for Tank Game
 */
class socketClass {
  constructor() {
    this.socket = io(ENDPOINT, { 
      autoConnect: false, 
      transports: ['websocket', 'polling']
    });
  }

  connect() {
    if (this.socket.connected)
      return;
    this.socket.connect();
    this.socket.on("connect", (data) => {
          console.log("Connected")
    });
  }

  disconnect() {
    if (this.socket.disconnected)
      return;
    this.socket.disconnect();
  }
  
  getSocket() {
    const socket = this.socket;
    return socket;
  }
}

export const socketManager = new socketClass();
