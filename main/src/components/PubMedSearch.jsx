import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./PubMedSearch.module.css"; 
const PubMedSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const handleSearch = async (e) => {
    e.preventDefault();

    const url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
    const params = {
      db: "pubmed",
      term: query,
      retmax: 25,
      retmode: "json",
    };

    if (sortBy === "date") {
      params.sort = "pub+date";
    }

    try {
      const response = await axios.get(url, { params });
      const idList = response.data.esearchresult.idlist;

      if (idList.length > 0) {
        const summaryUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi";
        const summaryParams = {
          db: "pubmed",
          id: idList.join(","),
          retmode: "json",
        };

        const summaryResponse = await axios.get(summaryUrl, { params: summaryParams });
        setResults(Object.values(summaryResponse.data.result));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data from PubMed API:", error);
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
          placeholder="Search PubMed articles..."
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
          item.uid && (
            <motion.li 
              key={item.uid} 
              className={styles.item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>{item.title}</h3>
              <p>{item.source}</p>
              <p>{item.pubdate}</p>
              <a href={`https://pubmed.ncbi.nlm.nih.gov/${item.uid}`} target="_blank" rel="noopener noreferrer">View on PubMed</a>
            </motion.li>
          )
        ))}
      </ul>
    </div>
  );
};
export default PubMedSearch;
