//Again importing express library to create a router stack for ticket endpoint
const express = require("express");

//we need the model reference to do operations on db and enforce validation
const Ticket = require("../models/Ticket.js");

//we need a mini express application for similar endpoints
const router = express.Router();

// ============================================================================================
//                                   CREATE TICKET END POINT
// ============================================================================================

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
    /*shorthand property of object , if the key and variable name are same means we use this shorthand */
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

// ============================================================================================
//                                  GET ALL TICKET OR BASED ON FILTER ENDPOINT
// ============================================================================================

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

// ============================================================================================
//                                   UPDATE TICKET DETAILS ENDPOINT
// ============================================================================================

router.patch("/:id", async (req, res) => {
  try {
    //status we are going to update , destructure it
    const { status } = req.body;

    //If status is not sent , return 400 bad request
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    /*find the document by id and update the status from status object passed and enforce 
      new: true means return updated version not old
      runValidators to enforce validation as by default findbyIdandUpdate wont enforce validation*/
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    //If ticket not found means send it back
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================================================================================
//                                  DELETE TICKET ENDPOINT
// ============================================================================================

router.delete("/:id", async (req, res) => {
  try {
    /*find the document by id ,findByIdAndDelete returns deleted document if found 
      If no document exist it returns false*/
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    /*If no document found return 404 not found*/
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // send 200 request worked
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// let other files import this router reference
module.exports = router;
