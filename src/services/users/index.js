/* 
1. get all users on url -> localhost:3001/users
2. get single user with id on url -> localhost:3001/users/:id
3. create a single user -> localhost:3001/users
4. modify a single user -> localhost:3001/users/:id
5. delete a single user -> localhost:3001/users/:id
All the routes in this file will have the /users/ prefix
*/

const express = require("express");
const router = express.Router();
// router.get("/") router.post("/:id") can create the whole collection with this router & can organise all of our "things" with this router
const fs = require("fs"); //core module
const path = require("path"); //core module
const uniqid = require("uniqid"); //third party module, it has to be installed. this will produce unique ids for us

//1. router.get("/")
router.get("/", (req, res) => {
  //handler, special function that takes care of understanding what was the request
  const usersFilePath = path.json(__dirname, "users.json");
  //a) retrive the list fro a file on disk (users.json), because we don't havea  real database yet
  const fileAsABuffer = fs.readFileSync(usersFilePath); //returns a buffer, machine readbale, not human readable!
  //b) we get a bugger so it must be converted to something readable, like a string
  const fileAsAString = fileAsABuffer.toString();
  //c) I want to send th list as a response but in the form of a JSON, not a string
  const usersArray = JSON.parse(fileAsAString)
  res.send(usersArray);
});

//2. router.get("/:id")
router.get("/:id", (req, res) => {
  //handler
  const usersFilePath = path.json(__dirname, "users.json");
  const fileAsABuffer = fs.readFileSync(usersFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const usersArray = JSON.parse(fileAsAString)

  const idComingFromRequest = req.params.id //.id is what ever you put in the url on line 31

  const user = usersArray.filter(user => user.ID === idComingFromRequest);

  res.send(user);
});

//3.
router.post("/", (req, res) => {
  //handler

  //1. read the old content from the old file
  const usersFilePath = path.json(__dirname, "users.json");
  const fileAsABuffer = fs.readFileSync(usersFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const usersArray = JSON.parse(fileAsAString)

  //2. push new user to usersArray
  //2.b let us create a unique identifier for the new user
  const newUser = req.body;
  newUser.ID = uniqid();
  usersArray.push(newUser);

 
  //3 replace old contenet in the old file with new array

  fs.writeFileSync(usersFilePath, JSON.stringify(usersArray));
  res.status(201).send({ id: newUser.ID });
});

//4.  modify a single user
router.put("/:id", (req, res) => {
  //handler

  //1. read the content again
  const usersFilePath = path.json(__dirname, "users.json");
  const fileAsABuffer = fs.readFileSync(usersFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const usersArray = JSON.parse(fileAsAString)

//2. Filter out the user with the specific id that you want to modify
  const newUsersArray = usersArray.filter(user => user.ID !== req.params.id); //the ".id" equals what ever you are passing in the URL


  //3. add the modified user back to the arry
  const modifiedUser = req.body;
  modifiedUser.ID = req.params.id;
  newUsersArray.push(modifiedUser);

  //4. write it back on disk
  fs.writeFileSync(usersFilePath, JSON.stringify(usersArray));

  res.send(usersArray);
});

//5.  delete a single user
router.delete("/:id", (req, res) => {
  //handler

  //1. read the content again
  const usersFilePath = path.json(__dirname, "users.json");
  const fileAsABuffer = fs.readFileSync(usersFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const usersArray = JSON.parse(fileAsAString)
//2. filter out the user with the  specified id
  const newUsersArray = usersArray.filter(user => user.ID !== req.params.id); //the ".id" equals what ever you are passing in the URL
  
  //3. save it back on the disk
  fs.writeFileSync((usersFilePath), JSON.stringify(newUsersArray));

  res.status(204).send();
});



module.exports = router; //need to export the router outside in order to use it :)
