const db = require('./../database').dynamodb;
// const table = 'Setting-Garoon-Office'
const table = 'go-stg-setting'
const params = {
	TableName : table,
	KeySchema: [       
		{ AttributeName: "domain", KeyType: "HASH"}
	],
	AttributeDefinitions: [       
		{ AttributeName: "domain", AttributeType: "S" }
		// { AttributeName: "runTime", AttributeType: "N" },
		// { AttributeName: "beforeRunTime", AttributeType: "S" },
		// { AttributeName: "serviceld", AttributeType: "S" },
		// { AttributeName: "apiToken", AttributeType: "S" },
		// { AttributeName: "userInfo", AttributeType: "M" },
		// { AttributeName: "garoonUser", AttributeType: "S" },
		// { AttributeName: "createdTime", AttributeType: "S" },
		// { AttributeName: "updatedTime", AttributeType: "S" },
			
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 400,
		WriteCapacityUnits: 400
	},
  	StreamSpecification: {
    	StreamEnabled: false
  	},
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
