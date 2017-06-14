import Mongoose from 'mongoose'
import _ from 'lodash'
import casual from 'casual'
import rp from 'request-promise'

const mongo = Mongoose.connect('mongodb://localhost:27017/views')

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
})

const View = Mongoose.model('views', ViewSchema)

export { View }
