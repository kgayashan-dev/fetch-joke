import React from "react";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

const Home = () => {
  // this is the API that we are going to fetch
  const url = "https://official-joke-api.appspot.com/random_joke";
  const [jokes, setJokes] = useState([
    {
      id: 385,
      type: "programming",
      setup: "3 SQL statements walk into a NoSQL bar. Soon, they walk out",
      punchline: "They couldn't find a table.",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // load joke, execute API
  const loadNewJoke = async () => {
    setIsLoading(true);
    const request = await fetch(url).then((response) => response.json());
    setJokes((prev) => [request, ...prev]);
    setIsLoading(false);
  };

  // delete joke one by one
  const removeJoke = (id) => {
    setJokes((prev) => prev.filter((element) => element.id !== id));
  };
  return (
    <div className="flex flex-col m-4">
      <button
        onClick={loadNewJoke}
        
        className="border   mt-14 p-2  rounded-lg bg-blue-600 hover:bg-blue-500  text-white"
      >
        Load a joke
      </button>
      <div className="flex justify-center p-4 animate-bounce">
        <h1 className="text-3xl ">😅 😅</h1>
      </div>
      <div className="">
        <div></div>

        <div className="">
          <h3 className="flex items-center justify-center gap-3 text-blue-600">
            {isLoading ? (
              <>
                Loading
                <ImSpinner8 className="animate-spin  mr-2 text-xl font-bold" />
              </>
            ) : (
              `loaded
            ${
              jokes.length === 1
                ? "(1 joke is loaded)"
                : `(${jokes.length} jokes are loaded)`
            }` 
            )}
          </h3>
        </div>

        <div className="flex flex-col justify-center gap-3 shadow-xl p-4  text-gray-700 rounded-lg ">
          {jokes.map((joke, key) => (
            <div
              key={key}
              className="bg-slate-300 p-4 items-center shadow-xl rounded-lg flex flex-col justify-center "
            >
              <div>
                <p>🤔 {joke.setup}</p>
                <p className=""> 🤭 {joke.punchline}</p>
              </div>

              <button
                onClick={removeJoke.bind(null, joke.id)}
                className=" w-[25%] p-2 mt-4  self-end rounded-lg bg-blue-600 text-white hover:bg-blue-500 "
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
