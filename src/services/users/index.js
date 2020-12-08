const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router = express.Router()

router.get("/", (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, "users.json"))
  const fileContent = buffer.toString()

  res.send(JSON.parse(fileContent))
})

router.get("/:id", (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, "users.json"))
  const usersArray = JSON.parse(buffer.toString())
  const user = usersArray.filter(user => user.ID === req.params.id)

  res.send(user)
})

router.post("/", (req, res) => {
  const newUser = req.body
  const buffer = fs.readFileSync(path.join(__dirname, "users.json"))
  const content = buffer.toString()
  const usersDB = JSON.parse(content)
  newUser.ID = uniqid()
  usersDB.push(newUser)
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(usersDB))

  res.status(201).send({ id: newUser.ID })
})

router.delete("/:id", (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, "users.json"))
  const content = buffer.toString()
  const usersDB = JSON.parse(content)
  const newDb = usersDB.filter(x => x.ID !== req.params.id)
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDb))

  res.status(204).send()
})

router.put("/:id", (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, "users.json"))
  const content = buffer.toString()
  const usersDB = JSON.parse(content)
  const newDb = usersDB.filter(x => x.ID !== req.params.id)
  const users = req.body
  users.ID = req.params.id
  newDb.push(users)
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDb))

  res.send(newDb)
})

module.exports = router
