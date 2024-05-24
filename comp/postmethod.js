const axios = require('axios').default
const print = require('@medv/prettyjson')
const { normalizeUrl, printHeader } = require('./tools')



const post = async (url, data) => {
    try {
        await tryPost(url, data)
    } catch (error) {
        console.error(error)
    }
}

const tryPost = async (url, data) => {    
    url = normalizeUrl(url)
    const res = await axios.post(url, data)
    console.log(res.status)
    printHeader(res.headers)    
    console.log(print(res.data))
}



module.exports.post = post
