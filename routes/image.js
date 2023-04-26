const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public")
    },

    filename: function (req, file, cb) {
        let name = file.originalname.split(".")

        let newname = Math.floor(10000000000 + Math.random() * 90000000000) + "." + name[name.length-1]
        file.originalname = newname
        cb(null, file.originalname);
    },
});


var upload = multer({ storage: storage })

router.post("/", upload.single("data_image"), (req, res) => {
    console.log(req.file,"req");
    
const path = req.file;
  if (path) {
    res.status(400).json({ path, status: true });
  }else{
    res.status(400).json({ path:"no image found", status: false });
  }
});


//Function

// const Client = require('@veryfi/veryfi-sdk');

// function createVeryfiClient(clientId, clientSecret, username, apiKey) {
//   const myClient = new Client(clientId, clientSecret, username, apiKey);
//   return myClient;
// }

// // Example usage
// const clientId = 'your_client_id';
// const clientSecret = 'your_client_secret';
// const username = 'your_username';
// const apiKey = 'your_password';

// const myVeryfiClient = createVeryfiClient(clientId, clientSecret, username, apiKey);
// // let file_path = ‘document.pdf’;
// let response = async () => await myClient.process_document(file_path);
// response().then(console.log);


// const Client = require('@veryfi/veryfi-sdk');
// const MongoClient = require('mongodb').MongoClient;
// const path = require('path');

// const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority';

// async function processDocumentAndSaveToMongoDB(clientId, clientSecret, username, apiKey, filePath) {
//   const veryfiClient = new Client(clientId, clientSecret, username, apiKey);
//   const results = await veryfiClient.process_document(filePath);

//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//     await client.connect();
//     const database = client.db('<database>');
//     const collection = database.collection('<collection>');
//     const insertResult = await collection.insertOne(results);
//     console.log(`Inserted ${insertResult.insertedCount} document into the collection`);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await client.close();
//   }
// }

// // Example usage
// const clientId = 'your_client_id';
// const clientSecret = 'your_client_secret';
// const username = 'your_username';
// const apiKey = 'your_password';
// const filePath = 'document.pdf';

// processDocumentAndSaveToMongoDB(clientId, clientSecret, username, apiKey, filePath);


module.exports=router

