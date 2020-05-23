import React from 'react';
import { Text, View } from 'react-native';
import apiConfig from '../../api.config';
import { DEGREE_CHARACTER } from '../constants/special-chars';
import { PrettyResponse } from '../interfaces/WeatherApiInterfaces';
import styles from '../styles/heading';

interface Props {
  weatherData: PrettyResponse;
}

export default function Heading(props: Props) {
  const { description, temp } = props.weatherData.today;
  return (
    <View>
      <Text style={styles.cityName}>
        {apiConfig.cityName}
      </Text>
      <Text style={styles.currentWeatherDescription}>
        {description}
      </Text>
      <Text style={styles.currentTemperature}>
        {`${Math.round(temp)}${DEGREE_CHARACTER}`}
      </Text>
    </View>
  );
}
