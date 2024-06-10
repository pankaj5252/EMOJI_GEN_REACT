import React, { Component } from "react";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Pune",
      weatherData: null,
    };
  }

  apikey = "8db2e95868eb5ff794cd374d9124ca67";

  convertion(val) {
    return (val - 273.15).toFixed(2);
  }

  getValue = (e) => {
    this.setState({ city: e.target.value });
  };

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log("Before Update", prevState.weatherData);
  //   return null;
  // }

  // componentDidUpdate() {
  //   console.log("Updated Value", this.state.weatherData);
  // }

  componentDidMount() {
    this.fetchWeatherData(this.state.city);
  }

  fetchWeatherData = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          weatherData: {
            city: data.name,
            description: data.weather[0].description,
            temperature: this.convertion(data.main.temp),
            wind: data.wind.speed,
          },
        });
      })
      .catch(() => {
        console.error("There has been a problem with your fetch operation");
      });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.fetchWeatherData(this.state.city);
  };

  render() {
    const { weatherData } = this.state;

    return (
      <>
        <div className="container">
          <div className="row p-2">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="card p-3 mt-2 shadow" style={{ width: "28rem" }}>
                <h1 className="text-center">Weather App</h1>
                <form onSubmit={this.submitForm}>
                  <input
                    type="text"
                    placeholder="Enter City Name"
                    className="form-control"
                    onChange={this.getValue}
                  />
                  <div className="text-center">
                    <button type="submit" className="btn btn-dark mt-2">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="card p-3 mt-5 shadow w-100 bg-light text-dark text-center">
                <h2 className="text-center">Weather Details</h2>
                {weatherData ? (
                  <>
                    <p className="fs-4">
                      City Name:{" "}
                      <b id="city" className="text-warning">
                        {weatherData.city}
                      </b>
                    </p>
                    <p className="fs-4">
                      Description:{" "}
                      <b id="descrip" className="text-warning">
                        {weatherData.description}
                      </b>
                    </p>
                    <p className="fs-4">
                      Temperature:{" "}
                      <b id="temp" className="text-warning">
                        {weatherData.temperature}°C
                      </b>
                    </p>
                    <p className="fs-4">
                      Wind:{" "}
                      <b id="wind" className="text-warning">
                        {weatherData.wind} m/s
                      </b>
                    </p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;