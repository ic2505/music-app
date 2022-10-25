import { useState } from "react";

export default function SearchBar({ accessToken, onSearchResults }) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // ! (2) SEARCH FUNCTIONALITY, by default returns 20 results, here we specified only tracks and artists
  // ! provide a string search value
  function searchSpotify(e, searchInput) {
    e.preventDefault();
    console.log(searchInput);
    const artistSearch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchInput +
        "&type=track%2Cartist&market=US",
      artistSearch
    )
      .then((res) => res.json())
      .then((data) => {
        onSearchResults(data.artists.items);
        // setResults(data.tracks.items)
        console.log("ARTISTS: ", data.artists.items);
        console.log("TRACKS: ", data.tracks.items);
      });
  }

  return (
    <div>
      <form onSubmit={(e) => searchSpotify(e, searchInput)}>
        <input
          type="text"
          placeholder="search"
          value={searchInput}
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}
