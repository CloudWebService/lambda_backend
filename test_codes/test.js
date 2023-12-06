const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://isoo127:i3f7JMqOD2XCqmo6@cluster.gttx63k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'BookmarkDB'; 

async function push(userId, eventId) {
  try {
    await client.connect();
    const collection = await client.db(dbName).collection("Bookmarks");
    await collection.insertOne({userId : userId, eventId : eventId});
  } finally {
    await client.close();
  }
}

module.exports.handler = async (event) => {
  const body = event['queryStringParameters'];
  const userId = body['userId'];
  const eventId = body['eventId'];
  await push(userId, eventId);
  const response = {
    statusCode: 200,
    body : userId
  };
  return response;
};
