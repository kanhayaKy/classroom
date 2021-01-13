import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../Images/404Page.gif";


export default function NotFoundPage() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <div >
        <img src={PageNotFound} alt="404 page"/>
        <p>
          <Link to="/">Go to Home </Link>
        </p>
      </div>
      </div>
    );
}

