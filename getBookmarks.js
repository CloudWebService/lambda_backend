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
  await client.connect();
  const collection = await client.db(dbName).collection("Bookmarks");
  const items = await collection.find({userId : userId}).toArray();
  const eventIds = items.map(bookmark => bookmark.eventId);
  const objectIdEventIds = eventIds.map(id => new ObjectId(id));
  const relatedEvents = await client.db("CulturalEventDB").collection("CulturalEvents").find({ _id: { $in: objectIdEventIds }}).toArray();
  
  const response = {
    statusCode: 200,
    body : JSON.stringify(relatedEvents, null, 2)
  };
  return response;
};
