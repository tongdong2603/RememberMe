const request = require('request')
const moment = require('moment-timezone').tz.setDefault("Asia/Tokyo");
const querystring = require('querystring')
const _username = process.env.KINTONE_USERNAME
const _password = process.env.KINTONE_PASSWORD
const _baseUrl = process.env.GAROON_BASE_URL
const _b64Str = Buffer.from(`${_username}:${_password}`).toString('base64');
const _headers = {
	'X-Cybozu-Authorization':_b64Str,
	'Authorization':'Basic '+_b64Str,
	'Content-Type': 'application/json', 
	// 'Content-Type':'application/x-www-form-urlencoded',
}

const GET_EVENT_URI = 'schedule/events'; // get,post,patch,delete
const SEARCH_AVAILABLE_TIMES = 'schedule/searchAvailableTimes'; // post
const FACILITIES = 'schedule/facilities'; // get 
const FACILITIES_GROUP = 'schedule/facilityGroups';// get 

module.exports = class GaroonClient {
	constructor (url,headers) {
		this.url = url
		this.headers = Object.assign({},_headers,headers)
	}

	/**
	 * https://developer.cybozu.io/hc/ja/articles/360000425163#step1
	 * only request post
	 */
	async post(params) {
		let url = this.url
		let headers = this.headers
		let query = querystring.stringify(params)
		await request.post({
			headers: headers,
			url:     url,
			json: params,
		}, function(error, response, body){
			if(error && typeof callback ==='function') {
				callback(null,error)
				return
			}
			if(!!response && response.statusCode == 200) {
				let result = body
				if(typeof callback ==='function') {
					callback(result,null)
				}
				return
			} 
			if(typeof callback ==='function') {
				callback(null,body)
			}
		});
	}

	/**
	 * https://developer.cybozu.io/hc/ja/articles/360000425163#step1
	 * use request get,post,patch,delete
	 */
	// async request(method,params) {
	// 	let url = this.url
	// 	let headers = this.headers
	// 	let query = querystring.stringify(params)
	// 	method = typeof method === undefined ? 'get' : method;
	// 	await request({
	// 		method:method,
	// 		headers: headers,
	// 		url:     url,
	// 		json: params,
	// 	}, function(error, response, body){
	// 		if(error && typeof callback ==='function') {
	// 			callback(null,error)
	// 			return
	// 		}
	// 		if(!!response && response.statusCode == 200) {
	// 			let result = body
	// 			if(typeof callback ==='function') {
	// 				callback(result,null)
	// 			}
	// 			return
	// 		} 
	// 		if(typeof callback ==='function') {
	// 			callback(null,body)
	// 		}
	// 	})
	// }

	/**
	 * https://developer.cybozu.io/hc/ja/articles/360000425163#step1
	 * only get
	 */
	async get(params) {
		let url = this.url
		let headers = this.headers
		let query = querystring.stringify(params)
		url = url+"?"+query
		return new Promise((resolve, reject) => {
			request.get({
				headers: headers,
				url:     url,
			}, function(error, response, body){
				if(error) {
					reject(error)
					return
				}
				if(response.statusCode != 200) {
					reject({
						error:{
							status:response.statusCode,
							message:response.statusMessage
						}
					})
					return
				}
				let result = JSON.parse(body)
				if(result.error) {
					reject(result)
					return
				} 
				resolve(result)
			});
		})
	}

}



















