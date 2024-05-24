const axios = require('axios').default
const print = require('@medv/prettyjson')
const { normalizeUrl, printHeader } = require('./tools')

async function del(url) {
    try {
        await tryDel(url)
    } catch (error) {
        console.error(error)
    }
}

const tryDel = async (url) => {
    url = normalizeUrl(url)
    const res = await axios.delete(url)
    console.log(res.status)
    printHeader(res.headers)    
    console.log(print(res.data))
}

module.exports.del = del
