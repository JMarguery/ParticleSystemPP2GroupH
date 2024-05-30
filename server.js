const express = require('express');
const router = express.Router();
const PORT = 3000;
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get("/", (req, res) => {
    request = "windmap";
  res.render('index');

});

app.get("/activity/:x", (req,res) => {
  const activity = req.params.x;
  switch (activity){
    case "electionmap":
      res.render('index', {request : "electionmap"});
      break;
    case "windmap":
      res.render('index', {request : "windmap"});
      break;
    case "firework":
      res.render('index',{request : "firework"});
      break;
    case "physic":
      res.render('index',{request : "physic"});
      break;
    case "fire":
      res.render('index',{request : "fire"});
      break;
    case "tree":
        res.render('index',{request : "tree"});
        break;
    default:
      res.render('index', {request : "windmap"});
  }})

app.get("/test/:x", (req,res) => {
  const activity = req.params.x;
  switch (activity){
    case "windmap":
      res.render('index', {request : "test_windmap"});
      break;
    case "firework":
      res.render('index',{request : "test_firework"});
      break;
    case "physic":
      res.render('index',{request : "test_physic"});
      break;
    case "fire":
      res.render('index',{request : "test_fire"});
      break;
    case "tree":
      res.render('index',{request : "test_tree"});
      break;
    default:
      res.render('index', {request : "windmap"});
  }
});

app.get("/styles/:file", (req, res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/styles/"+fileName, { headers: { "Content-Type": "text/css" } });
});

app.get("/navbarStyle", (req, res) => {
  res.sendFile(__dirname + "/styles/navbar.css", { headers: { "Content-Type": "text/css" } });
});

app.get("/base/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/Base/"+fileName, {headers : {"Content-Type" : "text/javascript"}});
})

app.get("/indexJs/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/" + fileName , {headers : { "Content-Type" : "text/javascript" } });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

app.get("/windmapRessources/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname+"/Particles/windmap/"+fileName , {headers : { "Content-Type" : "text/javascript" } });
});

app.get("/windmapData/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname+"/Particles/windmap/data/"+fileName, {headers : { "Content-Type" : "application/json" } });
});

app.get("/fireworkRessource/:file" , (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/firework/"+fileName, {headers : {"Content-Type" : "text/javascript"} });
});

app.get("/physicRessource/:file" , (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/physic/"+fileName , {headers : {"Content-Type" : "text/javascript"} });
});

app.get("/fireRessource/:file" , (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/fire/"+fileName , {headers : {"Content-Type" : "text/javascript"} });
});

app.get("/treeRessource/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/tree/"+fileName , {headers : {"Content-Type" : "text/javascript"} });
})

app.get("/electionRessource/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/ElectionMap/script/"+fileName , {headers : {"Content-Type" : "text/javascript"} });
})

app.get("/electionData/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/ElectionMap/data/"+fileName , {headers : {"Content-Type" : "text/javascript"} });
})

app.get("/voteData/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/Particles/ElectionMap/data/voteData/"+fileName , {headers : {"Content-Type" : "text/csv"} });
})

app.get("/img/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname+"/img/"+fileName, {headers : {"Content-Type" : "image/jpeg"}});
})

app.post("/writeTest",(req,res) => {
  const dict = req.body;
  console.log("dict = ");
  console.log(dict);
  fs.writeFile("./tests/test.json",JSON.stringify(dict),(err) => {
    if(err){
      console.error("Erreur lors de l'écriture du fichier : ",err);
    }
    console.log("Test écris avec succès dans ./tests/test.json");
  })
});

app.set('views', path.join(__dirname, 'views'));

module.exports = router;