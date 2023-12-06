const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://isoo127:<password>@cluster.gttx63k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'ReviewDB'; 

async function push(userId, restaurantId, comment) {
  try {
    await client.connect();
    const collection = await client.db(dbName).collection("Reviews");
    await collection.insertOne({userId : userId, restaurantId : restaurantId, comment : comment});
  } finally {
    await client.close();
  }
}

module.exports.handler = async (event) => {
  const body = event['queryStringParameters'];
  const userId = body['userId'];
  const restaurantId = body['restaurantId'];
  const comment = body['comment'];
  await push(userId, restaurantId, comment);
  const response = {
    statusCode: 200,
    body : userId
  };
  return response;
};
