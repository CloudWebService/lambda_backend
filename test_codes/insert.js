const fs = require('fs');
const csv = require('csv-parser');

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

const csvFilePath = 'culture_event.csv';
const jsonArray = [];

async function push() {
  try {
    await client.connect();
    const collection = await client.db(dbName).collection("CulturalEvents");
    //await collection.deleteMany({});
    await collection.insertMany(jsonArray)
    // await collection.updateMany(
    //     { start_date: { $exists: true, $type: "string" } },
    //     { $set: { start_date: { $dateFromString: { dateString: "$start_date" } } } }
    //   );
    // await collection.updateMany(
    //     { end_date: { $exists: true, $type: "string" } },
    //     { $set: { end_date: { $dateFromString: { dateString: "$end_date" } } } }
    //   );
  } finally {
    await client.close();
  }
}

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    row.start_date = new Date(row.start_date);
    row.end_date = new Date(row.end_date);
    jsonArray.push(row);
  })
  .on('end', () => {
    push();
  });
