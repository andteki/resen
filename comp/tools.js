const print = require('@medv/prettyjson')

const normalizeUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url
    }
    return url    
}

const printHeader = (res) => {
    console.log(res.status, res.statusText)
    console.log('Content-Type:', res.headers['content-type'])
    console.log('Date:', res.headers.date)
    console.log('X-Powered-By:', res.headers['x-powered-by'])
}

const printBody = (res) => {
    console.log(print(res.data))
}

const printErrorHeader = (err) => {
    const green = '\x1b[34m';
    const reset = '\x1b[0m';
    const firstLine = err.response.request._header.split('\r\n')[0];
    const httpVersion = firstLine.split(' ')[2];
    console.log(        
        green + httpVersion,
        err.response.status, 
        green + err.response.statusText,
        reset
    )
    console.log(`${green}Access-Control-Allow-Origin:${reset}`, err.response.headers['access-control-allow-origin'])
    console.log(`${green}Connection:${reset}`, err.response.headers['connection'])
    console.log(`${green}Content-Length:${reset}`, err.response.headers['content-length'])
    console.log(`${green}Content-Type:${reset}`, err.response.headers['content-type'])
    console.log(`${green}Date:${reset}`, err.response.headers['date'])
    console.log(`${green}ETag:${reset}`, err.response.headers['etag'])
    console.log(`${green}Keep-Alive:${reset}`, err.response.headers['keep-alive'])
    console.log(`${green}X-Powered-By:${reset}`, err.response.headers['x-powered-by'])
    console.log()
    console.log(print(err.response.data))
}

const convertToObject = (params) => {
    return params.reduce((acc, param) => {
        const [key, value] = param.split('=')
        acc[key] = value
        return acc
    }, {})
}

const getAuthStr = (options) => {    
    if(!options.hasOwnProperty('auth')) {
        console.log('No token specified')
        return
    }
    if(!options.hasOwnProperty('authType')) {
        console.log('No type specified')
        return
    }
    if(options.authType != 'bearer') {
        console.log('Only bearer')
        return
    }
    return { headers: {
        'Authorization': `Bearer ${options.auth}`
        }}
}

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

module.exports = { 
    normalizeUrl, 
    printHeader,
    printBody,
    printErrorHeader,
    convertToObject,
    getAuthStr,
    isEmpty
}
