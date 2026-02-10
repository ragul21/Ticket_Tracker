/*require - to import dotenv library
  returns a js object dotenv
  config is a method on that object which loads the .env values into process.env runtime object*/

require("dotenv").config();

/*importing mangoose object and express factory function  */
const express = require("express");
const mongoose = require("mongoose");
const ticketRoute = require("./routes/ticketRoutes");

/*calling the factory function will create the actual application object*/
const app = express();

/*use is adding the middleware to the application layer stack
  express.json()*/

app.use(express.json());

/*placing the ticket related middleware with its own sub router which will walk its own stack*/

app.use("/api/tickets", ticketRoute);

/*connecting to mongo DB atlas using connect function on mongoose object 
as it connection will take time as its asynchronous it returns promise
we use then if success and catch if rejected*/

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo DB is connected"))
  .catch((err) => console.log("Could not establish connection to mongo", err));

/*when someone visits the / endpoint , run this call back function
  send sets the header and closes the connection !*/
app.get("/", (req, res) => res.send("backend is running"));

const PORT = process.env.PORT || 5000;

//connects to the port and listens there , enables a long running process
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
