const express = require('express')
const pug = require('pug');
var bodyParser = require('body-parser');
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let names = ['Jose', 'Luis']

app.get('/', (req, res) => res.sendFile('index.html'))
app.get('/pug', (req, res) => res.render('pugIndex', {names}))
app.post('/save-user', function(req, res) {
    console.log(req.body);
    names.push(req.body.name);
    res.json({message:"New name added"})
})

app.post('/delete-user', function(req, res) {
    console.log(req.body);
    // names.pop(req.body.name); Si hago un pop saco al de arriba, no al seleccionado :(
    for( var x = 0; x < names.length; x++){ 
        if ( names[x] === req.body.name) {
          names.splice(x, 1); 
            x--;
        }
     }
    res.json({message: req.body.name + "User was deleted"})
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))