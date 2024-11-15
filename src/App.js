import React, { useState } from 'react';
import './App.css'; // Importing CSS

const App = () => {
  const [url, setUrl] = useState(''); // For storing the input URL
  const [summary, setSummary] = useState(''); // For storing the summarized article
  const [loading, setLoading] = useState(false); // For showing the loading state

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY, // Fetch the key from environment
      'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
    },
  };

  const handleSummarize = (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary('Please wait, article is summarizing...');

    if (!/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(url)) {
      setSummary('Invalid URL, please provide a valid URL.');
      setLoading(false);
    } else {
      const fetchUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${url}&lang=en&engine=2`;

      fetch(fetchUrl, options)
        .then((response) => response.json())
        .then((data) => {
          setSummary(data?.summary || 'Summary not available.');
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setSummary('An error occurred while summarizing.');
          setLoading(false);
        });
    }
  };

  return (
    <div className="container">
      <h3 className="heading">Article Summarizer Application</h3>
      <div className="input-div">
        <input
          type="url"
          id="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)} // Handle URL input change
        />
        <button className="btn" onClick={handleSummarize}>
          Click
        </button>
      </div>
      <div className="summarize-article">
        <p className="summary">{loading ? 'Loading...' : summary}</p>
      </div>
    </div>
  );
};

export default App;