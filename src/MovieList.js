import React, { useState, useEffect } from "react";
import MovieBox from "./MovieBox";
import "./MovieList.css"
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=bcc4ff10c2939665232d75d8bf0ec093";
function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [likedMovieList, setLikedMovieList] = useState([])
  const [blockedMovieList, setBlockedMovieList] = useState([])

  const [query, setQuery] = useState("");

  const useQueryParams = () => {
    const params = new URLSearchParams(
      window ? window.location.search : {}
    );

    return new Proxy(params, {
      get(target, prop) {
        return target.get(prop)
      },
    });
  }

  const { pageName } = useQueryParams();




  useEffect(() => {
    refreshMovieList()
  }, []);
  
  const refreshMovieList = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPage(data.page)
        setMovies(data.results);
      });
    const temnpLikedMovie = localStorage.getItem("likedMovies") ? JSON.parse(localStorage.getItem("likedMovies")) : []
    setLikedMovieList(temnpLikedMovie)

    const temnpBlockedMovie = localStorage.getItem("blockedMovie") ? JSON.parse(localStorage.getItem("blockedMovie")) : []
    setBlockedMovieList(temnpBlockedMovie)

  }


  const likeMovie = (movieObj) => {
    const tempLikeArr = localStorage.getItem("likedMovies") ? JSON.parse(localStorage.getItem("likedMovies")) : []
    const find = tempLikeArr.find((ele) => ele.id == movieObj.id)
    if (find) {
      const newFilteredData = tempLikeArr.filter((item) => item.id != movieObj.id)
      localStorage.setItem("likedMovies", JSON.stringify(newFilteredData))
    } else {
      tempLikeArr.push(movieObj)
      localStorage.setItem("likedMovies", JSON.stringify(tempLikeArr))
    }
    refreshMovieList()
  }

  const nextPage = (isNext) => {
    let nextPage = page
    if (isNext) {
      nextPage = page + 1
    } else {
      nextPage = page - 1
    }
    if (nextPage > 0) {
      fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=bcc4ff10c2939665232d75d8bf0ec093&page=${nextPage}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          setPage(data.page)
        });
    }
  }


  const handelBlockMovie = (movie) => {
    const blockedIdArr = localStorage.getItem("blockedMovie") ? JSON.parse(localStorage.getItem("blockedMovie")) : []
    const find = blockedIdArr.find((ele) => ele.id == movie.id)
    if (find) {
      const newFilteredData = blockedIdArr.filter((item) => item.id != movie.id)
      localStorage.setItem("blockedMovie", JSON.stringify(newFilteredData))
    } else {
      blockedIdArr.push(movie)
      localStorage.setItem("blockedMovie", JSON.stringify(blockedIdArr))
    }
    refreshMovieList()
  }
  return (
    <>
      <NavBar setMovies={setMovies} />
      {pageName == 'likedMovie' ?
        <div className="container">
          <div className="popular-img-section-wrapper">
            <h2>Liked Movie List</h2>
            <div className="popular-img-section">
              <ul className="MovieListUl" id="MovieListUl">
                { likedMovieList.length}
                {likedMovieList.length > 0 ? (
                  likedMovieList.map((movieItem) => (
                    !blockedMovieList.find((item)=> item.id == movieItem.id) &&
                    <li>
                      <a>
                        <div className="img">
                          <img src={"https://image.tmdb.org/t/p/original/" + movieItem.poster_path} />
                        </div>
                        <div className="hover-data">Like It</div>
                        <h2>{movieItem.original_title}</h2>
                        <p>{movieItem.release_date}</p>
                        <div className="text-center">
                          <button className="like-btn" onClick={() => likeMovie(movieItem)}>Unlike</button> <button className="block-btn" onClick={()=> handelBlockMovie(movieItem)}>block</button>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <h2>Sorry !! No Movies Found</h2>
                )}
              </ul>
            </div>
          </div>
        </div> : <>{
          pageName == 'blockedMovie' ?
            <div className="container">
              <div className="popular-img-section-wrapper">
                <h2>Blocked Movie List</h2>
                <div className="popular-img-section">
                  <ul className="MovieListUl" id="MovieListUl">
                    {blockedMovieList.length > 0 ? (
                      blockedMovieList.map((movie) => (
                         <li>
                          <a>
                            <div className="img">
                              <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} />
                            </div>
                            <div className="hover-data">Like It</div>
                            <h2>{movie.original_title}</h2>
                            <p>{movie.release_date}</p>
                            <div className="text-center">
                              <button className="like-btn" onClick={() => likeMovie(movie)}>{likedMovieList.find((item) => item.id == movie.id) ? 'Unlike' : 'like'}</button> <button className="block-btn" onClick={()=> handelBlockMovie(movie)}>Unblock</button>
                            </div>
                          </a>
                        </li>
                      ))

                    ) : (
                      <h2>Sorry !! No Movies Found</h2>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            : <div className="container">
              <div className="popular-img-section-wrapper">
                <h2>The Most Popular Movies</h2>
                <div className="toolbar">
                  <div className="full">
                    <div className="left">
                      <div className="btn" onClick={() => nextPage(false)} disabled={page == 1}>Previous</div>
                    </div>
                    <div className="middle" id="page-number-tag">Page {page}/Total 500 of 10000 results</div>
                    <div className="right"> <div
                      className="btn" onClick={() => nextPage(true)}>Next</div>
                    </div>
                  </div>
                </div>
                <div className="popular-img-section">
                  <ul className="MovieListUl" id="MovieListUl">
                    {movies.length > 0 ? (
                      movies.map((movieReq) => (
                        !blockedMovieList.find((item)=> item.id == movieReq.id) &&
                        <li>

                          <a>
                            <div className="img">
                              <img src={"https://image.tmdb.org/t/p/original/" + movieReq.poster_path} />
                            </div>
                            <div className="hover-data">Like It</div>
                            <h2>{movieReq.original_title}</h2>
                            <p>{movieReq.release_date}</p>
                            <div className="text-center">
                              <button className="like-btn" onClick={() => likeMovie(movieReq)}>{likedMovieList.find((item) => item.id == movieReq.id) ? 'Unlike' : 'like'}</button> <button className="block-btn" onClick={()=> handelBlockMovie(movieReq)}>block</button>
                            </div>
                          </a>
                        </li>
                      ))
                    ) : (
                      <h2>Sorry !! No Movies Found</h2>
                    )}
                  </ul>
                </div>
              </div>
            </div>}</>
      }
    </>
  );
}

export default MovieList;
