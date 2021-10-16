import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import MovieDetail from './components/MovieDetail/MovieDetail';
import './App.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <Header></Header>
          <div className="container">
            <Switch>
              <Route exact path="/" exact component={Home} />
              <Route path="/movie/:imdbID" component={MovieDetail} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
