import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const PORT = 3000;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const playerScores = [];

io.on("connection", (socket) => {
  socket.on("scores", (data) => {
    playerScores.push({ ...data, id: socket.id });
    console.log(playerScores);
    setInterval(() => {
      socket.emit("playerScores", playerScores);
    }, 3000);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server Running on ${PORT}...`);
});
