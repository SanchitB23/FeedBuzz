import React from 'react';
import faker from "faker";
import Logo from "../resources/Logo/FeedBuzz - Logo - 200px.png";

const devList = [
  {
    "name": "Sanchit Bhatnagar",
    "designation": "MERN Stack Developer",
    "description": "Developed Backend Server, Implemented API Management And Database Setup",
    "email": "email@email.com",
    "twitter": "email@email.com",
    "facebook": "email@email.com",
    "github": "https://github.com/SanchitB23",
  },
  {
    "name": "Aashish Kumar Singh",
    "designation": "Front-End Developer",
    "description": "Implemented ReactJs for dynamic Web Development",
    "email": "email@email.com",
    "twitter": "email@email.com",
    "facebook": "email@email.com",
    "github": "email@email.com",
  },
  {
    "name": "Amar Singh",
    "designation": "Front-End Developer",
    "description": "Used HTML and CSS for implementation of Design Modules",
    "email": "email@email.com",
    "twitter": "email@email.com",
    "facebook": "email@email.com",
    "github": "email@email.com",
  },
  {
    "name": "Lalit Joshi",
    "designation": "UI/UX Designer",
    "description": "Designed User Interfaces and High-End Mock-ups with Pictorial Illustrations",
    "email": "email@email.com",
    "twitter": "email@email.com",
    "facebook": "email@email.com",
    "github": "email@email.com",
  },
];

const AboutUsPage = () => (
    <div className="">
      <h5 className="font-italic font-weight-bold" style={{paddingLeft: "10%", paddingBottom: ""}}><u>Meet the
        Developers</u></h5>
      <div style={{display: "flex", "flexDirection": "row", width: "100%", justifyContent: "space-evenly"}}>
        {
          devList.map(dev => (
              <div class="card center-align" style={{width: "20%"}}>
                <div class="center" style={{marginTop: "5px"}}>
                  <img src={faker.image.avatar()} style={{width: "160px", height: "160px", borderRadius: "50%"}}
                       alt="Dev Avatar"/>
                </div>
                <div class="card-content">
                  <h5>{dev.name}</h5>
                  <h6>{dev.designation}</h6>
                  <p>{dev.description}</p>
                </div>
                <div class="card-action"
                     style={{display: "flex", "flexDirection": "row", justifyContent: "space-around"}}>
                  <a href={`mailto:${dev.email}`}><i class="far fa-envelope blue-grey-text"
                                                     style={{fontSize: "1.5rem"}}/></a>
                  <a href={dev.twitter}> <i class="fab fa-twitter light-blue-text"
                                            style={{fontSize: "1.5rem"}}/> </a>
                  <a href={dev.facebook}> <i class="fab fa-facebook text-darken-4 blue-text"
                                             style={{fontSize: "1.5rem"}}/> </a>
                  <a href={dev.github}><i class="fab fa-github text-darken-4 grey-text"
                                          style={{fontSize: "1.5rem"}}/> </a>
                </div>
              </div>
          ))
        }
      </div>
      <div className="center" style={{padding: "5rem"}}>
        <div>
          <div style={{display: "flex", "flexDirection": "row", justifyContent: "center", alignItems: "center"}}>
            <img src={Logo} alt="Logo"/>
            <h3 className="font-weight-bold" style={{
              fontFamily: "Lucida Calligraphy",
              textDecoration: "none",
              padding: "0 4px",
              color: "#FF8F00"
            }}>FeedBuzz</h3>
          </div>
          <h5 style={{color: "#FFA12A"}}>Dynamic Feedback System for Startups for better Customers relations</h5>
          <p className="container">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat.</p>
        </div>
      </div>
    </div>
);

export default AboutUsPage;
