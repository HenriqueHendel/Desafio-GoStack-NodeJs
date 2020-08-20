const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const project = {id: uuid(), title: title, url: url, techs: techs, likes:0};

  repositories.push(project);

  return response.status(201).json(project);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  projectIndex = repositories.findIndex(project=>project.id==id);

  if (projectIndex < 0) {
    return response.status(400).json({erro: "repository not found"})
  }
  
  projectLikes = repositories[projectIndex].likes;

  const project = {id: id, title: title, url: url, techs: techs, likes: projectLikes};

  repositories[projectIndex] = project;

  return response.status(200).json(project);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const projectIndex = repositories.findIndex(project=>project.id==id);

  if(projectIndex < 0) {
    return response.status(400).json({erro: "Repository not found"});
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const projectIndex = repositories.findIndex(project=>project.id==id);
  
  if(projectIndex < 0 ) {
    return response.status(400).json({erro: "Repository not found"});
  }
  const title = repositories[projectIndex].title;
  const url = repositories[projectIndex].url;
  const techs = repositories[projectIndex].techs;
  const likes = repositories[projectIndex].likes;

  const project = {id: id, title: title, url: url, techs: techs, likes: likes+1};

  repositories[projectIndex] = project;

  return response.status(201).json(project);
});

module.exports = app;
