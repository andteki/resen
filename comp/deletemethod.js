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
    if(!isEmpty(options)) {
        if(options.hasOwnProperty('authType')) {
            if(options.authType == 'digest') {
                const data = getDigestData(options, 'DELETE', url)
                const auth = new AxiosDigestAuth(data.authData)
                return await auth.request(data.requestData)
            }else {
                const auth = getAuthStr(options)
                return await axios.delete(url, auth)
            }
        }
    }else {
        return await axios.delete(url)
    }
}

module.exports.del = del
