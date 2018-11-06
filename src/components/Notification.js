import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 50,
      borderWidth: 5,
      borderRadius: 50,
      margin: 50,
      background: 'linear-gradient(red, yellow)',
      textAlign: 'center',
      color: 'purple',
      wordSpacing: 5
    }
    return (
      this.props.notification ?
        <div style={style}>
          {this.props.notification}
        </div>
        : ''
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
