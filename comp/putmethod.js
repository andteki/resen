const axios = require('axios').default
const AxiosDigestAuth = require('@acidemic/axios-digest-auth').default
const print = require('@medv/prettyjson')

const { 
    normalizeUrl,
    getAuthStr,
    isEmpty,
    printHeader,
    printBody,
    printErrorHeader,
    getDigestData
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
        if(error.response != undefined) {
            printErrorHeader(error)
        }else {
            console.error(error.errors)
        }
    }
}

const trySend = async (url, data, options) => {
    if(!isEmpty(options)) {
        if(options.hasOwnProperty('authType')) {
            if(options.authType == 'digest') {
                const data = getDigestData(options, 'PUT', url)
                const auth = new AxiosDigestAuth(data.authData)
                return await auth.request(data.requestData)
            }else {
                const auth = getAuthStr(options)
                return await axios.put(url, data, auth)
            }
        }
    }else {
        return await axios.put(url, data)
    }
}

module.exports.put = put
