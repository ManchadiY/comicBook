const express = require("express");
const ComicController = require("./../controller/comicController");
const comicRoutes = express.Router();

//route
comicRoutes.route("/comics").get(ComicController.getAllComicBook);
comicRoutes
  .route("/comics/:id")
  .get(ComicController.getComic)
  .patch(ComicController.updateComic)
  .delete(ComicController.deleteComic);
comicRoutes.route("/createComicBook").post(ComicController.createComicBook);
module.exports = comicRoutes;
