const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ecommerce:E7Af1cYz1C1Y9HqE@masum105ahmed.3bdkcsr.mongodb.net/?retryWrites=true&w=majority&appName=masum105ahmed";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productsCollection = client.db('ecomercedb').collection('products')
    const productdetailCollection = client.db('ecomercedb').collection('productdetail')
    app.get('/products', async(req, res)=>{
        const cursor = productsCollection.find()
        const products = await cursor.toArray()
        res.send(products)
    })
    app.get('/productdetail', async(req, res)=>{
        const cursor = productdetailCollection.find()
        const productdetail = await cursor.toArray()
        res.send(productdetail)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})