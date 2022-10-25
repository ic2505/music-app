import React from "react";

export default function ArtistCard({ result }) {
  console.log(result.images);
  return (
    <div>
      <h2>{result.name}</h2>
      {/* <img src={result.images[0].url} alt={result.name} /> */}
      <p>{result.images}</p>
    </div>
  );
}
