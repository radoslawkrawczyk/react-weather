import React, {
  Component
} from 'react';
import {
  Appbar,
  Button,
  Container,
  Input,
  Divider,
  Form
} from 'muicss/react';
import WeatherList from './WeatherList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: '',
      tempCity: 'Warsaw',
      country: ''

    };

    console.log(this.state.tempCity);

    this.timingInfo = props.timingInfo;
    let localTiming = localStorage.getItem('timing');
    this.apiKey = '562033bdec58432a878196f58df030ef';
    if (localTiming != null) {
      this.setState({
        timing: localTiming
      });
    } else {
      this.setState({
        timing: 0
      });

    }

    this.checkCity = this.checkCity.bind(this);
    this.checkWeather = this.checkWeather.bind(this);
  }

  checkCity(e) {
    console.log(this.state.tempCity);

    this.setState({
      tempCity: e.target.value
    });

  }

  checkWeather(e) {
    e.preventDefault();

    let currentTime = Math.floor(Date.now() / 1000);
    console.log(this.state.tempCity);
    if (this.state.tempCity !== undefined) {
      if (this.state.timing === 0 || localStorage.getItem('timing') < currentTime) {
        this.setState({
          timing: localStorage.getItem('timing')
        });
        localStorage.setItem('timing', currentTime + 75);

        fetch(`http://api.weatherbit.io/v2.0/current?city=${this.state.tempCity}&key=` + this.apiKey, {
          method: 'get'
        }).then(resp => resp.json()).then(resp => {
          this.setState({
            city: resp.data[0].city_name,
            weather: resp.data[0].temp + " ℃",
            country: resp.data[0].country_code
          });
          localStorage.setItem('current_value', resp.data[0].city_name + "|" + resp.data[0].temp + "|" + resp.data[0].country_code);
        });
      }
      if (localStorage.getItem('timing') > currentTime) {
        let sec = localStorage.getItem('timing') - currentTime;
        this.timingInfo = (sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + sec + " minutes left";
        let currentValues = localStorage.getItem('current_value');
        if (currentValues) {
          currentValues = currentValues.split("|");
          this.setState({
            city: currentValues[0],
            weather: currentValues[1] + " ℃",
            country: currentValues[2]
          });
        }
      }
    }

  }

  render() {

    return (
      <div>
        <Appbar>
          <Container>
            <h1>Weather</h1>
          </Container>
        </Appbar>
        <Container>
          <Form>
            <Input placeholder="Type your city" defaultValue="Warsaw" floatingLabel={true} onChange={this.checkCity} name="cityInput" />
            <Button color="primary" type="submit" onClick={this.checkWeather} >Check</Button>
          </Form>
          <Divider />
          <span timing={this.state.timing}>
             {this.timingInfo}
          </span>
          <WeatherList city={this.state.city} weather={this.state.weather} country={this.state.country} />
        </Container>
      </div>
    );
  }
}

export default App;