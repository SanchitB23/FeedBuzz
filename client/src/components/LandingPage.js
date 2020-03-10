import React from 'react';
import {Illus1, Illus2, Illus3, Illus4} from '../resources/landing_illus_svg'
import Logo from "../resources/Logo/FeedBuzz - Logo - 200px.png";
import {Link} from "react-router-dom";

const cards = [
  {
    illus: <Illus3 height="200px"/>
    , text: `Easily Manage \nCustomer Relations`,
  },
  {
    illus: <Illus2 height="200px"/>
    , text: 'Get All Customer Feedback \n All In One Place',
  },
  {
    illus: <Illus1 height="200px"/>
    , text: 'Easily Create, Broadcast \n And Manage Surveys'
  },
  {
    illus: <Illus4 height="200px"/>
    , text: 'Secure Card Payments \n Powered By Stripe'
  },
];

function LandingPage() { //idea if already logged in then redirect to dashboard
  const w = window.innerWidth;
  return (
      <div style={{textAlign: 'center'}}>
        <div className=""
             style={{
               height: "600px",
               display: "table"
               , width: "100%",
               backgroundColor: "#BDEB98"
             }}>
          <div style={{display: "table-row"}}>
            <div className="card-content"
                 style={{verticalAlign: "middle", textAlign: "center", height: "300px", display: "table-cell"}}>
              <img src={Logo} alt="Logo"/>
              <h2 style={{fontFamily: "sans-serif"}}>FeedBuzz</h2>
              <h4 style={{fontFamily: "sans-serif", textTransform: "capitalize"}}>get the customer support you need</h4>
              <Link className="waves-effect waves-light btn-large" to={'/surveys'}>Get Started</Link>
            </div>
          </div>
        </div>
        <div className="container">
          {
            cards.map((card, index) => {
                  // console.log(index);
                  if (index % 2 === 0) return (
                      <div className="card grey lighten-5 horizontal"
                           style={{justifyContent: "space-around", alignItems: "center"}}>
                        <div className="card-image" style={{margin: "10px 0px"}}>{card.illus}</div>
                        <h4 className="card-content" contentEditable={"plaintext-only"}
                            style={{color: "#57B894", fontFamily: "Comic Sans MS", textAlign: "center"}}>{card.text}</h4>
                      </div>
                  );
                  return (
                      <div className="card grey lighten-5 horizontal"
                           style={{justifyContent: "space-around", alignItems: "center"}}>
                        <h4 className="card-content" contentEditable={"plaintext-only"}
                            style={{color: "#BB77B8", fontFamily: "Comic Sans MS", textAlign: "center"}}>{card.text}</h4>
                        <div className="card-image" style={{margin: "10px 0px"}}>{card.illus}</div>
                      </div>
                  )
                }
            )
          }
        </div>
      </div>
  );
}

export default LandingPage;
