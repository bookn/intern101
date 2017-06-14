import React from 'react';
import {
  Link
} from 'react-router-dom'

import {
    gql,
    graphql,
} from 'react-apollo';

import AddChannel from './AddChannel';
import SearchChannel from './SearchChannel';


const ChannelsList = ({ data: {loading, error, channels, views }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      <AddChannel />
      <SearchChannel />
      { channels.map( ch =>
        (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
          <Link to={ch.id < 0 ? `/` : `channel/${ch.id}`}>
            {ch.name}
          </Link>
        </div>)
      )}
      { views.map( (view) =>
        (<div key={view._id} className="channel">
          <Link to="/">
            {view.views}
          </Link>
        </div>)
      )}
    </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
    views {
      _id
      postId
      views
    }
  }
`;

export default graphql(channelsListQuery)(ChannelsList);
