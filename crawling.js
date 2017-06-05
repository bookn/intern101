const cron = require('cron')
const http = require('http')
const express = require('express')
const url = require('url')
const async = require('async')

const crawling = express.Router()
const INTERVAL = 3000
const RETRY = 5

scraper = () => {
  const job = new cron.CronJob({
    cronTime: '* * * * * *',
    onTick: () => {
      // do something
    },
    start: false,
    timeZone: 'Asia/Bangkok'
  })
  job.start()
}

crawling.route('/')
  .post((reqClient, resClient) => {
    urlstring = reqClient.body.url
    const parsedurl = url.parse(urlstring)
    const options = {
      host: parsedurl.hostname,
      port: (parsedurl.port || 80),
      path: parsedurl.path,
      method: 'GET',
      headers: {}
    }
    const cookies = ['']
    options.headers.Cookies = cookies.join('; ')
    async.retry({ times: RETRY, interval: INTERVAL }, (callback) => {
      const reqDestination = http.request(options, (resDestination) => {
        if (resDestination.statusCode === 200) {
          console.log(resDestination.statusCode)
          callback(null, { messege: 'Success - status code : 200' })
        } else {
          console.log(resDestination.statusCode)
          console.log('retry')
          callback({ messege: `Unsuccess - status code : ${resDestination.statusCode}` }, null)
        }
      })
      reqDestination.on('error', () => {
        // console.log('Error, retry')
        callback({ messege: 'Error' }, null)
      })
      reqDestination.end()
    }, (err, result) => {
      if (err) {
        console.log(err)
        resClient.end('Unsuccess !')
      } else {
        console.log(result)
        resClient.end('Success !')
      }
    })
  })

module.exports = crawling
