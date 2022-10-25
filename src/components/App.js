import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/App.css";
import Home from "./Home";
import SearchBar from "./SearchBar";
import ArtistCard from "./ArtistCard";

function App() {
  const CLIENT_ID = "06220ab3b11449e1a77ca512919cc366";
  const CLIENT_SECRET = "f40d66a6cda3436dad580800937ead1e";

  const [accessToken, setAccessToken] = useState("");
  const [results, setResults] = useState([]);

  // ! (1) REQUEST ACCESS TOKEN - post credentials and recieve access token, which will be used for making GET requests
  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log("access token:", data);
      });
  }, []);

  const handleSearchResults = (searchResults) => {
    setResults(searchResults);
  };

  console.log(results);

  return (
    <div className="App">
      <SearchBar
        accessToken={accessToken}
        onSearchResults={handleSearchResults}
      />
      {!!results ? "hey" : "no hey"}
      {!results ? <ArtistCard results={results[0]} /> : null}
      <Routes>
        <Route exact path="/" element={<Home token={accessToken} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
