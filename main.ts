import express from "express";
import details from "./details.json" with { type: "json" };


const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the PAMA - House Chore API!");
});

app.get("/details", (req, res) => {
  res.send(details);
});


app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});
