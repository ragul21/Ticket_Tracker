"use client"; // since this will run on client side we use use client

import { useState, useEffect } from "react"; // we need state and effect hooks

const API_URL = process.env.NEXT_PUBLIC_API_URL; // to not hardcode the backend URL

export default function Home() {
  // we will get the entire ticket array and use setfunction to assign it to our ticket variable
  //for get all tickets
  const [tickets, setTicket] = useState([]);

  /*for setting priority , filtering purpose*/
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  //we need to remember the title ,description, priority when user tries to create a ticket
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  /*call get all ticket backend api which will send us string (array of json object in giant string form)
    we then convert it into array of js objects for our convenient to render in UI
    we assign it to state to save the array in ticket variable*/
  useEffect(() => {
    fetch(`${API_URL}/api/tickets`)
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, []);

  /*Once user selects the value from drop down the state re renders and will have the value
    if user clicks go this function will run by appending the priority and calls the fetch*/

  // ============================================================================================
  //                                  THIS WILL HANDLE THE GET TICKETS BY FILTER
  // ============================================================================================

  const handleFilter = () => {
    let url = `${API_URL}/api/tickets`;

    //we push the parts of query parameters into an array
    let queryParams = [];

    if (priorityFilter) {
      queryParams.push(`priority=${priorityFilter}`);
    }

    if (statusFilter) {
      queryParams.push(`status=${statusFilter}`);
    }

    // if there are values in queryParams that means we have filters append if there are multiple filters
    if (queryParams.length > 0) {
      url = url + "?" + queryParams.join("&");
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTicket(data));
  };

  // ============================================================================================
  //                     This function will handle the status change
  // ============================================================================================
  const handleStatusChange = (id, newStatus) => {
    fetch(`${API_URL}/api/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        handleFilter(); // refresh list
      });
  };

  // ============================================================================================
  //                     This function will call the backend API to create ticket
  // ============================================================================================

  const handleCreate = () => {
    fetch(`${API_URL}/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        setDescription("");
        setPriority("low");
        setShowForm(false);
        handleFilter(); // refresh list
      });
  };

  // ============================================================================================
  //               THIS FUNCTION WILL HANDLE DELETE REQUEST FROM FRONTEND SIDE
  // ============================================================================================
  const handleDelete = (id) => {
    fetch(`${API_URL}/api/tickets/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        handleFilter(); // refresh list
      });
  };
  // ============================================================================================
  //                                  ACTUAL UI WHICH WILL BE RENDERED
  // ============================================================================================
  return (
    <div>
      <div className="flex gap-4">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="in progress">in progress</option>
          <option value="closed">closed</option>
        </select>

        <button
          className="border px-4 py-2 cursor-pointer"
          onClick={handleFilter}
        >
          Go
        </button>

        <button
          className="border px-4 py-2 cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          create ticket
        </button>

        {/*conditional rendering of the create ticket modal*/}
        {showForm && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white p-6 w-96">
              <h3 className="text-lg mb-4">Create Ticket</h3>

              <input
                className="border w-full mb-3 p-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="border w-full mb-3 p-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="border w-full mb-4 p-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowForm(false)}>Cancel</button>

                <button className="border px-3 py-1" onClick={handleCreate}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*Table UI to render*/}
      <table className="w-full border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">description</th>
            <th className="px-6 py-4">priority</th>
            <th className="px-6 py-4">status</th>
            <th className="px-6 py-4">createdAt</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="text-center border-t">
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.priority}</td>

              {/*status will be have inline update functionality so we need a drop down here*/}
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatusChange(ticket._id, e.target.value)
                  }
                >
                  <option value="open">open</option>
                  <option value="in progress">in progress</option>
                  <option value="closed">closed</option>
                </select>
              </td>

              <td>{ticket.createdAt}</td>

              <td>
                <button
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleDelete(ticket._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
