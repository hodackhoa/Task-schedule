import { Map, GoogleApiWrapper } from 'google-maps-react'
import React from 'react';


export class MapContainer extends React.Component{
    render() {
        const mapStyles = {
                width: '50%',
                height: '50%',
            };
      return (
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
          />
      );
    }
}
export default GoogleApiWrapper({
  apiKey: 'TOKEN HERE'
})(MapContainer);