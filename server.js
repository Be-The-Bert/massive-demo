var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var _ = require('lodash');

var db = massive.connectSync({
  connectionString: 'postgres://pekzqstvpypeuq:000b09cfca924d397c170f8589e2439b134b0a988b5d66371545c2973fc71456@ec2-107-21-205-25.compute-1.amazonaws.com:5432/d51pa74l4u56mt?ssl=true'
});

var app = express();
app.use(bodyParser.json());

var port = 4000;

app.get('/', function(req, res) {
  var template = _.template(`
    <h1>Injuries list</h1>
    <% injuries.forEach(injury => )
  `)
  res.send(template({name: 'Buddy'}));
  // db.getAllInjuries( function(err, injuries) {
  //   res.send(injuries);
  // })
});

app.get('/incidents', function(req, res) {
  let state = req.query.state;
  let cause = req.query.cause;
  state ? 
    cause ?
      db.getStateCauseIncidents([state, cause], (err, incidents) => {
        res.send(incidents);
      })
    :
      db.getStateIncidents([state], (err, incidents) => {
        res.send(incidents);
      })
  :
    db.getAllIncidents((err, incidents) => {
      res.send(incidents);
    })
});

app.post('/incidents', function(req, res) {
  let incident = req.body;
  db.postIncident([incident.state, incident.injuryid, incident.causeid], (err, result) => {
    res.send(result[0]);
  })

});

app.listen(port, function() {
  console.log("Started server on port", port);
});
