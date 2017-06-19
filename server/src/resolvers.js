
import { EmailConfigs } from './connectors'

const channels = [{
  id: '1',
  name: 'soccer',
  messages: [{
    id: '1',
    text: 'soccer is football',
  }, {
    id: '2',
    text: 'hello soccer world cup',
  }]
}, {
  id: '2',
  name: 'baseball',
  messages: [{
    id: '3',
    text: 'baseball is life',
  }, {
    id: '4',
    text: 'hello baseball world series',
  }]
}]

// let nextId = 3
// let nextMessageId = 5

const filterItems = (arr, query) => {
  const result = arr.filter((el) => {
    if (el.name.toLowerCase().indexOf(query.toLowerCase()) > -1) return el
    return false
  })
  return result
}

export const resolvers = {
  Query: {
    channels: () => {
      return channels
    },
    channelById: (root, { id }) => {
      return channels.find(channel => channel.id === id)
    },
    channelname: (root, { name }) => {
      return filterItems(channels, name)
    },
    emailconfigs: () => {
      const result = EmailConfigs.find({}).lean().exec()
        .then(mailconfig => mailconfig)
      return result
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId += 1), messages: [], name: args.name }
      channels.push(newChannel)
      return newChannel
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(el => el.id === message.el)
      if (!channel) throw new Error('Channel does not exist')
      const newMessage = { id: String(nextMessageId += 1), text: message.text }
      channel.messages.push(newMessage)
      return newMessage
    },
    searchChannel: (root, args) => {
      const newChannels = filterItems(channels, args.name)
      if (!newChannels) throw new Error('Channels does not exist')
      return newChannels
    }
  },
}
