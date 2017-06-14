
import { View } from './connectors'

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
}];

let nextId = 3;
let nextMessageId = 5;

const filterItems = (arr, query) => {
  console.log(arr)
  return arr.filter( (el) => {
    console.log(el)
    return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
}

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channelById: (root, { id }) => {
      return channels.find(channel => channel.id === id);
    },
    channelname: (root, { name }) => {
      return filterItems(channels, name);
    },
    views: () => {
      return View.find({}).lean().exec()
             .then((view) => {
               return view
              })
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), messages: [], name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(channel => channel.id === message.channelId);
      if(!channel)
        throw new Error("Channel does not exist");
      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);
      return newMessage;
    },
    searchChannel: (root, args) => {
      return filterItems(channels, args.name);
    }
  },
};
