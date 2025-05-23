import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let subjectList = [];
let textList = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  let subject = req.body["subject"];
  let text = req.body["text"];
  subjectList.push(subject);
  textList.push(text);
  res.redirect("/");
});

app.post("/remove", (req, res) => {
  let i = parseInt(req.body["index"]);
  subjectList.splice(i, 1);
  textList.splice(i, 1);
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    subjects: subjectList,
    texts: textList,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
