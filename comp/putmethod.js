const axios = require('axios').default
const print = require('@medv/prettyjson')
const { normalizeUrl, printHeader } = require('./tools')



const put = async (url, data) => {
    try {
        await tryPut(url, data)
    } catch (error) {
        console.error(error)
    }
}

const tryPut = async (url, data) => {    
    url = normalizeUrl(url)
    const res = await axios.put(url, data)
    console.log(res.status)
    printHeader(res.headers)    
    console.log(print(res.data))
}

module.exports.put = put
