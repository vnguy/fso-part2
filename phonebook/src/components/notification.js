const Notification = ({errorMessage, message, type }) => {
    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    const error2 = {...error, color: 'green'}


    if(message === null && errorMessage === null) {
      return null
    }

    if(errorMessage !== null) {
      return (
        <div className='error' style={error}>
          {errorMessage}
        </div>
      )
    } else {
      return (
        <div className='error' style={error2}>
          {message}
        </div>
      )
    }
  }

export default Notification