const {a, router, router2, apptwo} = require('./modules/module1.js');
const express = require('express');
const app = express();
const multer = require('multer');

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-savedmulter-" + file.originalname);
  }
});

const forshow = multer.diskStorage({

})

const upload = multer({storage: storageEngine});

// mount the router on the app
app.use(router2);
app.use(router);
app.use(apptwo);
// to encode something like html form
app.use(express.urlencoded({extended: true}));
// to encode json?
app.use(express.json());
app.use(express.static(__dirname + '/images'));

app.post('/sendimage', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('sending complete faiz');
});

app.get('/getimage', (req, res) => {
  res.sendFile(__dirname + '/images/1647969602445-savedmulter-giving.jpg');
});

app.get('/secondhtml', (req, res) => {
  res.sendFile(__dirname + '/images/secondhtml.html');
});

app.route('/').get((req, res) => {
  res.sendFile(__dirname + '/images/index.html');
});

app.listen(3000, () => console.log('server running 3000'));
