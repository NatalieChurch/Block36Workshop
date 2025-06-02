import express from "express";
const app = express();
import router from "#api/folders";


app.use(express.json());

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});


export default app;
