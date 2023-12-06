const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://isoo127:<password>@cluster.gttx63k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'RestaurantDB'; 

module.exports.handler = async (event) => {
  console.log(event['queryStringParameters']);
  const querys = event['queryStringParameters'];
  const district = querys['district'];
  var result;
  
  await client.connect();
  const collection = await client.db(dbName).collection("Restaurant");
  var item;
  if(district === 'null')
    item = await collection.find({}).toArray();
  else
    item = await collection.find({자치구 : district}).toArray();
      
  result = JSON.stringify(item, null, 2);
  
  const response = {
    statusCode: 200,
    body: result
  };
  return response;
};
