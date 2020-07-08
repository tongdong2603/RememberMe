const request = require('request')
const moment = require('moment')
const querystring = require('querystring')
module.exports = class Kintone {
	constructor (url,options,headers) {
		this.url = url
		this.accessToken = options.accessToken
		this.headers = this.getHeaders()
		this.body = {
			"app":process.env.KINTONE_APP,
			"record":{}
		}
	}

	getHeaders() {
		return {
			'X-Cybozu-Authorization':this.accessToken,
			'Authorization':'Basic '+this.accessToken,
			'Content-Type': 'application/json'
		}
	}

	/**
	 * https://developer.cybozu.io/hc/ja/articles/360000425163#step1
	 * only request post
	 */
	async post(params,callback) {

		let query = querystring.stringify(params)
			this.body = Object.assign({},this.body,params)
			// console.log(this.body)
			await request.post({
				headers: this.headers,
				url: this.url,
				body: JSON.stringify(this.body),
			}, function(error, response, body){
				if(error && typeof callback ==='function') {
					callback(null,error)
				}
				if(!!response && response.statusCode == 200) {
					let result = body
					if(typeof callback ==='function') {
						callback(result,null)
					}
					
				} 
				if(typeof callback ==='function') {
					callback(null,body)
				}
				// let result = JSON.parse(body)
			});
	}

	
}
