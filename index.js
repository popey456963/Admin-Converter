var fs = require('fs')
var kv = require('./kv.js')
var express = require('express')
var app = express()

var servers = {
  'ttt': './admins.cfg'
}

app.get('/:server', function (req, res) {
  if (servers[req.params.server] != undefined) {
    fs.readFile(servers[req.params.server], 'utf8', function (err,data) {
      if (err) {
        return console.log(err)
      }
      var data = kv.parse(data)['Admins']
      var end = { 'data': [] }
      for (var i in data) {
        end['data'].push({
          "user": i,
          "authid": data[i].identity,
          "group": data[i].group
        })
      }
      res.json(end)
    })
  } else {
    res.send("Invalid Server")
  }
})

app.get('/', function(req, res) {
  res.send("Nope.")
})

app.listen(3000, function () {
  console.log('App Running!')
})