import axios from 'axios';
import { ApiResponse } from '../interfaces/WeatherApiInterfaces';
import apiConfig from '../../api.config';

export default function weatherApiCall(): Promise<ApiResponse> {
  return new Promise((resolve) => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/onecall?lat=${apiConfig.lat}&lon=${apiConfig.lon}&units=imperial&exclude=minutely,hourly&appid=c5900390c56b55a778d99de6da1755bc`)
      .then((result) => {
        resolve(result.data);
      });
  });
}
