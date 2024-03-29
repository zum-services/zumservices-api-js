// Copyright (c) 2019 ZumCoin Development Team
//
// Please see the included LICENSE file for more information.

'use strict'

const request = require('request-promise-native')
const util = require('util')

var ZUMservices = function (opts) {
  opts = opts || {}
  if (!(this instanceof ZUMservices)) return new ZUMservices(opts)
  this.host = opts.host || 'api.zum.services/v1',
  this.token = opts.token || null
  this.timeout = opts.timeout || 2000
}


// Create Address
ZUMservices.prototype.createAddress = function (paymentId) {
  return new Promise((resolve, reject) => {
    this._post('address', {
      paymentId: paymentId || null,
    })
    .then((result) => {
      return resolve(result)
    })
    .catch((err) => {
      return reject(err)
    })
  })
}


// Get Address
ZUMservices.prototype.getAddress = function (address) {
  return new Promise((resolve, reject) => {
    if (!address) return reject(new Error('Must specify an address.'))

    this._get('address/' + address)
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


// Delete Address
ZUMservices.prototype.deleteAddress = function (address) {
  return new Promise((resolve, reject) => {
    if (!address) return reject(new Error('must specify address'))

    this._delete('address/' + address, {
      address: address
    })
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


// Get Addresses
ZUMservices.prototype.getAddresses = function () {
  return new Promise((resolve, reject) => {
    this._get('address/all')
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


//Scan Address
ZUMservices.prototype.scanAddress = function (address, blockIndex) {
  return new Promise((resolve, reject) => {
    if (!address) return reject(new Error('Must specify an address.'))
    if (!blockIndex) return reject(new Error('Must specify a blockIndex.'))

    this._get('address/scan/' + address + '/' + blockIndex)
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


//Get Address Keys
ZUMservices.prototype.getAddressKeys = function (address) {
  return new Promise((resolve, reject) => {
    if (!address) return reject(new Error('Must specify an address.'))

    this._get('address/keys/' + address)
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

// Integrate Address
ZUMservices.prototype.integrateAddress = function (address, paymentId) {
  return new Promise((resolve, reject) => {
    if (!address) return reject(new Error('Must specify an address.'))
    if (!paymentId) return reject(new Error('Must specify an address.'))

    this._post('address/integrate', {
      address: address,
      paymentId: paymentId
    })
    .then((result) => {
      return resolve(result)
    })
    .catch((err) => {
      return reject(err)
    })
  })
}

//Get Integrated Addresses
ZUMservices.prototype.getIntegratedAddresses = function (address) {
  return new Promise((resolve, reject) => {
    if (!address) return reject(new Error('Must specify an address.'))

    this._get('address/integrate/' + address)
    .then((result) => {
      return resolve(result)
    })
    .catch((err) => {
      return reject(err)
    })
  })
}

  
// Get Fee
ZUMservices.prototype.getFee = function (amount) {
  return new Promise((resolve, reject) => {
    if (!amount) return reject(new Error('Must specify amount.'))

    this._get('transfer/fee/' + amount)
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


// Create Transfer
ZUMservices.prototype.createTransfer = function (from, to, amount, fee, paymentId, extra) {
  return new Promise((resolve, reject) => {
    if (!from) return reject(new Error('Must specify a sender address.'))
    if (!to) return reject(new Error('Must specify a receive address.'))
    if (!amount) return reject(new Error('Must specify an amount.'))
    if (!fee) return reject(new Error('Must specify a fee.'))

    this._post('transfer', {
      from: from,
      to: to,
      amount: parseFloat(amount),
      fee: parseFloat(fee),
      paymentId: paymentId || null,
      extra: extra || null
    })
    .then((result) => {
      return resolve(result)
    })
    .catch((err) => {
      return reject(err)
    })
  })
}


// Get Transfer
ZUMservices.prototype.getTransfer = function (transactionHash) {
  return new Promise((resolve, reject) => {
    if (!transactionHash) return reject(new Error('Must specify a transaction hash.'))

    this._get('transfer/' + transactionHash)
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


// Get Wallet
ZUMservices.prototype.getStatus = function () {
  return new Promise((resolve, reject) => {
    this._get('wallet')
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


// Get Status
ZUMservices.prototype.getStatus = function () {
  return new Promise((resolve, reject) => {
    this._get('status')
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}


// Get Method
ZUMservices.prototype._get = function (method) {
  return new Promise((resolve, reject) => {
    if (method.length === 0) return reject(new Error('No method supplied.'))

    request({
      uri: util.format('https://%s/%s', this.host, method),
      method: 'get',
      json: true,
      auth: {
        bearer: this.token
      },
      timeout: this.timeout
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}


// Post Method
ZUMservices.prototype._post = function (method, params) {
  return new Promise((resolve, reject) => {
    if (method.length === 0) return reject(new Error('No method supplied.'))

    params = params || {}

    request({
      uri: util.format('https://%s/%s', this.host, method),
      method: 'post',
      form: params,
      json: true,
      auth: {
        bearer: this.token
      },
      timeout: this.timeout
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

// Delete Method
ZUMservices.prototype._delete = function (method) {
  return new Promise((resolve, reject) => {
    if (method.length === 0) return reject(new Error('No method supplied.'))

    request({
      uri: util.format('https://%s/%s', this.host, method),
      method: 'delete',
      json: true,
      auth: {
        bearer: this.token
      },
      timeout: this.timeout
    }).then((result) => {
      return resolve(result)
    }).catch((err) => {
      return reject(err)
    })
  })
}

module.exports = ZUMservices
