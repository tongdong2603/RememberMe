const db = require('./../../config/database').documentClient;
const moment = require('moment')
const now = moment().toISOString();
const lasted = moment().subtract(1,"months").toISOString();
const table = "EventApp"

create = async function(item,callback) {
	return new Promise((resolve,reject) => {
		let params = {
			TableName:table,
			Item:item
		}
		db.put(params, function(err, data) {
			if(typeof callback === 'function') {
				if(err) {
					callback(null,err)
				} else {
					callback(data,null)
				}
			}
		});
	})
}
exports.create = create

deleteItem = async function(domain,eventId) {
	return new Promise((resolve,reject) => {
		var params = {
		TableName: table,
		Key: {
		  "domain": {
			S:domain
		  },
		  "eventId": {
			S:eventId
		  },
		}
	  };

	  db.deleteItem(params, function(err, data) {
		if (err) {
		  reject(err);
		} else {
		  resolve(data);
		}
	  });
	})
	
}
exports.deleteItem = deleteItem

getItem = function(domain,eventId) {
	return new Promise((resolve,reject) => {
		var params = {
	  Key: {
		"domain": {
		  S: domain
		}, 
		"eventId": {
			S:eventId
		  },
	  }, 
	  TableName: table,
	  // ProjectionExpression:"domain,officeUpdatedAt,googleUpdatedAt"
	};
	db.getItem(params, function(err, data) {
	  if (err) {
		reject(err)
	  } else {
		resolve(data)
	  }
	});
	})
}
exports.getItem = getItem

batchGetItem = function(array) {
	return new Promise((resolve,reject) => {
		var params = {
			"RequestItems" : {}
		};

		params.RequestItems[table] = {
			"Keys" : array
		}
		
		db.batchGet(params, function(err, data) {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
			});
		})
}
exports.batchGetItem = batchGetItem

scanByDomain = async function(domain) {
	return new Promise((resolve,reject) => {
		db.scan({
			'TableName' : table,
			ExpressionAttributeValues: {
			   ":s": {
				 S: domain
				}
			}, 
			FilterExpression: "#domain = :s", 
			ExpressionAttributeNames: {
				"#domain": "domain"
			}
		}, function(err, data) {
		if (err) {
			reject(err);
		} else {
			resolve(data);
		}
	  });
	})
}
exports.scanByDomain = scanByDomain

exports.update = async function(obj,callback) {
	return new Promise((resolve,reject) => {
		var defaultObj = {
			domain:'',
			garoonEventId:'',
			officeEventId:'',
			updatedTime:'',
		}
		obj = Object.assign({},defaultObj,obj)
		var params = {
			TableName: table,
			Key: {
				"domain": obj.domain,
				"garoonEventId": obj.garoonEventId,
			}, 
			ExpressionAttributeNames: {
			   "#o": "officeEventId",
			   "#n": "isNeedToSync",
			},
			ReturnValues: "ALL_NEW", 
			UpdateExpression: "SET #o = :s, #n = :n",
			ExpressionAttributeValues: {
				":s": obj.officeEventId,
				":n":obj.isNeedToSync
			},  
		};

		db.update(params, function(err, data) {
			if(typeof callback === 'function') {
				if(err) {
					callback(null,err)
				} else {
					callback(data,null)
				}
			}
		});
	})
}














