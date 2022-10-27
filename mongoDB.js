const mongoose = require("mongoose");


//connection established and db create
mongoose.connect("mongodb://localhost:27017/sudiptaDB")
.then(() => console.log("connection successfull"))
.catch((err) => console.log(err))
;

//Schema
//a mongoose schema defines the structure of the document
//default values, validators etc.

//playlistSchema object or instance
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, //validators
        trim: true,
        minlength: [2, "minimum 2 letters"], // custom error message
        maxlength: 30
    },
    type: String,
    videos: {
        type: Number,
        validate(value){    //custom validators
            if(value < 0){
                throw new Error("Video count cant be negative");
            }
        }
    },
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

// A mongoose model is a wrapper on the mongoose schema.
// model provides an interface to the database for creating querying deleting records
// etc  i.e creating collection with models

//collection creation
//in model Playlist class, pascal convection, should be singular
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create document or insert

const createDocument = async () => {
    try{
        const mongoPlaylist =new Playlist({
            name: "MongoDB",
            type: "Back End",
            videos: 20,
            author: "Sudipta",
            active: true
        })
        const mongoosePlaylist =new Playlist({
            name: "Mongoose",
            type: "Back End",
            videos: 10,
            author: "Sudipta",
            active: true
        })
        const expressPlaylist =new Playlist({
            name: "Express JS",
            type: "Back End",
            videos: 30,
            author: "Sudipta",
            active: true
        })
        const rubyPlaylist =new Playlist({
            name: "Ruby",
            type: "Back End",
            videos: 50,
            author: "Sudipta",
            active: true
        })
        //async await, better than promise
        //for one document
        //const result = await reactPlaylist.save();

        //for many
        const result = await Playlist.insertMany([mongoPlaylist, mongoosePlaylist, expressPlaylist, rubyPlaylist]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

//createDocument();

//reading document

// const getDocument = async () => {
//     try{
//         const result = await Playlist.find()
//     .limit(1);
//     console.log(result);
//     }catch(err){
//         console.log(err);
//     }
// }

// getDocument();

//Query comparison
const getDocument = async () => {
    try{
        const result = await Playlist
        .find({videos: {$gt: 50}})
        //.limit(1);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

//getDocument();

//update document

// _id is used for object destructuring
const updateDocument = async (_id) => {
    try{
        //it can be used but better method exists
        //const result = await Playlist.updateOne({_id},{
        const result = await Playlist.findByIdAndUpdate({_id},{
            $set : {
                name : "Javascript"
            }
        }, {
                new: true,
                useFindAndModify: false
        });
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

//in realworld id is get using api
//updateDocument("635a43b96260e43cb8f0460b");

//deletion of document

const deleteDocument = async (_id) => {
    try{

        //const result = await Playlist.deleteOne({_id})
        const result = await Playlist.findByIdAndDelete({_id})
        console.log(result);
    }catch(err){
        console.log(err);
    }
}


//deleteDocument("635a3c90f8a43013b4efb3ff");
