import React from "react";
import { Link } from "react-router-dom";
import { Zoom, Fade } from "react-reveal";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="banner mt-5 mb-5">
      <div className="container">
        <div className="row">
          <Fade left>
            <div className="col-md-6 pt-5 pt-lg-0 d-flex justify-content-center flex-column order-lg-1 order-2">
              <h1>
                Selamat Training Microservice & Tetap Semangat meski di{" "}
                <strong className="text-primary-emphasis">Hari Sabtu</strong>
              </h1>
              <p className="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quae.
              </p>
              <div className="mt-4">
                <Link to="/about" className="btn btn-outline-primary">
                  Get Started
                </Link>
              </div>
            </div>
          </Fade>
          <Zoom>
            <div className="col-md-6 order-lg-2 order-1">
              <img
                src="assets/images/logo_microservice.svg"
                alt="logo"
                className="img-fluid animation"
                width="100%"
                style={{ height: "400px" }}
              />
            </div>
          </Zoom>
        </div>
      </div>
    </section>
  );
};

export default Banner;
