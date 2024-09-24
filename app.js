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
  } else {
    console.log("Invalid selection. Please choose 1 or 2.");
  }
};

/*------------------------------ Query Functions -----------------------------*/

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
