var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const wrongTypeDate = (date)=>{
  return date.toUTCString()==='Invalid Date'
 
}

app.get('/api/:date',(req,res)=>{
  
  let date = new Date(req.params.date)

  if(wrongTypeDate(date)){
    date= new Date(+req.params.date)
  }
  if(wrongTypeDate(date)){
    res.json({ error : "Invalid Date" })
  }
 res.json({
  unix:date.getTime(),
  utc:date.toUTCString()
 })
})

app.get('/api', (req,res)=>{
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})
