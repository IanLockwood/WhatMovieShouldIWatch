import GenerateButton from "../components/GenerateButton";
import axios from 'axios';
import { useState } from "react";

export function Welcome() {
  interface MovieData {
    title: string;
    [key: string]: any; // To allow other properties if needed
  }

  const [data, setData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickRandomImdbID = () => {
    let id = (Math.floor(Math.random() * 20969586) + 1).toString();
    if (id.length < 7) {
      id = "0".repeat(7 - id.length) + id;
    }
    return id;
  }

  const handleGenerateClick = () => {
    console.log("Generate button clicked");
    const randomImdbID = pickRandomImdbID();
    console.log("Random IMDB ID:", randomImdbID);
    // Make an API call to fetch movie details using the random IMDB ID
    axios.get('http://www.omdbapi.com/?i=tt' + randomImdbID + '&apikey=77a56d1')
      .then((response) => {
        console.log("API response:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
          setError(err.message);
          setLoading(false);
      });
  };

  console.log("Data:", data);
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <h1 className="text-4xl font-bold text-center mb-8">What movie should I watch?</h1>
      <GenerateButton onClick={handleGenerateClick} />
      {
      data && data.Title ?
        <div className="mt-8">
          <p>Your movie is...</p>
          <h2 className="text-2xl font-bold">{data.Title}</h2>
          <p className="text-lg">{data.Plot}</p>
          <img src={data.Poster} alt={data.Title} className="mt-4" />
        </div>
      :
        <p></p>
      }
    </main>
  );
}