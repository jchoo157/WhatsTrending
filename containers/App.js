import React, {Component} from 'react';
import GoogleMaps from './GoogleMaps';

export default class App extends Component {
    render () {
        return (
          <div>
            <h1>Title in App container</h1>
            <GoogleMaps />
          </div>
        )
    }
}