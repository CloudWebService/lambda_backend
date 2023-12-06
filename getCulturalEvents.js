const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://isoo127:<password>@cluster.gttx63k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'CulturalEventDB'; 

module.exports.handler = async (event) => {
  console.log(event['queryStringParameters']);
  const querys = event['queryStringParameters'];
  const district = querys['district'];
  const category = querys['category'];
  const category_array = category.split(',');
  const start_date = querys['start_date'];
  const end_date = querys['end_date'];

  var result;
  try {
    await client.connect();
    const collection = await client.db(dbName).collection("CulturalEvents");
    var item;
    if(district === 'null' && category === 'null' && start_date === 'null') {
      item = await collection.find({}).toArray();
    } else if(district === 'null' && category === 'null') {
      item = await collection.find({start_date: { $gte: new Date(start_date) }, end_date: { $lte: new Date(end_date) }}).toArray();
    } else if(district === 'null' && start_date === 'null') {
      item = await collection.find({category : {$in : category_array}}).toArray();
    } else if(district === 'null') {
      item = await collection.find({category : {$in : category_array}, start_date: { $gte: new Date(start_date) }, end_date: { $lte: new Date(end_date) }}).toArray();
    } else if(category === 'null' && start_date === 'null') {
      item = await collection.find({district : district}).toArray();
    } else if(category === 'null') {
      item = await collection.find({'district' : district, start_date: { $gte: new Date(start_date) }, end_date: { $lte: new Date(end_date) }}).toArray();
    } else if(start_date === 'null') {
      item = await collection.find({district : district, category : {$in : category_array}}).toArray();
    } else {
      item = await collection.find({district : district, category : {$in : category_array}, start_date: { $gte: new Date(start_date) }, end_date: { $lte: new Date(end_date) }}).toArray();
    }
    
    result = JSON.stringify(item, null, 2);
  } finally {
    await client.close();
  }
  
  const response = {
    statusCode: 200,
    body: result
  };
  return response;
};
