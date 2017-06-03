const cron = require('cron')
const http = require('http')
const express = require('express')
const url = require('url')

const crawling = express.Router()

scraper = (urlstring, resCli) => {
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
  let count = 0
  const job = new cron.CronJob({
    cronTime: '* * * * * *',
    onTick: () => {
      const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
          resCli.end('Success status code : 200')
          job.stop()
        } else if (count >= 5) {
          resCli.end(`Unsuccess status code : ${res.statusCode}`)
          job.stop()
        } else count += 1
      })
      req.on('error', (err) => {
        resCli.end(err)
      })
      req.end()
    },
    start: false,
    timeZone: 'Asia/Bangkok'
  })
  job.start()
}

crawling.route('/')
  .post((req, resCli) => {
    urlstring = req.body.url
    scraper(urlstring, resCli)
  })

module.exports = crawling
