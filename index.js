require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const Listing = require("./models/listing");
const geocode = require("./geocode");

// const bcrypt = require("bcrypt");
const app=express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const uri = process.env.MONGO_URL;


// app.get("/listings", async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// });

// app.get("/addPGs", async (req, res) => {
//   let tempPGs = [
//     {
//       title: "Green Stay PG",
//       description: "PG with WiFi, food, and laundry",
//       price: 8000,
//       location: "Bangalore",
//       facilities: ["WiFi", "Food", "Laundry"],
//       rating: 4.2,
//       available: true,
//     },
//     {
//       title: "Urban Nest PG",
//       description: "PG with AC, Gym, and WiFi",
//       price: 9000,
//       location: "Bangalore",
//       facilities: ["WiFi", "Gym", "AC"],
//       rating: 4.5,
//       available: true,
//     },
//   ];

//   await Listing.insertMany(tempPGs);

//   res.send("PGs Added ✅");
// });

app.get("/pgs", async (req, res) => {
  const data = await Listing.find({});
  res.json(data);
});
// app.get("/pgs/:id",async(req,res)=>{
//     const id = req.params.id;
//   const data=await Listing.findById(id);
//   res.json(data);
// });
app.get("/pgs/:id", async (req, res) => {
  try {
    const data = await Listing.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/pgs/addListing", async (req, res) => {
  console.log("HIT ROUTE");

  try {
    const {
      title,
      description,
      image,
      price,
      location,
      country,
      facilities,
      rating,
      available,
    } = req.body;

    const coordinates = await geocode(location);

    if (!coordinates) {
      return res.status(400).json({
        message: "Location not found"
      });
    }

    const newListing = new Listing({
      title,
      description,
      image: image?.trim() || undefined,
      price,
      location,
      country,
      facilities,
      rating,
      available,

      geometry: {
        type: "Point",
        coordinates: coordinates
      }
    });

    await newListing.save();

    res.status(201).json(newListing);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});
// const getCoordinates = require("./geocode");
// const coordinates = await geocode(req.body.location);
// app.post("/pgs/addListing",async(req,res)=>{
//   console.log("HIT ROUTE");
// try{
//   const{
//      title,

//   description,

//   image,

//   price,

//   location,

//   country,

//   facilities,

//   rating,

//   available,
//   }=req.body;
//   const newListing=new Listing({
//        title,

//   description,

//   image:image?.trim() || undefined,

//   price,

//   location,

//   country,

//   facilities,

//   rating,

//   available,

//   });
//   await newListing.save();
//   res.status(201).json(newListing);
// }catch(e){
//    res.status(500).json({
//       message: err.message,
//     });
// }
// });

app.delete("/pgs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.status(200).json({
      message: "Listing deleted successfully",
      deletedListing,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// app.get("/pgs/:id", async (req, res) => {
//   try {
//     const pg = await PG.findById(req.params.id);

//     if (!pg) {
//       return res.status(404).json({
//         message: "PG not found"
//       });
//     }

//     res.json(pg);
//   } catch (err) {
//     res.status(500).json({
//       error: err.message
//     });
//   }
// });
mongoose.connect(uri)
.then(() => {
  console.log("DB connected");

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
})
.catch(err => console.log(err));
