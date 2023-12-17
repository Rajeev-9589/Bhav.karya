import React, { useState ,useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import axios from "axios";
import Seeall from "./Seeall";

function Home(props) {
  const [isDone, setIsDone] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const [reloadSeeAll, setReloadSeeAll] = useState(false);
   
  const reloadfn =()=>{
    setIsDone(true);
    setTimeout(() => {
        setIsDone(false);
    }, 1000);
  }

  useEffect(() => {
    if (isDone) {
      // Reload SeeAll component when isDone is true
      setReloadSeeAll((prev) => !prev);
    }
  }, [isDone]);

  const handleCreation = async () => {
    if (!titleValue || !todo) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4400/api/done", {
        title: titleValue,
        note: todo,
      });

      if (response.status === 200) {
        setIsDone(true);
        setTimeout(() => {
          setIsDone(false);
        }, 5000);
        // Reset fields and error after successful creation
        setTitleValue("");
        setTodo("");
        setError("");
      } else {
        setError("Failed to create. Please try again.");
      }
    } catch (error) {
      setError("There is an error. Please try again.");
    }
  };

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
    setError("");
  };

  return (
    <div className="flex flex-col p-4 bg-purple-800 text-white overflow-hidden">
      <div className="mt-2 ml-7 p-2 add-todo border-2 border-solid border-white w-1/2 h-auto">
        <h1 className="font-bold text-2xl ml-10 p-2">
          Add the Karya's
        </h1>
        <p>{titleValue.length}/30 characters {props.YeName}</p>
        <label className="font-bold">Title</label>
        <input
          type="text"
          value={titleValue}
          maxLength={30}
          onChange={handleTitleChange}
          id="title"
          className={`h-10 w-1/2 p-2 form-input border ${
            !titleValue && "border-red-500"
          } border-2 ml-3 border-solid border-yellow-500 text-black`}
          placeholder="Enter the title"
        />
        <div className="mt-4">
          <label className="font-bold ">Note</label>
          <textarea
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            id="note"
            className={`w-1/2  p-3 border ${
              !todo && "border-red-500"
            } border-2 ml-2 border-solid border-yellow-500 text-black`}
            style={{height:'15rem'}}
            placeholder="Enter the description"
          />
        </div>
        <div className="text-center">
          {error && (
            <p className="flex justify-center items-center text-red-500 mt-0">
              <FaExclamationCircle className="mr-1" />
              {error}
            </p>
          )}
          <button
            onClick={handleCreation}
            className="font-bold rounded-full p-3 border border-solid border-green-500 bg-green-500"
          >
            {isDone ? <FaCheckCircle /> : "Create"}
          </button>
        </div>
      </div>
      <div className="absolute right-20 p-1 border-2 border-solid border-white mt-2 overflow-scroll" style={{height:'70vh'}}>
      <Seeall key={reloadSeeAll} tryreload ={reloadfn} visfn = {props.Showmsg} />
      </div>
    </div>
  );
}

export default Home;
