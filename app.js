const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Customer = require("./models/Customer.js");

console.log(`Welcome to the CRM
What would you like to do?
1. Create a customer
2. View all customers
3. Update a customer
4. Delete a customer
5. Quit`);

let userName, userAge;

const todo = async () => {
  const action = prompt("Number of action to run: ");
  if (action === "1") {
    // Get customer data and create a new customer
    userName = prompt("What is the new customer's name? ");
    userAge = prompt("What is the age of the customer? ");
    await createCustomer();
  } else if (action === "2") {
    // View existing customers
    await viewCustomers();
  } else if (action === "3") {
    // updating customer info
    await updateCustomer();
  } else if (action === "4") {
    // deleting customer info
    await deleteCustomer();
  } else if (action === "5") {
    console.log("You have been disconnected");
  } else {
    console.log("Invalid selection. Goodbye");
  }
};

/*------------------------------ Query Functions -----------------------------*/

//for prompt 1 creating customer
const createCustomer = async () => {
  try {
    await connect(); // Connect to MongoDB
    const customerData = {
      name: userName,
      age: userAge,
    };
    const customer = await Customer.create(customerData);
    console.log("New Customer:", customer);
  } catch (error) {
    console.error("Error creating customer:", error);
  } finally {
    await disconnect(); // Disconnect from MongoDB
  }
};

//for prompt 2 viewing all customers
const viewCustomers = async () => {
  try {
    await connect(); // Connect to MongoDB
    const users = await Customer.find({});
    console.log("All customers:", users);
  } catch (error) {
    console.error("Error viewing customers:", error);
  } finally {
    await disconnect(); // Disconnect from MongoDB
  }
};

// for prompt 3 updating all customers
const updateCustomer = async () => {
  try {
    await connect(); // Connect to MongoDB
    const users = await Customer.find({});
    console.log("Below is a list of customers: ", users);
    const userID = prompt(
      "Copy and past the id of the customer you would like to update here: "
    );
    const newName = prompt("Enter the new name for the customer: ");
    const newAge = prompt("Enter the new age for the customer: ");

    const newCustomer = await Customer.findByIdAndUpdate(userID, {
      name: newName,
      age: newAge,
    });
  } catch (error) {
    console.error("We cannot find that ID");
  } finally {
    await disconnect();
  }
};

// for prompt 4 updating all customers
const deleteCustomer = async () => {
  try {
    await connect(); // Connect to MongoDB
    const users = await Customer.find({});
    console.log("Below is a list of customers: ", users);
    const userID = prompt(
      "Copy and past the id of the customer you would like to delete: "
    );
    const deleteCustomer = await Customer.findByIdAndDelete(userID);
    console.log("That customer has been terminated.");
  } catch (error) {
    console.error("We cannot find that ID");
  } finally {
    await disconnect();
  }
};

// MongoDB connection setup
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
};

const disconnect = async () => {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

// Run the todo function to allow user selection
todo();
