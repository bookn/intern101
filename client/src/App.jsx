
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo'
import Sidebar from 'react-sidebar'

import './App.css'

import SidebarContent from './components/SidebarContent'
import ChannelsListWithData from './components/ChannelsListWithData'
import NotFound from './components/NotFound'
// import ChannelDetails from './components/ChannelDetails'

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' })
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500)
  },
}])

function dataIdFromObject(result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`
    }
  }
  return null
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      channelById: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Channel', id: args.id }))
      },
    },
  },
  dataIdFromObject: o => o.id,
})

const styles = {
  staticMenu: {
    borderRadius: '0px 10px 10px 0px',
    width: '40px',
    fontSize: '20px',
    backgroundColor: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    color: 'white',
    padding: 8,
    position: 'fixed',
    top: '120px',
    left: '0px'
  },
  content: {
    padding: '16px',
  },
}

const mediaql = window.matchMedia('(min-width: 800px)')

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstPage: true,
      notMobile: true,
      mql: mediaql,
      docked: true,
      open: false,
      nowPage: 1
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.onSetOpen = this.onSetOpen.bind(this)
    this.setPage = this.setPage.bind(this)
  }

  componentWillMount() {
    mediaql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mediaql, docked: mediaql.matches })
  }

  componentWillUnmount() {
    this.state.mediaql.removeListener(this.mediaQueryChanged)
  }

  onSetOpen(newOpen) {
    this.setState({ open: newOpen })
  }

  setPage(pageNum) {
    console.log(pageNum)
    this.setState({
      nowPage: pageNum
    })
  }

  toggleOpen(ev) {
    this.setState({ open: !this.state.open })

    if (ev) {
      ev.preventDefault()
    }
  }

  mediaQueryChanged() {
    this.setState({
      notMobile: this.state.mql.matches,
      mql: mediaql,
      docked: this.state.mql.matches,
    })
  }

  render() {
    const toggleMenu = (
      <div>
        {
          !this.state.docked &&
          <a onClick={this.toggleOpen.bind(this)} href="" style={styles.staticMenu}>
          }
          </a>
        }
      </div>)

    const sidebarProps = {
      sidebar: <SidebarContent nowPage={this.state.nowPage} />,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    }

    return (
      <Router>
        <Sidebar {...sidebarProps}>
          <ApolloProvider client={client}>
            <div className="App">
              {toggleMenu}
              <div className="navbar" >
                Tracking E-Mail<span className="sub"> { this.state.notMobile && ' : By Plearn.io' } </span>
              </div>
              <Switch>
                <Route path="/mailconfigs" component={ChannelsListWithData} />
                <Route path="/flows" component={ChannelsListWithData} />
                <Route path="/maillogs" component={ChannelsListWithData} />
                <Route path="/userlist" component={NotFound} />
                {/* <Route path="/channel/:channelId" component={ChannelDetails} /> */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </ApolloProvider>
        </Sidebar>
      </Router>
    )
  }
}

export default App
