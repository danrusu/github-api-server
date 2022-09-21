const express = require("express");
const app = express();
const path = require("path");
const { postQuestion } = require("./githubApi");

app.use(express.json());
app.use(express.static("public"));

const serveFileFromRoot = (res, relativePath) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

const serveHome = (_, res) => serveFileFromRoot(res, "index.html");
const postmanQuestion = async (request, res) => {
  await postQuestion(request.body);
  res.sendStatus(200);
};
// routes
app.get("/", serveHome);
app.post("/postman/q", postmanQuestion);

const notifyServerStart = () =>
  console.log(`server listening at http://localhost:${port}/`);

const port = process.env.PORT || 1111;
app.listen(port, notifyServerStart);
