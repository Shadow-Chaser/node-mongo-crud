const express = require("express");
const bodyParser = require("body-parser") 
const ObjectId = require("mongodb").ObjectID;
const MongoClient = require('mongodb').MongoClient;
// have to put username and password in uri
const uri = `mongodb+srv://<username>:<password>@cluster0.m8cui.mongodb.net/database1?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    // res.send('Hello')

    res.sendFile(__dirname+'/index.html')
})
  


client.connect(err => {
  const productCollection = client.db("database1").collection("collection1");

  app.get("/products", (req, res)=>{
    productCollection.find({})  // productCollection.find({}).limit(5)
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })

  app.get("/product/:id", (req, res)=>{
    productCollection.find({_id:ObjectId(req.params.id)})
    .toArray((err, documents) =>{
      res.send(documents[0])
    })
  })

  app.post("/addProduct", (req, res)=>{
    const product = req.body;
    // console.log(product);

    productCollection.insertOne(product)
    .then(result =>{
      console.log("product added")
      // res.send("product added successfully")
      res.redirect('/')
    })
   
  })


    app.patch('/update/:id', (req, res) => {
    productCollection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {price: req.body.updatedPrice, quantity: req.body.updatedQuantity}
    })
    .then(result =>{
      // console.log(result);
      res.send(result.modifiedCount>0);
    })
  })

  app.delete("/delete/:id", (req, res)=>{
    // console.log(req.params.id);
    productCollection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result => {
      // console.log(result)
      res.send(result.deletedCount>0);
      
    })
  })

  // const product = {
  //   name:"Honey",
  //   price: 25,
  //   quantity:15
  // }

  // collection.insertOne(product)
  // .then(result =>console.log("product added"))
  // console.log("db connected ");
  // perform actions on the collection object
  // client.close();
});


app.listen(3000);