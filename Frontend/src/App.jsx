import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  //Socket conn
  const socket = io("http://localhost:3000");

  // //State
  const [allPlayerScores, setPlayerScores] = useState([]);

  // //Reference
  const nameInputRef = useRef();
  const scoreInputRef = useRef();

  //Functions
  const handleAddButton = () => {
    const name = nameInputRef.current.value.trim();
    const score = scoreInputRef.current.value.trim();
    if (!name || !score) {
      alert("Input Box should not be empty");
    }
    socket.emit("scores", {
      name,
      score,
    });
    socket.on("playerScores", (scores) => {
      setPlayerScores(scores);
    });
    alert("Score Sent to server");
    nameInputRef.current.value = "";
    scoreInputRef.current.value = "";
  };

  //Side Effects
  useEffect(() => {
    // Listen for connection success
    socket.on("connect", () => {
      console.log(`Connected with id: ${socket.id}`);
    });
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <h1 className="text-center font-bold text-3xl m-5">WebSocket Practice</h1>
      <div className="flex flex-col items-center py-4">
        <input
          type="text"
          ref={nameInputRef}
          placeholder="Enter your name"
          className="border border-gray-400 w-72 py-1 px-3 my-3"
        />
        <input
          type="number"
          ref={scoreInputRef}
          placeholder="Enter your score"
          className="border border-gray-400 w-72 py-1 px-3 my-3"
        />
        <button
          onClick={handleAddButton}
          className="border border-gray-400 active:scale-95 hover:bg-gray-400 px-3 py-1 my-5 rounded-lg"
        >
          Add
        </button>
      </div>
      {allPlayerScores.length > 0 && (
        <>
          <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-center text-2xl font-semibold leading-tight">
              Player Scores
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <table className="w-1/2 p-6 text-xs text-left whitespace-nowrap">
                <colgroup>
                  <col className="w-5" />
                  <col />
                  <col />
                  <col className="w-5" />
                </colgroup>
                <thead>
                  <tr className="dark:bg-gray-300">
                    <th className="p-3">No.</th>
                    <th className="p-3">Socket ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Score</th>
                  </tr>
                </thead>
                <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                  {allPlayerScores.map((playerData, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-3 py-2">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2">
                          <p>{playerData.id}</p>
                        </td>
                        <td className="px-3 py-2">
                          <p>{playerData.name}</p>
                        </td>
                        <td className="px-3 py-2">
                          <p>{playerData.score}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
