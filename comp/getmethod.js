const axios = require('axios').default
const print = require('@medv/prettyjson')
const { normalizeUrl, printHeader } = require('./tools')

const get = async (url) => {
    try {
        await tryGet(url)
    } catch (error) {
        console.error(error)
    }
}

const tryGet = async (url) => {
    url = normalizeUrl(url)
    const res = await axios.get(url)
    console.log(res.status)
    printHeader(res.headers)    
    console.log(print(res.data))
}

module.exports.get = get
