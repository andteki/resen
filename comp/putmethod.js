const axios = require('axios').default
const print = require('@medv/prettyjson')
const { 
    normalizeUrl,
    getAuthStr,
    isEmpty,
    printHeader,
    printBody
} = require('./tools')

const put = async (url, data, options) => {    
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
        console.error(print(error.response.data))
    }
}

const trySend = async (url, data, options) => {
    if(!isEmpty(options)) {
        const auth = getAuthStr(options)
        return await axios.put(url, data, auth)
    }else {
        return await axios.put(url, data)
    }
}


module.exports.put = put
