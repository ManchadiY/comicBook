const express = require("express");
const app = express();
const morgan = require("morgan");

const comicRouter = require("./Routes/comicRoutes");

//middleware of express for body parser
app.use(express.json());

//morgan
app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "hello from the server side",
//   });
// });

//start a server
// const port = 3000;
// app.listen(port, () => {
//   console.log("app is runing on the port ");
// });

app.use("/", comicRouter);
//routes

// handling unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `cant find ${req.originalUrl} on the server`,
  });
});

module.exports = app;
