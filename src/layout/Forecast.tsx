import React from 'react';
import { Text, View } from 'react-native';
import { PrettyResponse, PrettyResponseFollowingDay } from '../interfaces/WeatherApiInterfaces';
import { DEGREE_CHARACTER } from '../constants/special-chars';

import Table from '../components/Table';
import Row from '../components/Row';
import Cell from '../components/Cell';
import styles from '../styles/forecast';

interface Props {
  weatherData: PrettyResponse;
}

interface DayProps {
  day: PrettyResponseFollowingDay;
}

export default function Forecast(props: Props) {
  const { followingDays } = props.weatherData;
  const rows = followingDays.map((day) => <Day key={day.dayOfTheWeek} day={day} />);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forecast:</Text>
      <Table>
        {rows}
      </Table>
    </View>
  );
}

function Day(props: DayProps): JSX.Element {
  const { dayOfTheWeek, description, temp } = props.day;
  return (
    <Row>
      <Cell>
        <Text>{dayOfTheWeek}</Text>
      </Cell>
      <Cell>
        <Text>AM</Text>
        <Text>PM</Text>
      </Cell>
      <Cell>
        <Text>{Math.round(temp.am) + DEGREE_CHARACTER}</Text>
        <Text>{Math.round(temp.pm) + DEGREE_CHARACTER}</Text>
      </Cell>
      <Cell>
        <Text>{description}</Text>
      </Cell>
    </Row>
  );
}
