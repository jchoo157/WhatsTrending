import React, {Component} from 'react';
import Twitter from './Twitter';
import GoogleMaps from '../components/GoogleMaps';

export default class App extends Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div>
        {/*<Twitter />*/}
        <GoogleMaps />
      </div>
    )
  }
}
