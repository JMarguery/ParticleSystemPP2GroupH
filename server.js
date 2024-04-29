const express = require('express');
const router = express.Router();
const PORT = 3000;
const app = express();
const path = require('path');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  var request = req.query.request;
  if (request == null){
    request = "windmap";
  }
  res.render('index', {request : request});

});

app.get("/indexStyle", (req, res) => {
  res.sendFile(__dirname + "/styles/style.css", { headers: { "Content-Type": "text/css" } });
});

app.get("/navbarStyle", (req,res) => {
  res.sendFile(__dirname + "/styles/navbar.css" , {headers : { "Content-Type" : "text/css"}});
});



app.get("/indexJs/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname + "/" + fileName , {headers : { "Content-Type" : "text/javascript" } });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

app.get("/windmap/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname+"/windmap/"+fileName , {headers : { "Content-Type" : "text/javascript" } });
});

app.get("/data/:file", (req,res) => {
  const fileName = req.params.file;
  res.sendFile(__dirname+"/windmap/data/"+fileName, {headers : { "Content-Type" : "application/json" } });
});

app.set('views', path.join(__dirname, 'views'));

module.exports = router;