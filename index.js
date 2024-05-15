// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

function isUnixTimestamp(str) {
  if (str) {
    const timestampRegex = /^\d{10,13}$/;
    return timestampRegex.test(str);
  } else {
    return false;
  }
}

app.get("/api", function (req, res) {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  try {
    const isUnix = isUnixTimestamp(date);
    if (!date || (!isUnix && isNaN(new Date(date)))) {
      res.json({ error: "Invalid Date" });
    }
    const unix = isUnix ? parseInt(date) : new Date(date).getTime();
    const utc = isUnix
      ? new Date(parseInt(date)).toUTCString()
      : new Date(date).toUTCString();
    res.json({
      unix: date ? unix : new Date(),
      utc: date ? utc : Date.now(),
    });
  } catch {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
