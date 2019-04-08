import React from 'react';
import Bracket from './Bracket';
import Context from './Context';
import UserEntry from './UserEntry';
// import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({username}) =>
          username == null ? (
            <UserEntry />
          ) : (
            <div>
              <h2>Welcome {username}!</h2>
              <Bracket
                init={{
                  teams: [['Team 1', 'Team 2'], ['Team 3', 'Team 4']],
                  results: [[[1, 2], [3, 4]], [[4, 6], [2, 1]]],
                }}
              />
            </div>
          )
        }
      </Context.Consumer>
    );
  }
}

export default Home;
