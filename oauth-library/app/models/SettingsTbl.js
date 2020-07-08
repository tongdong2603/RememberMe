const db = require('./../../config/database').documentClient;
const moment = require('moment')
const now = moment().toISOString();
const lasted = moment().subtract(1,"months").toISOString();
const table = "Setting-Garoon-Office"

createItem = async function(params) {
	return new Promise((resolve,reject) => {
	  db.putItem(params, function(err, data) {
	    if (err) {
	      reject(err);
	    } else {
	      resolve(data);
	    }
	  });
	})
}
exports.createItem = createItem

fetchAll = async function() {
	return new Promise((resolve,reject) => {
	  db.scan({
	  	'TableName' : table 
	  }, function(err, data) {
	    if (err) {
	      reject(err);
	    } else {
	      resolve(data);
	    }
	  });
	})
}
exports.fetchAll = fetchAll

deleteItem = async function(domain) {
	return new Promise((resolve,reject) => {
		var params = {
	    TableName: table,
	    Key: {
	      "domain": domain,
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


exports.getDomain = async function(domain) {
	console.log(domain)
	return new Promise((resolve,reject) => {
		var params = {
	    	TableName: table,
	    	Key: {
	      		"domain": domain,
	    	}
	  	};

	  	db.get(params, function(err, data) {
	    	if (err) {
	      		reject(err);
	    	} else {
	      		resolve(data);
	    	}
	  	});
	})
}

