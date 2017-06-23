import Mongoose from 'mongoose'
import bluebird from 'bluebird'

Mongoose.Promise = bluebird

Mongoose.connect('mongodb://localhost:27017/internjitta')

const EmailConfigSchema = Mongoose.Schema({
  name: String,
  description: String,
})

const EmailConfigs = Mongoose.model('emailconfigs', EmailConfigSchema)

const FlowConfigSchema = Mongoose.Schema({
  name: String,
  description: String,
  actions: Array,
  url: String,
  actionsLen: Number,
  successAction: Object,
})

const FlowConfigs = Mongoose.model('flows', FlowConfigSchema)


module.exports = { EmailConfigs, FlowConfigs }
