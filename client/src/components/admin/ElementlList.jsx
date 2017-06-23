import React from 'react'
import {
    gql,
    graphql,
} from 'react-apollo'

import SearchChannel from './SearchChannel'

const MenuList = ({ data: { loading, error, emailConfigs }, match }) => {
  if (loading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!emailConfigs) {
    return <p>Loading ...</p>
  }

  console.log(match.params.menu)

  return (
    <div className="channelsList">
      <Grid style={styles.row}>
        <Router>
          <Row style={styles.row} >
            <Col sm={6} md={4}>
              <SearchChannel />
              { emailConfigs.map(emailconfig => (
                <Link key={emailconfig._id} to={`/${match.params.menu}/${emailconfig._id}`}>
                  <div className="channel" >
                    {emailconfig.name}
                  </div>
                </Link>
                )
              )}
            </Col>
            <Col sm={6} md={8}>
              <div className="App">
                <Switch>
                  <Route path="/emailConfigs/:emailConfigId" component={EmailConfigs} />
                  <Route path="/flowConfigs/:emailConfigId" component={FlowConfigs} />
                  {/* <Route component={NotFound} /> */}
                </Switch>
              </div>
            </Col>
          </Row>
        </Router>
      </Grid>
    </div>
  )
}

MenuList.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    dataOjb: React.PropTypes.array,
  }).isRequired,
}

export const dataObjListQuery = gql`
  query dataObjListQuery($menu: String!) {
    ${test} {
      _id
      name
      description
    }
  }
`

export default graphql(dataObjListQuery, {
  options: props => ({
    variables: { menu: props.match.params.menu },
    pollInterval: 5000
  }),
})(DataObjList)