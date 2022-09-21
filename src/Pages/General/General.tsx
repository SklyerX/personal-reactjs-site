import React from "react";
import Marquee from "react-fast-marquee";
import { TypeAnimation } from "react-type-animation";
import {
  testimonials,
  testimonialsSecond,
} from "../../utils/mocks/testimonials";
import "./general.scss";

const General = () => {
  return (
    <div className="general container">
      <h1 className="page-title">General</h1>
      <div className="general-top">
        <div className="titles">
          <h2 className="secondary-title">
            <TypeAnimation
              sequence={[
                "I am developer that knows",
                1000,
                "I am developer that knows Frontend",
                1000,
                "I am developer that knows Backend",
                1000,
                "I am developer that knows UI/UX Design",
                1000,
                "I am developer that knows Database",
                500,
              ]}
              repeat={Infinity}
            />
          </h2>
        </div>
        <div className="content" style={{ padding: "1rem" }}>
          <p>Skyler. 15 y/o developer, inovator and designer</p>
          <p>
            I design, build and publish products of quality. I am currently just
            trying to learn as much as I can while working on as many projects
            as I can! I am a developer at{" "}
            <a href="https://observersteam.ir">Observers™</a>.
          </p>

          <div className="titles" style={{ padding: "0" }}>
            <h2 className="secondary-title">About Observers Team</h2>
          </div>

          <p>
            Observers is a development team working in the field of bot,
            automation and the web This team has experienced specialists in this
            specialty.
          </p>

          <div className="titles" style={{ padding: "0" }}>
            <h2 className="secondary-title">Testimonials</h2>
          </div>
          <p>here is what clients and co-workers say about me!</p>

          <Marquee direction="right" speed={20} pauseOnHover>
            <div className="cards">
              {testimonials.map((item) => (
                <div className="card" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </Marquee>
          <Marquee direction="left" speed={20} pauseOnHover>
            <div className="cards" style={{ marginTop: "2rem" }}>
              {testimonialsSecond.map((item) => (
                <div className="card" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default General;
