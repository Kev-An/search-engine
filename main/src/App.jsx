import React, { useState } from "react";
import { motion } from "framer-motion";
import ArticleSearch from "./components/ArticleSearch.jsx";
import YoutubeSearch from "./components/YoutubeSearch.jsx";
import PubMedSearch from "./components/PubMedSearch.jsx";
import "./App.css";

const App = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const showComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div>
          <nav>
            <button
              className="articles-button"
              onClick={() => showComponent("articles")}
            >
              Search blogs/articles
            </button>
            <button
              className="yt-button"
              onClick={() => showComponent("youtube")}
            >
              Search on YouTube
            </button>
            <button
              className="pubmed-button"
              onClick={() => showComponent("pubmed")}
            >
              Search on PubMed
            </button>
          </nav>
        </div>
      </motion.div>

      <div>
        {activeComponent === "articles" && <ArticleSearch />}
        {activeComponent === "youtube" && <YoutubeSearch />}
        {activeComponent === "pubmed" && <PubMedSearch />}
      </div>
    </div>
  );
};

export default App;
