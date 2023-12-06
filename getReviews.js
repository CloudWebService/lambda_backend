const { ObjectId, MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://isoo127:<password>@cluster.gttx63k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'ReviewDB'; 


module.exports.handler = async (event) => {
  const body = event['queryStringParameters'];
  const restaurantId = body['restaurantId'];
  await client.connect();
  const collection = await client.db(dbName).collection("Reviews");
  const items = await collection.find({restaurantId : restaurantId}).toArray();
  
  const response = {
    statusCode: 200,
    body : JSON.stringify(items, null, 2)
  };
  return response;
};

