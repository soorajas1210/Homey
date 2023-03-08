const express = require("express");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddlewares");

const app = express();
//dotenv conig
dotenv.config();

// mongodb connection
connectDB();

//middlewares
app.use(express.json());
// app.use(moragan("dev"));

app.get("/",(req,res)=>{
  res.send("API is running")
});


// routes
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

//port
const PORT = process.env.PORT || 5000;
//listen port
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
});
