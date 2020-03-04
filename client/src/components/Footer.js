import React, {Component} from 'react';
import assets from "../resources/info";

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
              <li><a className="grey-text text-lighten-3" href="#">About Us</a></li>
              <li><a className="grey-text text-lighten-3" href="#">Contact Us</a></li>
              <li><a className="grey-text text-lighten-3" href="#">Terms and Conditions</a></li>
            </ul>
            <button className="btn-flat btn-large grey lighten-2" onClick={() => this.scrollToTop()}><i
                className="fa fa-long-arrow-alt-up"/> Back
              to top
            </button>
            <ul>
              {/*temp Change to Link tag*/}
              <li><a className="grey-text text-lighten-3" href="#"><i class="fab fa-facebook-f"/> Facebook</a>
              </li>
              <li><a className="grey-text text-lighten-3" href="#"><i class="fab fa-twitter"/> Twitter</a></li>
              <li><a className="grey-text text-lighten-3" href="#"><i class="fab fa-instagram"/> Instagram</a></li>
            </ul>
          </div>
          <div className="footer-copyright">
            <div className="container" style={{alignItems: "center", display: "flex", justifyContent: "space-around"}}>
              <div className="left"><i className="far fa-copyright"/> Copyright of JXBFS</div>
              <div className="center">Major Project 2020</div>
              <div className="right">V1.2</div>
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
