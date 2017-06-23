import React from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';

import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';
import NotFound from './components/NotFound';
import ChannelDetails from './components/ChannelDetails';


const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

function dataIdFromObject(result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      channelById: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Channel', id: args['id'] }))
      },
    },
  },
  dataIdFromObject: o => o.id,
});


const App = () =>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="App">
        <Link to="/" className="navbar">
          Tracking E-Mail<span className="sub">&nbsp;: By Plearn.io</span>
        </Link>
        <Switch>
          <Route exact path="/" component={ChannelsListWithData} />
          <Route path="/channel/:channelId" component={ChannelDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </ApolloProvider>

export default App;