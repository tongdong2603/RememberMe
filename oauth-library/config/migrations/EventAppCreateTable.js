const db = require('./../database').dynamodb;
const table = 'go-stg-event-app'
// const table = 'EventApp'

const params = {
    TableName : table,
    KeySchema: [       
        { AttributeName: "domain", KeyType: "HASH"},
        { AttributeName: "garoonEventId", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [   
        { AttributeName: "domain", AttributeType: "S" },
        { AttributeName: "garoonEventId", AttributeType: "S" },
        { AttributeName: "officeEventId", AttributeType: "S" },
        { AttributeName: "isNeedToSync", AttributeType: "S" },
        // { AttributeName: "subject", AttributeType: "S" },
        // { AttributeName: "notes", AttributeType: "S" },
        // { AttributeName: "isAllDay", AttributeType: "B" },
        // { AttributeName: "start", AttributeType: "S" },
        // { AttributeName: "end", AttributeType: "S" },
        // { AttributeName: "attendees", AttributeType: "S" },
        // { AttributeName: "creator", AttributeType: "S" },
        // { AttributeName: "createdTime", AttributeType: "S" },
        // { AttributeName: "updatedTime", AttributeType: "S" },
        
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 400,
        WriteCapacityUnits: 400
    },
    LocalSecondaryIndexes: [        
        {
            IndexName: "SearchByOfficeId",
            KeySchema: [
                { AttributeName: "domain", KeyType: "HASH"},
                { AttributeName: "officeEventId", KeyType: "RANGE"}
            ],
            Projection: {
                ProjectionType: "ALL"
            }
        },
        {
            IndexName: "SearchIfNeedToSync",
            KeySchema: [
                { AttributeName: "domain", KeyType: "HASH"},
                { AttributeName: "isNeedToSync", KeyType: "RANGE"}
            ],
            Projection: {
                ProjectionType: "ALL"
            }
        }
    ]
};


module.exports = db.listTables({},function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    let listTables = data.TableNames
    if(!listTables.includes(table)) {
      db.createTable(params, function(err, data) {
        if (err) {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
      });
    }
  }
})