import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="container d-flex justify-content-center flex-column align-items-center">
      <div className="col-md-5">
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="404"
          className="img-fluid"
        />
      </div>
      <div className="col-md-6 d-flex flex-column align-items-center">
        <Link to="/" className="btn btn-primary">
          Go back to home
        </Link>
        <h1 className="text-center py-4">404 - Page not found</h1>
      </div>
    </div>
  );
};

export default Notfound;
