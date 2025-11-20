import "./App.css";

// ✅ Make four different API calls and display the data back to the user
// ✅ Use a useEffect so the data is fetched when the user arrives at the site

// ✅ Google Books:
// ✅ https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5
// ✅ Map over the data and show title and author for all 5 results

// ✅ News API:
// ✅ This API can only be used in development mode - not on Third party sites
// ✅ https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=YOUR_API_KEY
// ✅ Map over and show title and author for each item
// ✅ API KEY: 20338fa1b5fd42f789f00d697c05fbb1

// ✅ Advice Slip API
// ✅ https://api.adviceslip.com/advice
// ✅ Call the API and show the ID and advice back to the user

// ✅ Weather API
// ✅ https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&current_weather=true
// ✅ Call the API and show the current temerature and current windspeed back to the user

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [news, setNews] = useState([]);
  const [slip, setSlip] = useState();
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5"
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items || []);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=20338fa1b5fd42f789f00d697c05fbb1"
    )
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles || []);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        setSlip(data.slip || []);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data.current_weather || []);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  return (
    <div className="app">
      <h1>Book Titles</h1>
      <div className="card-container">
        {books.map((book) => (
          <div className="card" key={book.id}>
            <h2>
              <span className="label">Title:</span> {book.volumeInfo.title}
            </h2>
            <p>
              <span className="label">Author:</span> {book.volumeInfo.authors}
            </p>
          </div>
        ))}
      </div>

      <h1>News</h1>
      <div className="card-container">
        {news.map((article) => (
          <div className="card" key={article.url}>
            <h2>
              <span className="label">Title: </span>
              {article.title}
            </h2>
            <p>
              <span className="label">Author:</span> {article.author}
            </p>
          </div>
        ))}
      </div>
      <h1>Advice</h1>
      <div className="card-container">
        {slip && (
          <div className="card">
            <h2>
              {" "}
              <span className="label">ID: </span>
              {slip.id}
            </h2>
            <p>
              <span className="label">Advice:</span> {slip.advice}
            </p>
          </div>
        )}
      </div>

      <h1>Weather</h1>
      <div className="card-container">
        {weather && (
          <div className="card">
            <h2>
              <span className="label">Temperature:</span> {weather.temperature}
            </h2>
            <p>
              <span className="label">Wind Speed:</span> {weather.windspeed}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
