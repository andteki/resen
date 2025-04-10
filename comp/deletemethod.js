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

const del = async (url, options) => {
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
        if(error.response != undefined) {
            printErrorHeader(error)
        }else {
            console.error(error.errors)
        }
    }
}

const trySend = async (url, options) => {
    console.log('--------------------------------------------', options)
    if(!isEmpty(options)) {
        const auth = getAuthStr(options)

        console.log('::::::::::::::::::::::::::::::', url, auth)
        return await axios.delete(url, auth)
    }else {
        // console.log('===================================', url)
        return await axios.delete(url)
    }    
}

module.exports.del = del
