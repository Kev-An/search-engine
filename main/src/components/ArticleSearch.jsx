import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./ArticleSearch.module.css"; 

const ArticleSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const handleSearch = async (e) => {
    e.preventDefault();

    const apiKey = "AIzaSyDsRYfJO5vyXf3zY_pUEbiMSZr6G5kpcsQ";
    const cx = "04eff8bf8a2764b2a"; 
    const url = "https://www.googleapis.com/customsearch/v1";
    const params = {
      key: apiKey,
      cx: cx,
      q: query,
    };

    if (sortBy === "date") {
      params.sort = "date";
    }

    try {
      const response = await axios.get(url, { params });
      setResults(response.data.items);
    } catch (error) {
      console.error("Error fetching data from Google API:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles or blogs..."
        />
        <button className={styles.button} type="submit">Search</button>
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
        {results && results.map((item) => (
          <motion.li 
            key={item.link} 
            className={styles.item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{item.title}</h3>
            <p>{item.snippet}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSearch;
