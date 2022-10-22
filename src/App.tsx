import React from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './pages/Book';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Book />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
