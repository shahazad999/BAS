import React, { Component } from 'react';
import ApplicationMenuName from 'terra-application-name/lib/ApplicationMenuName';
import Image from 'terra-image';
import img from './cerner.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  render() {
    const Header = <div style={{ border: '1px solid lightGray', backgroundColor: '#2481ca', width: '100%', height: '50px', position: 'relative' }} >
        <ApplicationMenuName title="Blockchain-As-A-Service" accessory={<Image src={img} height="80px" width="80px" isFluid />} />
    </div>
    
    return (
      <div>
       {Header}
      </div>
    );
  }
}

export default App;
