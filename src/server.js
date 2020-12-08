const express = require("express")
const userRoutes = require("./users") //automatically with grab index file in that folder

const server = express()
const port = 3001


const cors = require("cors")

const users = require("./services/users")


server.use(cors())
server.use(express.json())

server.use("/users", userRoutes)
server.listen(port, () => {
  console.log("Server running on port:", port)
})
