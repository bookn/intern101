const cron = require('cron')
const http = require('http')
const url = require('url')
const async = require('async')

const INTERVAL = 3000
const RETRY = 5

const crawling = {
  a: 0,
  getOpts(urlString) {
    const parsedurl = url.parse(urlString)
    const options = {
      host: parsedurl.hostname,
      port: (parsedurl.port || 80),
      path: parsedurl.path,
      method: 'GET',
      headers: {}
    }
    return options
  },
  scrape(urlString, urlDestString) {
    options = this.getOpts(urlString)
    async.retry({ times: RETRY, interval: INTERVAL }, (callback) => {
      const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
          callback(null, { messege: 'Success - status code : 200' })
        } else {
          console.log(`Get status code ${res.statusCode}, retry`)
          callback({ messege: `Unsuccess - status code : ${res.statusCode}` }, null)
        }
      })
      req.on('error', () => {
        console.log('Get error, retry')
        callback({ messege: 'Get error' }, null)
      })
      req.end()
    }, (err, result) => {
      if (err) {
        options = this.getOpts(urlDestString)
        const reqDest = http.request(options, (resDest) => {
          if (resDest.statusCode === 200) console.log(`Change destination to ${urlDestString} success !`)
          else console.log(`Cannot change destination to ${urlDestString} !`)
        })
        reqDest.on('error', () => {
          console.log('Cannot connect to destination')
        })
        reqDest.end()
        console.log(err.messege)
      } else {
        console.log(result)
      }
    })
  },
  jobStart() {
    job = new cron.CronJob({
      cronTime: '0 * * * * *',
      onTick: () => {
        this.scrape(process.env.URL, process.env.DESTINATION_URL)
      },
      start: false,
      timeZone: 'Asia/Bangkok'
    })
    job.start()
  }
}
module.exports = crawling
