//vr 18 node
// import express from 'express';
// import http from 'http';
// import socketIo from 'socket.io';
// import dotenv from 'dotenv';
// // import { io } from 'socket.io-client';
// import { io } from 'socket.io-client';




// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// // const io = socketIo(server);
// const socket = io('http://localhost:5000');  // Error: This expression is not callable

// app.use(express.json());

// // Configurar rutas aquí (e.g., autenticación, chat, etc.)

// // WebSocket connection
// io.on('connection', (socket) => {
//     console.log('Usuario conectado:', socket.id);

//     socket.on('disconnect', () => {
//         console.log('Usuario desconectado:', socket.id);
//     });
// });

// // Iniciar el servidor
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

// // vr 16 node
// import express from 'express';
// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';

// // Crear una instancia de la aplicación Express
// const app = express();

// // Crear un servidor HTTP utilizando la instancia de Express
// const server = http.createServer(app);

// // Crear una instancia de Socket.IO y asociarla con el servidor HTTP
// // const io = new SocketIOServer(server);

// const io = new SocketIOServer(server, {
//     cors: {
//       origin: 'http://localhost:3000', // El puerto donde corre tu frontend
//       methods: ['GET', 'POST']
//     }
//   });
  

// // Configuración de las rutas de la aplicación (puedes agregar más rutas aquí)
// app.get('/', (req, res) => {
//   res.send('Servidor Express con WebSocket funcionando');
// });

// // Manejar la conexión de nuevos clientes WebSocket
// io.on('connection', (socket) => {
//   console.log('Nuevo cliente conectado');

//   // Enviar un mensaje de bienvenida al cliente
//   socket.emit('welcome', 'Bienvenido al servidor de WebSocket!');

//   // Escuchar eventos enviados por el cliente
//   socket.on('message', (data) => {
//     console.log('Mensaje recibido:', data);
//     // Reenviar el mensaje a todos los clientes conectados
//     io.emit('message', data);
//   });

//   // Escuchar cuando un cliente se desconecta
//   socket.on('disconnect', () => {
//     console.log('Un cliente se desconectó');
//   });
// });

// // Definir el puerto en el que el servidor escuchará
// const PORT = process.env.PORT || 5000;

// // Iniciar el servidor en el puerto 5000
// server.listen(PORT, () => {
//   console.log(`Servidor funcionando en http://localhost:${PORT}`);
// });

//vr 20 node
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Crear una instancia de la aplicación Express
const app = express();

// Crear un servidor HTTP utilizando la instancia de Express
const server = http.createServer(app);

// Crear una instancia de Socket.IO y asociarla con el servidor HTTP
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000', // Asegúrate de que el frontend se conecte desde el puerto correcto
    methods: ['GET', 'POST']
  }
});

// Middleware para servir archivos estáticos (si es necesario)
app.use(express.static('public'));

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Algo salió mal' });
// });


// Ruta básica para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor Express con WebSocket funcionando');
});

// Manejar la conexión de nuevos clientes WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Enviar un mensaje de bienvenida al cliente
  socket.emit('welcome', 'Bienvenido al servidor de WebSocket!');

  // Escuchar eventos de los clientes
  socket.on('message', (data) => {
    console.log('Mensaje recibido:', data);
    // Reenviar el mensaje a todos los clientes conectados
    io.emit('message', data);
  });

  // Escuchar desconexión de clientes
  socket.on('disconnect', () => {
    console.log('Un cliente se desconectó');
  });
});

// Definir el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 5000;

// Iniciar el servidor en el puerto especificado
server.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
