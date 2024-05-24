const axios = require('axios').default
const print = require('@medv/prettyjson')
const { 
    normalizeUrl,
    getAuthStr,
    isEmpty,
    printHeader,
    printBody
} = require('./tools')

const get = async (url, options) => {
    url = normalizeUrl(url)    
    const res = await send(url, options)    
    if(res != null) {
        printHeader(res)
        printBody(res)
    }
}

const send = async (url, options) => {
    try {
        return await trySend(url, options)
    } catch (error) {
        console.error(print(error.response.data))
    }
}

const trySend = async (url, options) => {
    if(!isEmpty(options)) {        
        const auth = getAuthStr(options)
        const res = await axios.get(url, auth)        
        return res
    }else {
        return await axios.get(url)
    }    
}

module.exports.get = get
