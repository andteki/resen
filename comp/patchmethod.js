const axios = require('axios').default
const print = require('@medv/prettyjson')

const { 
    normalizeUrl,
    getAuthStr,
    isEmpty,
    printHeader,
    printBody,
    printErrorHeader
} = require('./tools')

const patch = async (url, data, options) => {    
    url = normalizeUrl(url)
    const res = await send(url, data, options)
    if(res != null) {        
        printHeader(res)
        printBody(res)
    }
}

const send = async (url, data, options) => {
    try {
        return await trySend(url, data, options)
    } catch (error) {
        if(err.response != undefined) {
            printErrorHeader(err)
        }else {
            console.error(err.errors)
        }
    }
}

const trySend = async (url, data, options) => {
    if(!isEmpty(options)) {
        const auth = getAuthStr(options)
        return await axios.patch(url, data, auth)
    }else {
        return await axios.patch(url, data)
    }
}

module.exports.patch = patch
