import http from "http";
import app from "./index.js"; 
import { initSocket } from "./config/socket.js"; 

const server = http.createServer(app);


initSocket(server);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
