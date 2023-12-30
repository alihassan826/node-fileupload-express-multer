const express = require('express')
const app = express();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage })

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(200).send(req.file)
    } catch (err) {
        res.status(500).send(JSON.stringify(err));
    }
});

app.listen(3000, () => {
    console.log('Api is running')
});
