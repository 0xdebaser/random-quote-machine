import { useEffect, useState } from "react";
import "./App.css";
import twitterBtn from "./Twitter social icons - circle - white.svg";

const API_URL = "https://api.quotable.io";
const quotesArray = [];

function App() {
  const [activeQuote, setActiveQuote] = useState();

  async function loadQuotes() {
    const response = await fetch(`${API_URL}/quotes?limit=150`);
    const data = await response.json();
    quotesArray.push(...data.results);
    getRandomQuote();
  }

  async function getRandomQuote() {
    const randIndex = Math.floor(Math.random() * quotesArray.length);
    setActiveQuote(quotesArray[randIndex]);
  }

  useEffect(() => {
    loadQuotes();
  }, []);

  return (
    <div className="App">
      <div id="quote-box">
        <div className="quote-component" id="text">
          {activeQuote
            ? `"${activeQuote.content}"`
            : "Internet quotes are not trustworthy."}
        </div>
        <div className="quote-component" id="author">
          {activeQuote ? `--${activeQuote.author}` : "--This site's dev"}
        </div>
        <button id="new-quote" onClick={getRandomQuote}>
          New Quote
        </button>
        <br />
        <a href="https://twitter.com/intent/tweet" id="tweet-quote">
          <img src={twitterBtn} id="twitter-btn" />
        </a>
      </div>
    </div>
  );
}

export default App;
