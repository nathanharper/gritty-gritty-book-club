import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import './App.css';
import {Context, defaultContext} from './Context';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultContext,
      ...props,
      setContext: (newState, callback) => {
        this.setState(newState, callback);
      },
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Context.Provider>
    );
  }
}

export default App;
