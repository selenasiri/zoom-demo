const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)  // uuidV4() represents roomId
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast   
  })
})

const PORT = 3000
server.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`)
})

// Once refreshed the url has a new, unique roomID: i.e.
// 39391097-37b4-4aba-862a-c521a6e31c30
// 869b55a3-2575-4232-9cdf-1c1389b0abf5