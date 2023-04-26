const Client = require('@veryfi/veryfi-sdk');
const MongoClient = require('mongodb').MongoClient;

// const uri = 'mongodb+srv://rubi:rubi@cluster0.264g2.mongodb.net/MRSAAN-PROJECT2?retryWrites=true&w=majority';

// async function processDocumentAndSaveToMongoDB(clientId, clientSecret, username, apiKey, filePath) {
//     const veryfiClient = new Client(clientId, clientSecret, username, apiKey);
//     const results = await veryfiClient.process_document(filePath);
//     console.log(results);
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // try {
    //     await client.connect();
    //     const database = client.db('<database>');
    //     const collection = database.collection('<collection>');
    //     const insertResult = await collection.insertOne(results);
    //     console.log(`Inserted ${insertResult.insertedCount} document into the collection`);
    // } catch (error) {
    //     console.error(error);
    // } finally {
    //     await client.close();
    // }
// }

// Example usage
// const clientId = 'vrfxbabib01BzT2xxDzfCf76yvI5c3uEXKDvdno';
// const clientSecret = '9vEUFvOFTwx41n72kjx2bMjdY9IcL2oRAFbkOJeBnejZeAftueDgHe4SbRcsMJOuIHVnTXfOD3hLpXEaBDHLyhDv3adKygmPlfPXRmIHUPRvVRwExiuTIeN0gKAxlOFi';
// const username = 'rubi_in';
// const apiKey = '534106092094e6999172fa4b5e26354e';
// const filePath = '90549817007.png';

// const veryfiClient = new Client(clientId, clientSecret, username, apiKey);
// const results = async () => await veryfiClient.process_document('90549817007.png');
// results().then(console.log)
// processDocumentAndSaveToMongoDB(clientId, clientSecret, username, apiKey, filePath);



// const GetData = async (req, res) => {
//     try {
      
//         let user = await User.find({ _id: Userid }).select(['-password', '-otp']);
//         if (user.role == "DRIVER") {
//             let detail = await DriverDetails.find({ driver_id: user._id })
//             res
//                 .status(200)
//                 .json({ message: "User company Details", user, detail });
//         }

//         res
//             .status(200)
//             .json({ message: "User company Details", user });
//     } catch (error) {
//         res.status(400).json({ message: error.message, status: false });
//     }
// };

// const tesseract = require("node-tesseract-ocr")

// const config = {
//     lang: "eng",
//     oem: 1,
//     psm: 3,
// }


