import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index) => {
    setActiveButton(index === activeButton ? null : index);
  };

  const buttonStyles = (index) => ({
    color: activeButton === index ? "green" : "gray",
  });

  return (
    <div>
      <div className=" sticky top-0 nav p-3 border border-solid border-white-500 h-14 w-100 bg-gray-200 bg-opacity-50 ">

        <h1 className="font-bold text-2xl text-purple-800 float-left">Bhav.Karya</h1>
        <div className="actions">
          <ul className="flex flex-row">
            <li className={`font-bold text-2md ml-40 p-4`} style={buttonStyles(0)}>
              <Link to="/">
                <a
                  href="/"
                  className="cursor-pointer"
                  onClick={() => handleButtonClick(0)}
                >
                  Home
                </a>
              </Link>
            </li>
            {/* <li className="p-4 font-bold text-2md">
              <Link to="/see">
                <a
                  href="/"
                  className="cursor-pointer"
                  onClick={() => handleButtonClick(1)}
                  style={buttonStyles(1)}
                >
                  View All
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
      <div id='msg' hidden={!props.visstate}  className=' absolute right-0 border-2 border-dashed border-white h-12 bg-red-500 text-white py-2' style={{ width: '30rem' }}>
        <a className='absolute right-4 text-white' href='/' onClick={() => props.visstate}>X</a>
        <label className='font-bold '>Note Has Been Deleted Successfully!!</label>
        
      </div>
      <div id="rod" hidden={!props.visstate} className=" absolute border-4 right-0 border-solid border-red-500"  style={{ width: '38%', top:'6.5rem' }}></div>
      <div className="p-2">
      <h1 className="font-bold text-2xl">Welcome to Bhav.Karya</h1>
      <p>
        <span className="font-bold text-green-500">"Bhav.Karya"</span>*Bhavishya
        karya that we means the to-do list.
      </p>
      </div>
    </div>
  );
}

export default Nav;
