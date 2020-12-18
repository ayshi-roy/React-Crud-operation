const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const MongoClient = require('mongodb').MongoClient;
const fileUpload = require('express-fileupload');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express()

app.use(express.static('images'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jmmpi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("crudOperation").collection("cardData");
  console.log("database connected");  
  
  app.post('/addInformation', (req, res) => {
      const file = req.files.file;
      const title = req.body.title;
      const name = req.body.name;
      const tags = req.body.tags;
      const filePath = `${__dirname}/images/${file.name}`
      console.log(name, title, tags, file);
      file.mv(filePath, err =>{
          if(err){
             console.log(err);
             return res.status(500).send({msg: "failed to upload image"});
          }
          const newImg = fs.readFileSync(filePath);
          const encImg = newImg.toString('base64');

          var image = {
              contentType: req.files.file.mimetype,
              size: req.files.file.size,
              img: Buffer(encImg, 'base64')
          }

          collection.insertOne({title, name, tags, image})
          .then(result => {
              fs.remove(filePath, error => {
                 if(error){console.log(error);}
                 res.send(result.insertedCount > 0)
              })
              
          })
      })
  })

  app.get('/allInformation', (req, res) =>{
      collection.find({})
      .toArray( (err, documents) => {
        res.send(documents);
      })
  })

  app.get('/singleInformation/:id',(req, res) => {
      collection.find({_id: ObjectId(req.params.id)})
      .toArray( (err, documents) => {
        res.send(documents[0]);
      })
  })

  app.patch('/update/:id', (req, res) => {
      collection.updateOne({_id: ObjectId(req.params.id)},
      {
        $set: {title: req.body.title, name: req.body.name, tags: req.body.tags}
      })
      .then(result => {
        console.log(result);
      })
  })
  // app.patch('/update/:id', (req, res) => {
  //   const file = req.files.file;
  //   const title = req.body.title;
  //   const name = req.body.name;
  //   const tags = req.body.tags;
      
  //   const filePath = `${__dirname}/images/${file.name}`

  //   file.mv(filePath, err =>{
  //     if(err){
  //        console.log(err);
  //        return res.status(500).send({msg: "failed to upload image"});
  //     }
  //     const newImg = fs.readFileSync(filePath);
  //     const encImg = newImg.toString('base64');
  //     var image = {
  //       contentType: req.files.file.mimetype,
  //       size: req.files.file.size,
  //       img: Buffer(encImg, 'base64')
  //   }
  //   collection.updateOne({_id: ObjectId(req.params.id)},
  //   {
  //     $set: {title, name, tags, image}
  //   })
  //   .then(result => {
  //     console.log(result);
  //   })
  // })

  app.delete('/delete/:id', (req, res) =>{    
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {      
      console.log(result);
    })
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)
