import React from 'react';
import Panel from 'muicss/lib/react/panel';


export default class WeatherList extends React.Component {

    render() {

        return (
            <Panel>

                {this.props.city} {this.props.country} <br />
                {this.props.weather} <br />
            
            </Panel>
        );
    }
}