const axios = require('axios').default
const AxiosDigestAuth = require('@acidemic/axios-digest-auth').default

const { 
    normalizeUrl,
    getBearerHeader,
    printHeader,
    printBody,
    printErrorHeader,
    getDigestData,
    convertToObject,
    getStdinData,
    getBasicHeader
} = require('./tools')

const startSend = async (url, method, params, options) => {
    let inputData = {}

    if(Object.keys(params).length) {
        inputData = await convertToObject(params)
    }

    if(options.ignoreStdin != true && Object.keys(inputData).length == 0) {
        inputData = await getStdinData()        
    }

    url = normalizeUrl(url)
    const res = await send(url, method, inputData, options);
    if(res != null) {        
        printHeader(res)
        printBody(res)
    }
}

const send = async (url, method, data, options) => {
    try {
        return await trySend(url, method, data, options)
    } catch (error) {
        if(error.response != undefined) {
            printErrorHeader(error)
        }else {
            console.error(error.errors)
        }
    }
}

const trySend = async (url, method, data, options) => {

    if(options.hasOwnProperty('authType')) {
        if(options.authType == 'digest') {
            const senderData = getDigestData(url, method, data, options)
            const auth = new AxiosDigestAuth(senderData.authData)
            return await auth.request(senderData.requestData)
        } else if(options.authType == 'basic') {
            const header = getBasicHeader(url, method, data, options)
            return await methodSender(url, method, data, header)
        } else {
            const auth = getBearerHeader(options)
            return await methodSender(url, method, data, auth)
        }
    } else {
        return await methodSender(url, method, data)
    }
}

const methodSender = async (url, method, data, auth) => {
    if(method.toLowerCase() == 'get') {
        return axios.get(url, auth)
    }

    if(method.toLowerCase() == 'post') {
        return axios.post(url, data, auth)
    }

    if(method.toLowerCase() == 'put') {
        return axios.put(url, data, auth)
    }

    if(method.toLowerCase() == 'patch') {
        return axios.patch(url, data, auth)
    }

    if(method.toLowerCase() == 'delete') {
        return axios.delete(url, auth)
    }
}

module.exports.startSend = startSend
