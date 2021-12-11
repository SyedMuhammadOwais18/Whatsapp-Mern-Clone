//in package.json file we use type:module to get react import style syntax

import express, { application } from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from 'pusher';
import cors from 'cors';

//app config

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1287454",
  key: "4890e749ec224811b4a1",
  secret: "d882a18223baf2ffce48",
  cluster: "ap2",
  useTLS: true
});

//middleware
app.use(express.json());
app.use(cors());

// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin" ,"*");
//     res.setHeader("Access-Control-Allow-Headers" ,"*");
//     next();
// })

//db config
const connection_url =
  "mongodb+srv://admin:nYk6ZNEgUTJjGA1J@cluster0.b1n9o.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
  
});

const db = mongoose.connection;
db.once("open" ,()=>{
    console.log("DB connected");

    const msgCollection =db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    //fire function which triggers on some change
    changeStream.on("change",(change) => {
        console.log(change);
   

    if(change.operationType === "insert"){
        const messageDetails = change.fullDocument;
        pusher.trigger('messages','inserted',{
            message:messageDetails.message,
            name:messageDetails.name,
            timestamp:messageDetails.timestamp,
            recieved:messageDetails.recieved

        });
    }
    else{
        console.log("error");
    }
});
})
//api routes
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.get('/messages/sync' , (req,res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

app.post('/messages/new' , (req,res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage , (err,data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }

    })
})

//listen
app.listen(port, () => console.log("listening"));
