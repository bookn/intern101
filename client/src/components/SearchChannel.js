import React from 'react';
import { gql, graphql } from 'react-apollo';

import { channelsListQuery } from './ChannelsListWithData';

const SearchChannel = ({ mutate }) => {
  
  const filterItems = (arr, query) => {
    console.log(arr)
    return arr.filter( (el) => {
      console.log(el)
      return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      })
  }

  const searchKeyUp = (evt) => {
      mutate({ 
        variables: { name: evt.target.value },
        optimisticResponse: {
          searchChannel: {
            name: evt.target.value,
            __typename: 'Channel',
          },
        },
        update: (store, { data: { searchChannel } }) => {
            // Read the data from the cache for this query.
            const data = store.readQuery({ query: channelsListQuery });
            // Add our channel from the mutation to the end.
            data.channels = searchChannel
            // Write the data back to the cache.
            store.writeQuery({ query: channelsListQuery, data });
          },
      }).catch((err) => {
        console.log(err)
      });
  };

  return (
    <input
      type="text"
      placeholder="Search channel"
      onKeyUp={searchKeyUp}
    />
  );
};

const searchChannelMutation = gql`
  mutation searchChannel($name: String!) {
    searchChannel(name: $name) {
      id
      name
    }
  }
`;


const SearchChannelWithMutation = graphql(
  searchChannelMutation,
)(SearchChannel);

export default SearchChannelWithMutation;