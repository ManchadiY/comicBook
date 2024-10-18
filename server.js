const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

//handling uncaughtException using event listner
process.on("uncaughtException", (err) => {
  console.log("uncaughtException shuting down ...");
  console.log(err.name, err.message);
  process.exit(1); //uncaught exception if its 1 , if its 0 its success
});

const db = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
// const db = `mongodb+srv://yuvrajmanchadi321:E9XJ3R39KODyDE4C@comic.xsip3.mongodb.net/comic?retryWrites=true&w=majority&appName=comic`;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log("Db connected succesfully");
  });

const port = 3000;
app.listen(port, () => {
  console.log("app is runing on the port ");
});

//handling unhandled rejection using event listner
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLKED REJECTION  shuting down ...");
  server.close(() => {
    process.exit(1); //uncaught exception if its 1 , if its 0 its success
  });
});
