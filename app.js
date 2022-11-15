const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")


})


app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "a24a4b3ea3b2cca743be47e85b06f648";
  const units ="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+"";
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temparature in "+query+" is " + temp + " degrees celcius.</h1>");
      res.write(`<p>and weather is currently ${weatherDescription} </p>`);
      res.write("<img src="+imageURL+">");
      res.send();

    })
  })

})



app.listen(3000);
