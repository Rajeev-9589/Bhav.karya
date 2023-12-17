import React, { useState, useEffect } from "react";
import { FaTrash,FaCheck,FaSync } from "react-icons/fa";

import axios from "axios";

function Seeall( props ) {
  const [todos, setTodos] = useState([]);
  const [isDisabled, setIsdisabled] = useState(false);
  const [karyas,setkaryas] =useState("0");
  const [donebtn,isdonebtn] =useState(false);
  const [doubleClickedIndex, setDoubleClickedIndex] = useState(null);
  const [updatedtitle,setUpdatedtitle] =useState("");
  const [updatednote,setUpdatednote] =useState("");
  const[Isupdated,setIsupdated] =useState(false);
  const [ikk ,seti] =useState(3)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4400/api/todos");
        if (response.status === 200) {
          setTodos(response.data.records);
          setkaryas(response.data.records.length)
        } else {
          alert("Data not found");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, []);
  const handleDoubleClick = (Title,Note,index) => {
    setDoubleClickedIndex(index);
    setIsdisabled(false);
    isdonebtn(true)
  };
  

  const updateonclick = async (title, note, index) => {
    try {
      let updatedTitle = title;
      let updatedNotes = note;
  
      // Check if updatedtitle is not empty, then update the title
      if (updatedtitle) {
        updatedTitle = updatedtitle;
      }
  
      // Check if updatednote is not empty, then update the note
      if (updatednote) {
        updatedNotes = updatednote;
      }
      const updatereq = await axios.post("http://localhost:4400/api/todos/update", {
        updatedTitle,
        updatedNotes,
        title,
        note,
      });
  
      if (updatereq.status === 200) {
        setIsupdated(true);
        setTimeout(() => {
          setIsupdated(false);
        }, 3000);
  
        let i = 3;
        const intervalId = setInterval(() => {
          seti(i);
  
          if (i === 0) {
            clearInterval(intervalId);
          } else {
            i--;
          }
        }, 600);
  
        setTimeout(() => {
          props.tryreload();
        }, 3000);
      }
    } catch (error) {
      alert("There is an error", error);
    }
  };
  
  
  const deleteonclick = async (title) => {
    try {
      const reqdelete = await axios.post(
        "http://localhost:4400/api/todos/delete",
        {title}
      );
      if (reqdelete.status === 200) {
        props.visfn(true);
        props.tryreload();
      }
    } catch (error) {
      alert(error);
    }
    
  };
  const handleblurfield=()=>{
      setTimeout(() => {
    isdonebtn(false);
      }, 1000);
  }
  const updatecomponent=()=>{
    props.tryreload();
  }
  return (
    <div className="flex text-center justify-center items-center overflow-hidden">
      <div className="mt-2 p-1 mb-2 h-auto" style={{width:'27rem'}} >
        <buttton className="cursor-pointer" onClick = {updatecomponent}>
          <FaSync/>
        </buttton>
        <h1 className="font-bold text-white text-2xl">Karya's <span hidden={!Isupdated}>Updating...{ikk} sec.</span> </h1>
        <p>Numbers of Karyas - {karyas}</p>
        {todos.map((todo, index) => (
            <div className="border-2 rounded-full border-solid border-red-500 w-auto h-auto mb-3 p-4 bg-yellow-500 hover:shadow-inner shadow-2xl z-10 shadow-zinc-700">
                <input
                  onDoubleClick={() => handleDoubleClick(todo.Title, todo.Note ,index)}
                  className="text-center font-bold text-orange-900 border-2 border-solid border-gray-200"
                  onBlur={handleblurfield}
                  disabled={isDisabled}
                  defaultValue={todo.Title}
                  onChange={(event) =>{setUpdatedtitle(event.target.value)}}
                />
              <textarea
                className="mt-4 p-2 font-bold-2 font-bold text-orange-900 text-center" style={{width:'17rem'}}
                disabled={isDisabled}
                onDoubleClick={() => handleDoubleClick(todo.Title, todo.Note ,index)}
                onBlur={handleblurfield}
                defaultValue={todo.Note}
                onChange={(event) =>{setUpdatednote(event.target.value)}}
              />
              <div className="w-auto h-auto float-right">
                <button
                  onClick={()=>deleteonclick(todo.Title)}
                  className="w-auto p-2 h-10 border-2 border-dotted border-red-100 bg-red-500"
                >
                  <FaTrash size={25} color="white" />

                </button>
                <button
                  onClick={()=>updateonclick(todo.Title,todo.Note,index)}
                  className="w-auto p-2 h-10 border-2 border-dotted border-green-100 bg-green-500"  hidden={!donebtn || doubleClickedIndex !== index}
                >
                  <FaCheck size={25} color="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Seeall;
