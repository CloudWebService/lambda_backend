const { ObjectId, MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://isoo127:<password>@cluster.gttx63k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'BookmarkDB'; 


module.exports.handler = async (event) => {
  const body = event['queryStringParameters'];
  const userId = body['userId'];
  const eventId = body['eventId'];
  await client.connect();
  const collection = await client.db(dbName).collection("Bookmarks");
  await collection.deleteMany({ userId : userId, eventId : eventId });
  
  const response = {
    statusCode: 200
  };
  return response;
};