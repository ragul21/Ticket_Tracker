const mongoose = require("mongoose");

/*Defining the schema of how the ticket should look like
  what values it should take 
  what values must be default
  enforcing validation and schema before storing these in mongo db*/
const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },

  status: {
    type: String,
    enum: ["open", "in progress", "closed"],
    default: "open",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*creates a model and internally maps it to the collection 
  we talk to our collection through the model */

const Ticket = mongoose.model("Ticket", ticketSchema);

// let other files import this reference
module.exports = Ticket;
