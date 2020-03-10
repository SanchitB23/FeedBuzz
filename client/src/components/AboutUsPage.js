import React from 'react';
import faker from "faker";
import Logo from "../resources/Logo/FeedBuzz - Logo - 200px.png";

const devList = [
  {
    "name": "Sanchit Bhatnagar",
    "designation": "God",
    "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
    "email": "email@email.com"
  },
  {
    "name": "S Bhatnagar",
    "designation": "God",
    "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
    "email": "email@email.com"
  },
  {
    "name": "Sanchit B",
    "designation": "God",
    "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
    "email": "email@email.com"
  },
  {
    "name": "S B",
    "designation": "God",
    "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
    "email": "email@email.com"
  },
];

const AboutUsPage = (props) => (
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
                     style={{display: "flex", "flexDirection": "row", justifyContent: "space-evenly"}}>
                  <a href={`mailto:${dev.email}`}><i class="far fa-envelope blue-grey-text"
                                                     style={{fontSize: "1.5rem"}}/></a>
                  <a href={`mailto:${dev.email}`}> <i class="fab fa-twitter light-blue-text"
                                                      style={{fontSize: "1.5rem"}}/> </a>
                  <a href={`mailto:${dev.email}`}> <i class="fab fa-facebook text-darken-4 blue-text"
                                                      style={{fontSize: "1.5rem"}}/> </a>
                  <a href={`mailto:${dev.email}`}><i class="fab fa-github text-darken-4 grey-text"
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
