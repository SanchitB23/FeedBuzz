import React, {Component} from 'react';
import assets from "../resources/info";
import {Link} from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: 0
    }
  }

  render() {
    return (
        <footer className="page-footer"
                style={{
                  minHeight: "12vh",
                  backgroundColor: assets['primary-color']
                }}>
          <div className="container" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <ul>
              {/*temp Change to Link tag*/}
              <li><Link className="grey-text text-lighten-3" to={'/about_us'}>About Us</Link></li>
              <li><Link className="grey-text text-lighten-3" to={'/contact_us'}>Contact Us</Link></li>
              <li><Link className="grey-text text-lighten-3" to={'/terms'}>Terms and Conditions</Link></li>
            </ul>
            <button className="btn-flat btn-large grey lighten-2" onClick={() => this.scrollToTop()}><i
                className="fa fa-long-arrow-alt-up"/> Back
              to top
            </button>
            <ul>
              {/*temp Change to Link tag*/}
              <li><Link className="grey-text text-lighten-3" to={'/social'}><i className="fab fa-facebook-f"/> Facebook</Link>
              </li>
              <li><Link className="grey-text text-lighten-3" to={'/social'}><i
                  className="fab fa-twitter"/> Twitter</Link></li>
              <li><Link className="grey-text text-lighten-3" to={'/social'}><i className="fab fa-instagram"/> Instagram</Link>
              </li>
            </ul>
          </div>
          <div className="footer-copyright">
            <div className="container" style={{alignItems: "center", display: "flex", justifyContent: "space-around"}}>
              <div className="left"><i className="far fa-copyright"/> Copyright of JXBFS</div>
              <div className="center">Major Project 2020</div>
              <div className="right">V2.0</div>
            </div>
          </div>
        </footer>
    );
  }

  scrollStep() {
    if (window.pageYOffset === 0) clearInterval(this.state.intervalID);
    window.scroll(0, window.pageYOffset - 50)
  }

  scrollToTop() {
    let intervalID = setInterval(this.scrollStep.bind(this), 16.66);
    this.setState({intervalID});
  }
}

export default Footer;
