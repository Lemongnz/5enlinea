const express = require('express')
const next = require('next')
const socketio = require('socket.io')

const http = require('http')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const app = express()

  const server = http.createServer(app)

  var io = socketio(server)

  io.on('connection', (socket) => {
    socket.on('move', (data) => {
        socket.broadcast.emit('move', data);
    })

    socket.on('selectPlayer', (data) => {
      socket.broadcast.emit('selectPlayer', data);
    })
  });

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
