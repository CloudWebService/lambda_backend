const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://isoo127:i3f7JMqOD2XCqmo6@cluster.gttx63k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'CulturalEventDB'; 
var result;

async function push() {
  try {
    await client.connect();
    const collection = await client.db(dbName).collection("CulturalEvents");
    await collection.insertMany()
    collection.insert
    
    result = JSON.stringify(item, null, 2);
    console.log(res);
  } finally {
    await client.close();
  }
}

push()
