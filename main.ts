import express from "express";
import userRouter from "./routes/userRoutes.ts";

const app = express();
app.use(express.json());

app.use("/users", userRouter);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the PAMA - House Chore API!");
});

app.use("/users", userRouter);

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});
