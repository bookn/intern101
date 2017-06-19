import Mongoose from 'mongoose'

Mongoose.connect('mongodb://localhost:27017/internjitta')

const EmailConfigSchema = Mongoose.Schema({
  name: String,
  description: String,
})

const EmailConfigs = Mongoose.model('emailconfigs', EmailConfigSchema)

module.exports = { EmailConfigs }
