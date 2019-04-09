import App from './App';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
import {renderToString} from 'react-dom/server';
import path from 'path';
import * as sqlite3 from 'sqlite3/lib/sqlite3';
import bodyParser from 'body-parser';

sqlite3.verbose();
const dbName = 'grittybase.db';
const db = new sqlite3.Database(path.resolve(__dirname, '..', dbName));

db.run(
  'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, blurb TEXT)',
);
db.run(
  'CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, book1_id INTEGER, book2_id INTEGER)',
);

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    db.all('SELECT * FROM books', [], function(err, books) {
      db.all('SELECT * FROM games', [], function(err, games) {
        const context = {};
        const markup = renderToString(
          <StaticRouter context={context} location={req.url}>
            <App books={books} games={games} />
          </StaticRouter>,
        );

        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(200).send(
            `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`,
          );
        }
      });
    });
  });

server.use(bodyParser.json()).post('/add-book', (req, res) => {
  const {name, blurb} = req.body;
  db.run(
    'INSERT INTO books (name, blurb) VALUES (?, ?)',
    [name, blurb],
    function() {
      db.all('SELECT * FROM books', [], function(err, books) {
        res.json(books);
      });
    },
  );
});

export default server;
