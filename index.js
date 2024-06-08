import express from 'express'
import cors from 'cors'
import ws from 'express-ws'

import userSocket from './socket.service.js'

const PORT = process.env.PORT || 8080
const app = express()
const WSServer = ws(app)
const aWss = WSServer.getWss()
app.ws('/echo', (ws, req) => userSocket(ws, aWss))

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
)

app.use(express.json())

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
start()
