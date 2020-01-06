import React, {Component} from 'react';
import {connect} from 'react-redux';

// todo Make Better UI
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Dashboard extends Component {
  render() {
    return (
        <div>
          Thank You for your response
        </div>
    );
  }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Dashboard);
