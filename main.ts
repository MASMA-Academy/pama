// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import details from "./details.json" with { type: "json" };
import { familyDetailRouter } from "./router/familyDetailRoute.ts";
import { choresRouter } from "./router/ChoresRoute.ts"; 

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the PAMA - House Chore API!");
});

app.get("/details", (req, res) => {
  res.send(details);
});

app.use("/family-details", familyDetailRouter);
app.use("/chores", choresRouter);

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});
