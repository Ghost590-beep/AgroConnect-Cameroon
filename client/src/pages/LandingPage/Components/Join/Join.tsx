import React from "react";
import "../Join/Join.css";

const Join: React.FC = () => {
  return (
   <div className="join" id="join-us">
       <div className="left-j">
        <hr />
          <div>
             <span className="stroke-text">READY TO</span>
             <span> GROW</span>
          </div>
           <div>
             <span>YOUR</span>
             <span className="stroke-text"> BUISNESS?</span>
          </div>
       </div>

       <div className="right-j">
        <form action="" className="email-container">
            <input type="email" name="user_email" placeholder="Enter your Email address"/>
            <button className="btn-j">Join Now</button>
        </form>
       </div>
   </div>
  );
};

export default Join;
