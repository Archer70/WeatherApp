import React from 'react';
import { View, Text } from 'react-native';

import WeatherApi from './src/helpers/WeatherApi';

import Heading from './src/layout/Heading';
import TodaysWeather from './src/layout/TodaysWeather';
import Forecast from './src/layout/Forecast';

import styles from './src/styles/app';

export default class App extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      weatherData: {},
      loaded: false,
    };
  }

  componentDidMount() {
    const api = new WeatherApi();
    api.fetch().then((weatherData) => {
      this.setState({ weatherData, loaded: true });
    });
  }

  private app(): JSX.Element {
    return (
      <View style={styles.container}>
        <Heading weatherData={this.state.weatherData} />
        <TodaysWeather weatherData={this.state.weatherData} />
        <Forecast weatherData={this.state.weatherData} />
      </View>
    );
  }

  private appLoading(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  render() {
    return this.state.loaded
      ? this.app()
      : this.appLoading();
  }
}
