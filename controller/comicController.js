const comicBook = require("./../model/comicModel");

//get req,to get all the comic
// exports.getAllComics = async (req, res) => {
//   try {
//     const comics = await comicBook.find();
//     res.status(200).json({
//       status: "success",
//       results: comics.length,
//       data: comics,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };

//function to convert author from any case to camelcase
function capitalizeName(name) {
  return name
    .toLowerCase() // Convert entire string to lowercase first
    .split(" ") // Split the string by spaces into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join the array back into a string
}

//post req,create a comic book
exports.createComicBook = async (req, res) => {
  try {
    console.log(req.body);
    const comic = await comicBook.create(req.body);
    res.status(201).json({
      data: comic,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

//get a single comic book by id
exports.getComic = async (req, res) => {
  try {
    console.log(req.params);
    const comic = await comicBook.findById(req.params.id);
    // console.log(comic);
    if (!comic)
      return res.status(404).json({
        message: "couldnt find comic with ths id",
      });
    res.status(200).json({
      status: "success",
      data: comic,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

//delete a comic book based on id
exports.deleteComic = async (req, res) => {
  try {
    console.log(req.params);
    const comic = await comicBook.findByIdAndDelete(req.params.id);
    // console.log(comic);
    if (!comic)
      return res.status(404).json({
        message: "couldnt find comic with ths id",
      });
    res.status(200).json({
      message: "comic book deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//upate a comic
exports.updateComic = async (req, res) => {
  try {
    const updatedComic = await comicBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    console.log(updatedComic);
    if (!updatedComic)
      return res.status(404).json({ message: "Comic book not found" });

    res.status(200).json({
      status: "success",
      data: {
        updatedComic,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//get comic based on filter ,sort pagination
// GET all comic books with pagination, filtering, and sorting
exports.getAllComicBook = async (req, res) => {
  try {
    // Pagination settings (defaults to page 1 with 10 results per page)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering options
    let filter = {};
    if (req.query.author) filter.author = capitalizeName(req.query.author);
    if (req.query.year) filter.year_of_publication = req.query.year;
    if (req.query.price) filter.price = req.query.price;
    if (req.query.condition) filter.condition = req.query.condition;

    console.log(filter);

    // Sorting options (defaults to ascending by _id if not specified)
    let sort = {};
    if (req.query.sort) {
      const order = req.query.order === "desc" ? -1 : 1; // Defaults to ascending if 'order' is not provided
      sort[req.query.sort] = order;
    } else {
      sort._id = 1; // Default sorting by ID
    }

    // Find comic books with filter, sort, pagination
    const comics = await comicBook
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total number of comics for pagination purposes
    const totalComics = await comicBook.countDocuments(filter);

    // Send the response with comics, pagination info
    res.status(200).json({
      totalResults: totalComics,
      totalPages: Math.ceil(totalComics / limit),
      currentPage: page,
      resultsPerPage: limit,
      comics: comics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
