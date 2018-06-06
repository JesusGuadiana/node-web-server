const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = now + ":" + req.method + req.url;

  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) =>{
    if(err){
      console.log("Unable to append to server.log");
    }
  });
  next();
});

//Entrar a modo mantenimiento
// app.use((req, res, next) => {
//   res.render("manteinance.hbs")
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) =>{
  return text.toUpperCase();
});

app.get("/", (req, res)=> {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to the Home Page of the application"
  });
});

app.get("/about", (req, res) =>{
  res.render("about.hbs", {
    pageTitle: "About page"
  });
});

app.get("/portfolio", (req, res) =>{
  res.render("portfolio.hbs", {
    pageTitle: "Portfolio page"
  })
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "The attempted request couldnt be handled"
  });
});


app.listen(port, () => {
  console.log("Server running in port " + port);
});
