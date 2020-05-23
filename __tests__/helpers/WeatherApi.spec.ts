import WeatherApi from '../../src/helpers/WeatherApi';
import mockData from '../mock-data/api-response.json';
import { ApiResponse } from '../../src/interfaces/WeatherApiInterfaces';

function loader(): Promise<ApiResponse> {
  return new Promise((resolve) => {
    resolve(mockData);
  });
}

let api: WeatherApi;
beforeEach(() => {
  api = new WeatherApi(loader);
});

it('gets the current weather data.', () => {
  expect.assertions(1);
  return api.fetch().then((response) => {
    expect(Object.keys(response)).toEqual(['today', 'followingDays']);
  });
});

it('has today\'s data', () => {
  expect.assertions(1);
  api.fetch().then((response) => {
    expect(Object.keys(response.today)).toEqual([
      'temp',
      'feelsLike',
      'windDirection',
      'windSpeed',
      'description',
    ]);
  });
});

it('has four extra days of info.', () => {
  expect.assertions(2);
  return api.fetch().then((response) => {
    expect(response.followingDays.length).toBe(4);

    const day1 = response.followingDays[0];
    expect(Object.keys(day1)).toEqual([
      'dayOfTheWeek',
      'temp',
      'description',
    ]);
  });
});

it('each day has the correct data.', () => {
  expect.assertions(1);
  return api.fetch().then((response) => {
    const day1 = response.followingDays[0];
    expect(Object.keys(day1)).toEqual([
      'dayOfTheWeek',
      'temp',
      'description',
    ]);
  });
});

it('converts the timestamp to a readable day of the week.', () => {
  expect.assertions(1);
  return api.fetch().then((response) => {
    const day1 = response.followingDays[0];
    const daysOfTheWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    expect(daysOfTheWeek.includes(day1.dayOfTheWeek)).toBeTruthy();
  });
});
