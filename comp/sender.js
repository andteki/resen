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
    getBasicHeader,
    getSimpleHeader
} = require('./tools')

const startSend = async (url, method, params, options, version) => {
    let inputData = {}

    if(Object.keys(params).length) {
        inputData = await convertToObject(params)
    }

    if(options.ignoreStdin != true && Object.keys(inputData).length == 0) {
        inputData = await getStdinData()        
    }

    url = normalizeUrl(url)
    const res = await send(url, method, inputData, options, version);
    if(res != null) {        
        printHeader(res)
        printBody(res)
    }
}

const send = async (url, method, data, options, version) => {
    try {
        return await trySend(url, method, data, options, version)
    } catch (error) {
        if(error.response != undefined) {
            printErrorHeader(error)
        }else {
            console.error(error.errors)
        }
    }
}

const trySend = async (url, method, data, options, version) => {
    try {

        if(options.hasOwnProperty('authType')) {
            if(options.authType == 'digest') {
                const senderData = getDigestData(url, method, data, options)
                const auth = new AxiosDigestAuth(senderData.authData)
                senderData.requestData.headers['User-Agent'] = `Resen/${version}`
                return await auth.request(senderData.requestData)
            } else if(options.authType == 'basic') {
                const header = getBasicHeader(url, method, data, options)
                header.headers['User-Agent'] = `Resen/${version}`
                return await methodSender(url, method, data, header, version)
            } else {
                const header = getBearerHeader(options)
                return await methodSender(url, method, data, header, version)
            }
        } else {
            const header = getSimpleHeader(url, method, data, options)
            return await methodSender(url, method, data, header, version)
        }

    }catch (error) {
        console.error(error)
    }


}

const methodSender = async (url, method, data, header, version) => {

    header.headers['User-Agent'] = `Resen/${version}`

    console.log(header)

    try {
        if(method.toLowerCase() == 'get') {            
            return axios.get(url, header)
        }

        if(method.toLowerCase() == 'post') {
            return axios.post(url, data, header)
        }

        if(method.toLowerCase() == 'put') {
            return axios.put(url, data, header)
        }

        if(method.toLowerCase() == 'patch') {
            return axios.patch(url, data, header)
        }

        if(method.toLowerCase() == 'delete') {
            return axios.delete(url, header)
        }
    }catch(err){
        console.error(err)
    }
}

module.exports.startSend = startSend
