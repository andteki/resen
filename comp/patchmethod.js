const axios = require('axios').default
const print = require('@medv/prettyjson')
const { normalizeUrl, printHeader } = require('./tools')



const patch = async (url, data) => {
    try {
        await tryPatch(url, data)
    } catch (error) {
        console.error(error)
    }
}

const tryPatch = async (url, data) => {    
    url = normalizeUrl(url)
    const res = await axios.patch(url, data)
    console.log(res.status)
    printHeader(res.headers)    
    console.log(print(res.data))
}

module.exports.patch = patch
