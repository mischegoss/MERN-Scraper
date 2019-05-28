

The MERN Stack Tutorial — Building A React CRUD Application From Start To Finish — Part 2
Go to the profile of Sebastian Eschweiler
Sebastian Eschweiler
Dec 22, 2018
This post has been published first on CodingTheSmartWay.com.

Subscribe On YouTube| Code on GitHub

Part 1: Setting Up The Project
Part 2: Setting Up The Back-end
Part 3: Connecting Front-End To Back-End
Part 4: Finishing The Application
Part 2: Setting Up The Back-end
This is the second part of the The MERN Stack Tutorial — Building A React CRUD Application From Start To Finish series. In the first part we’ve started to implement the front-end React application of the MERN stack todo application. In this second part we’ll be focusing on the back-end and build a server by using Node.js / Express.

When building the back-end we’ll also be setting up MongoDB and connect to the database from our Node.js / Express server by using the Mongoose library.

If you like CodingTheSmartWay, then consider supporting us via Patreon. With your help we’re able to release developer tutorial more often. Thanks a lot!

The back-end will comprise HTTP endpoints to cover the following use cases:

Retrieve the complete list of available todo items by sending an HTTP GET request
Retrieve a specific todo item by sending HTTP GET request and provide the specific todo ID in addtion
Create a new todo item in the database by sending an HTTP POST request
Update an existing todo item in the database by sending an HTTP POST request

Initiating The Back-end Project
To initiate the back-end project let’s create a new empty project folder:

$ mkdir backend

Change into that newly created folder by using:

$ cd backend

Let’s create a package.json file inside that folder by using the following command:

$ npm init -y

With the package.json file available in the project folder we’re ready to add some dependencies to the project:

$ npm install express body-parser cors mongoose

Let’s take a quick look at the four packages:

express: Express is a fast and lightweight web framework for Node.js. Express is an essential part of the MERN stack.
body-parser: Node.js body parsing middleware.
cors: CORS is a node.js package for providing an Express middleware that can be used to enable CORS with various options. Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
mongoose: A Node.js framework which lets us access MongoDB in an object-oriented way.
Finally we need to make sure to install a global package by executing the following command:

$ npm install -g nodemon

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. We’ll use nodemon when running our Node.js server in the next steps.

Inside of the backend project folder create a new file named server.js and insert the following basic Node.js / Express server implementation:

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
With this code we’re creating an Express server, attaching the cors and body-parser middleware and making the server listening on port 4000.

Start the server by using nodemon:

$ nodemon server

You should now see an output similar to the following:


As we’re able to see the out Server is running on Port: 4000 we know that the server has been started up successfully and is listing on port 4000.

Installing MondoDB
Now that we’ve managed to set up a basic Node.js / Express server we’re ready to continue with the next task: setting up the MongoDB database.

First of all we need to make sure that MongoDB is installed on your system. On MacOS this task can be completed by using the following command:

$ brew install mongodb

If you’re working on Windows or Linux follow the installation instructions from https://docs.mongodb.com/manual/administration/install-community/.

Having installed MongoDB on your system you need to create a data directory which is used by MongoDB:

$ mkdir -p /data/db

Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the directory.

Now we’re ready to start up MongoDB by executing the following command:

$ mongod

Executing this command will give you the following output on the command line:


This shows that the database is now running on port 27017 and is waiting to accept client connections.

Creating A New MongoDB Database
The next step is to create the MongoDB database instance. Therefore we’re connecting to the database server by using the MondoDB client on the command line:

$ mongo

Once the client is started it prompts you to enter database commands. By using the following command we’re creating a new database with the name todos:

use todos

Connecting To MongoDB By Using Mongoose
Let’s return to the Node.js / Express server implementation in server.js. With the MongoDB database server running we’re now ready to connect to MongoDB from our server program by using the Mongoose library. Change the implementation in server.js to the following:

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});
module.exports = mongoose.model('Todo', Todo);