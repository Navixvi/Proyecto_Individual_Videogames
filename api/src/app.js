const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { conn } = require('./db.js');
const PORT = 3001;
const cors = require('cors');

const server = express();
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configura CORS
server.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, // Permite credenciales (cookies, etc.)
}));

server.use('/', routes);

// Realiza la sincronización de la base de datos antes de iniciar el servidor
conn.sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log('Server raised in port: ' + PORT);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;