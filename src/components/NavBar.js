import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

function NavBar({setMovies}) {

// const [movies, setMovies] = useState([]);
const [query, setQuery] = useState("");

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          {/* <Navbar.Brand href="/home">MovieDb App</Navbar.Brand> */}
          <div id="menuToggle">
            <input type="checkbox" id="menu-check-inout"/>
            {/* <span></span>
            <span></span>
            <span></span> */}
            <svg viewBox="0 0 100 80" width="40" height="40">
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
            </svg>




            <ul id="menu">
              <div className="menu-close-div">
                <button  onClick={()=> document.getElementById('menu-check-inout').click()}>Close</button>
              </div>
              <a href="/"><li>Home</li></a>
              <a href="movie-list"><li>Movies List</li></a>
              <a href="movie-list?pageName=likedMovie"><li>Movie List Of Like</li></a>
              <a href="movie-list?pageName=blockedMovie"><li>Movie List Of Blocked</li></a>
            </ul>
          </div>
          <Navbar.Brand href="/home" style={{marginLeft: '300px'}}>Welcome to the Movie Hub</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
