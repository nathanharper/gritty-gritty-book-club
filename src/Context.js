import React from 'react';
import Cookie from 'js-cookie';

const defaultContext = {
  username: Cookie.get('username'),
  books: [],
  games: [],
};

const Context = React.createContext(defaultContext);

export default Context;

export {Context, defaultContext};
