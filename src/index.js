import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MovieList from './MovieList';


const showHome = () => {
  if (window.location.pathname === "/") {
    return <App />
  }
}

const showLikedMovie = () => {
  if (window.location.pathname === "/movie-list") {
    return <MovieList />
  }
}



ReactDOM.render(
  <React.StrictMode>
    {showHome()}
    {showLikedMovie()}
  </React.StrictMode>,
  document.getElementById('root')
);
