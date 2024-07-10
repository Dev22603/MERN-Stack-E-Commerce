// // Import required modules
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const app = express();

// dotenv.config({ path: "./config.env" });

// require("../db/conn");

// app.use(express.json());

// // link router files to authorize
// app.use(require("../router/auth"));

// const User = require("./model/userSchema");
// const ProductDetails = require("./model/productScheme");

// const DB = process.env.DATABASE;

// const port = process.env.PORT;
// // Create an Express application

// // Define a route handler for the root path
// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });
// app.get("/about", (req, res) => {
// 	res.send("Hello World ABOUT!");
// });

// // Start the server
// app.listen(port, () => {
// 	console.log(`Server is listening at http://localhost:${port}`);
// });

import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import "dotenv/config";

// import errorReporter from './errorReporter.mjs'
// errorReporter.report(new Error('documented example'))

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        app.on("error", (error) => {
            console.log(`Error: ${error}`);
            throw error;
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    });

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import dotenv from "dotenv";
// dotenv.config({ path: '../env' });

/*
import express from "express";
import { DB_NAME } from "./constants";

const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log(error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is listening at http://localhost:${process.env.PORT}`
            );
        });
        } catch (error) {
        console.log("ERROR");
        console.log(error);
        throw error;
        }
        })();
        */
