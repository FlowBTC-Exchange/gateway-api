const axios = require('axios')

/**
 * Rest API
 * @constructor
 * @param {boolean} testnet false as default
 */
function Rest(testnet) {
	this.endpoint = testnet ? 'https://flowgateway-testnet.herokuapp.com/api/v1' : 'https://flowgateway-livenet.herokuapp.com/api/v1'
	this.headers = {
		'x-access-token': null
	}
}

/**
 * Register
 * @param {string} email
 * @param {string} password
 * @param {string} confirmPassword
 */
Rest.prototype.register = async function(email, password, confirmPassword) {
	try {
		const data = { 
			email: email, 
			password: password,
			confirmPassword: confirmPassword 
		}
		const res = await axios.post(this.endpoint + '/register', data)
		return res.data
	} catch (e) {
		return e.response.data
	}
}

/**
 * Login for set token
 * @param {string} email
 * @param {string} password
 */
Rest.prototype.login = async function(email, password) {
	try {
		const data = { 
			email: email, 
			password: password
		}
		const res = await axios.post(this.endpoint + '/login', data)
		this.headers['x-access-token'] = res.data.token
		return res.data
	} catch (e) {
		return e.response.data
	}
}

/**
 * Get new address with price and expiration
 * @param {string} currency symbol 'btc' or 'eth'
 * @param {number} baseValue as currency number
 */
Rest.prototype.newAddress = async function(currency, baseValue) {
	try {
		const data = {
			currency: currency,
			baseValue: baseValue
		}
		const res = await axios({ method: 'POST', url: this.endpoint + '/newAddress', data: data, headers: this.headers })
		return res.data
	} catch (e) {
		return e.response.data
	}
}

/**
 * Get new address
 * @param {string} currency symbol 'btc' or 'eth'
 */
Rest.prototype.newSimpleAddress = async function(currency) {
	try {
		const data = {
			currency: currency
		}
		const res = await axios({ method: 'POST', url: this.endpoint + '/newSimpleAddress', data: data, headers: this.headers })
		return res.data
	} catch (e) {
		return e.response.data
	}
}

/**
 * Explore address for changes
 * @param {string} currency symbol 'btc' or 'eth'
 * @param {string} address
 */
Rest.prototype.explore = async function(currency, address) {
	try {
		const res = await axios({ method: 'GET', url: `${this.endpoint}/explore/${currency}/${address}` })
		return res.data
	} catch (e) {
		return e.response.data
	}
}

/**
 * Set percentage to receive in Bitcoin
 * @param {number} newPercentage value from 0 to 100
 */
Rest.prototype.setPercentage = async function(newPercentage) {
	try {
		const data = {
			newPercentage: newPercentage
		}
		const res = await axios({ method: 'POST', url: this.endpoint + '/setPercentage', data: data, headers: this.headers })
		return res.data
	} catch (e) {
		return e.response.data
	}
}

/**
 * Change user password
 * @param {string} currentPassword
 * @param {string} newPassword
 * @param {string} confirmNewPassword
 */
Rest.prototype.changePassword = async function(currentPassword, newPassword, confirmNewPassword) {
	try {
		const data = {
			currentPassword: currentPassword,
			password: newPassword,
			confirmPassword: confirmNewPassword
		}
		const res = await axios({ method: 'POST', url: this.endpoint + '/changePassword', data: data, headers: this.headers })
		return res.data
	} catch (e) {
		return e.response.data
	}
}

module.exports = Rest
