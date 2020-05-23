import React from 'react';
import { Text } from 'react-native';
import { PrettyResponse } from '../interfaces/WeatherApiInterfaces';
import { DEGREE_CHARACTER } from '../constants/special-chars';

import Table from '../components/Table';
import Row from '../components/Row';
import Cell from '../components/Cell';

interface Props {
  weatherData: PrettyResponse,
}

export default function TodaysWeather(props: Props): JSX.Element {
  const { feelsLike, windDirection, windSpeed } = props.weatherData.today;
  return (
    <Table>
      <Row>
        <Cell>
          <Text>Feels Like</Text>
        </Cell>
        <Cell>
          <Text>{Math.round(feelsLike) + DEGREE_CHARACTER}</Text>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Text>Wind</Text>
        </Cell>
        <Cell>
          <Text>{`${windDirection}${DEGREE_CHARACTER} / ${Math.round(windSpeed)}mph`}</Text>
        </Cell>
      </Row>
    </Table>
  );
}
