const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const attractionsRoute = require('./routes/attractions')
const artworkRoute = require('./routes/artworks')
const guesthouseRoute = require('./routes/guesthouses')
const hotelRoute = require('./routes/hotels')
const museumRoute = require('./routes/museums')



dotenv.config();

app.use(express.json());

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);
app.use("/api/attractions",attractionsRoute);
app.use("/api/artworks",artworkRoute);
app.use("/api/guesthouses",guesthouseRoute);
app.use("/api/hotels",hotelRoute);
app.use("/api/museums",museumRoute);

app.use('/',(req, res)=>{
  res.send("Welcome to Addis Tourist API!!!")
})
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("Backend server is running on port " + port);
});
