import React from 'react';
import Context from './Context';
import Cookie from 'js-cookie';

class UserEntry extends React.PureComponent {
  ref = React.createRef();

  render() {
    return (
      <Context.Consumer>
        {({setContext}) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              const username = this.ref.current.value;
              Cookie.set('username', username, {path: ''});
              setContext({
                username,
              });
            }}>
            <h2>What's your name?</h2>
            <input
              type="text"
              name="username"
              ref={this.ref}
              placeholder="Name"
            />
            <input type="submit" value="Submit" />
          </form>
        )}
      </Context.Consumer>
    );
  }
}

export default UserEntry;
