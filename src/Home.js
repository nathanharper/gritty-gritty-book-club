import React from 'react';
import Bracket from './Bracket';
import Context from './Context';
import UserEntry from './UserEntry';
import AddBook from './AddBook';
import {map, slice, zip, ceil} from 'lodash';
// import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({username, books}) =>
          username == null ? (
            <UserEntry />
          ) : (
            <div>
              <h2>Welcome {username}!</h2>
              <Bracket
                init={{
                  teams: groupBooks(books),
                  results: [],
                }}
              />
              <AddBook />
            </div>
          )
        }
      </Context.Consumer>
    );
  }
}

function groupBooks(books) {
  const bookNames = map(books, 'name');
  const gameCount = ceil(books.length / 2);
  return zip(slice(bookNames, 0, gameCount), slice(bookNames, gameCount));
}

export default Home;
