import React from 'react'
import PropTypes from 'prop-types'
import {
  Link,
} from 'react-router-dom'

import MaterialTitlePanel from './MaterialTitlePanel'
// import ChannelDetails from './ChannelDetails'

const styles = {
  sidebar: {
    overflow: 'hidden',
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: '#252526',
  },
}

const SidebarContent = (props) => {
  const style = props.style ? { ...styles.sidebar, ...props.style } : styles.sidebar

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <Link key="1" to="/mailconfigs" style={styles.sidebarLink}>Mail Configuration</Link>
        <Link key="2" to="/flows" style={styles.sidebarLink}>Flows Configuration</Link>
        <Link key="3" to="/maillogs" style={styles.sidebarLink}>Mail Logs</Link>
        <Link key="4" to="/userlist" style={styles.sidebarLink}>User Infomation</Link>
      </div>
    </MaterialTitlePanel>
  )
}

SidebarContent.propTypes = {
  style: PropTypes.object,
}

export default SidebarContent
