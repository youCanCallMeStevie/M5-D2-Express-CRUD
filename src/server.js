const express = require("express")
const cors = require("cors")

const users = require("./services/users")

const server = express()

server.use(cors())
server.use(express.json())

server.use("/users", users)
server.listen(3001, () => {
  console.log("Server running on port 3001")
})
