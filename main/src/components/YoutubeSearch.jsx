import React, { useState } from "react";
import axios from "axios";
import styles from "./YoutubeSearch.module.css"; 

const YouTubeSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const handleSearch = async (e) => {
    e.preventDefault();

    const apiKey = "AIzaSyDsRYfJO5vyXf3zY_pUEbiMSZr6G5kpcsQ"; 
    const url = "https://www.googleapis.com/youtube/v3/search";

    const params = {
      key: apiKey,
      q: query,
      part: "snippet",
      maxResults: 25,
      type: "video",
    };

    if (sortBy === "date") {
      params.order = "date";
    }

    try {
      const response = await axios.get(url, { params });
      setResults(response.data.items);
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube..."
        />
        <button type="submit">Search</button>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.dropdown}
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
        </select>
      </form>
      <ul>
        {results &&
          results.map((item) => (
            <li key={item.id.videoId}>
              <h3>{item.snippet.title}</h3>
              <p>{item.snippet.description}</p>
              <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
              <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target="_blank" rel="noopener noreferrer">
                Watch on YouTube
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default YouTubeSearch;
