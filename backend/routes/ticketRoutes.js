//Again importing express library to create a router stack for ticket endpoint
const express = require("express");

//we need the model reference to do operations on db
const Ticket = require("../models/Ticket.js");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    //destructuring pulling out values from req.body object if it contains the specified variable name
    const { title, description, priority } = req.body;

    // if title is empty send back 400 bad request error to the user
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // since this is a database operation and its asynchronous it will take some time so await
    /*shorthand property of object , if the key and variable name are same means */
    const ticket = await Ticket.create({
      title,
      description,
      priority,
    });

    //After successfull save we send that saved data back to the user to render it in UI
    // 201 - means created OK
    res.status(201).json(ticket);
  } catch (err) {
    // if database goes down or something we send internal server error
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    //destructure the values from query parameter so we can filter the data we want
    const { status, priority } = req.query;

    //we need to pass the filter object to get filtered result
    const filter = {};

    //assigning values to the filtered object
    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    //find takes time so await till the promise gets full filled
    const tickets = await Ticket.find(filter);

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// let other files import this router reference
module.exports = router;
