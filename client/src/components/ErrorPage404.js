import React from 'react';
import Ill_404 from '../resources/Illus_PageNotFound.png'
import assets from "../resources/info";

const ErrorPage404 = () => {
  return (
      <div className='container' style={{textAlign: 'center'}}>
        <img src={Ill_404} alt={"Error: Page Not Found"} height={350} style={{margin: '10% 0 3% 0'}}/>
        <h4 style={{color: assets["secondary-color-green"]}}>Page Not Found!</h4>
      </div>
  );
};

export default ErrorPage404;
