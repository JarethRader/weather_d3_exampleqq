import React, { Component } from "react";
import "./App.css";
import {
  Container,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DarkSkyApi from "dark-sky-api";
import selectCity from "./utils/selectCity";
import TempChart from "./utils/TempChart";
import WindChart from "./utils/WindChart";
import HumidChart from "./utils/HumidChart";

class App extends Component {
  state = {
    selectOpen: false,
    dropdownOpen: false,
    city: {},
    weather: {},
    catagory: "Temperature",
    showTemp: true,
    showHumid: false,
    ShowWind: false
  };

  componentDidMount() {
    DarkSkyApi.apiKey = "fed8f9989c1881941c125ea8afbb93b7";
    this.setState(
      {
        city: { name: "Shanghai", latitude: 31.230391, longitude: 121.473701 }
      },
      () => {
        this.loadWeatherData();
      }
    );
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  toggleSelect = () => {
    this.setState({ selectOpen: !this.state.selectOpen });
  };

  handleClick = id => {
    let city = selectCity(id);
    this.setState({ city: city.city }, () => {
      this.loadWeatherData();
    });
  };

  handleSelect = id => {
    return new Promise((resolve, reject) => {
      switch (id) {
        case 1:
          this.setState({
            catagory: "Humidity",
            showTemp: false,
            showHumid: true,
            ShowWind: false
          });
          return resolve();
        case 2:
          this.setState({
            catagory: "Wind Speed",
            showTemp: false,
            showHumid: false,
            ShowWind: true
          });
          return resolve();
        default:
          this.setState({
            catagory: "Temperature",
            showTemp: true,
            showHumid: false,
            ShowWind: false
          });
          return resolve();
      }
    }).catch(err => {
      return;
    });
  };

  loadWeatherData = () => {
    const position = {
      latitude: this.state.city.latitude,
      longitude: this.state.city.longitude
    };
    DarkSkyApi.extendHourly(true);
    DarkSkyApi.loadForecast(position).then(res => {
      this.setState({ weather: res }, () => {});
    });
  };

  render() {
    let { name } = this.state.city;
    return (
      <div className="App">
        <Container>
          <h1 style={{ paddingTop: "2rem", fontSize: "2rem" }}>
            Weather Forecast
          </h1>
          <hr className="my-2" />
          <div>
            <Row>
              <Col>
                <b style={{ padding: "1rem" }}>Select a City</b>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropdown}
                >
                  <DropdownToggle caret>{name}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.handleClick(0)}>
                      Mumbai
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(1)}>
                      Tianjin
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(2)}>
                      Manila
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(3)}>
                      Moscow
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(4)}>
                      Tokyo
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(5)}>
                      Dhaka
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(6)}>
                      Istanbul
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(7)}>
                      Karachi
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(8)}>
                      Beijing
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleClick(9)}>
                      Shanghai
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
              <Col>
                <b style={{ padding: "1rem" }}>Select a Catagory</b>
                <ButtonDropdown
                  isOpen={this.state.selectOpen}
                  toggle={this.toggleSelect}
                >
                  <DropdownToggle caret>{this.state.catagory}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() =>
                        this.handleSelect(0).then(res => this.forceUpdate())
                      }
                    >
                      Temperature
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        this.handleSelect(1).then(res => this.forceUpdate())
                      }
                    >
                      Humidity
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        this.handleSelect(2).then(res => this.forceUpdate())
                      }
                    >
                      Wind Speed
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </Row>
          </div>
          <div>
            {this.state.showTemp ? (
              <TempChart data={this.state.weather.daily} />
            ) : null}
            {this.state.ShowWind ? (
              <WindChart data={this.state.weather.daily} />
            ) : null}
            {this.state.showHumid ? (
              <HumidChart data={this.state.weather.daily} />
            ) : null}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
