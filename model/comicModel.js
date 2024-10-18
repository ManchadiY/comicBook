const mongoose = require("mongoose");

//define the schema
const comicBookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: [true, "A comic must have a bookname"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "A comic must have a author name"],
  },
  year_of_publication: {
    type: Number,
    required: [true, "A comic must have a year of publication"],
  },
  price: {
    type: Number,
    required: [true, "A comic must have a price"],
  },
  number_of_pages: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ["New", "Used"], // Only allow "New" or "Used"
    required: [true, "A comicbook must have condition(new or used)"],
  },
  description: {
    type: String,
  },
});

//create the model
const comicBook = mongoose.model("comicBook", comicBookSchema);

//export the model
module.exports = comicBook;
