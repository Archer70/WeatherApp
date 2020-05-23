import moment from 'moment';
import {
  LoaderFunction,
  ApiResponse,
  PrettyResponse,
  ApiResponseCurrent,
  ApiResponseDaily,
} from '../interfaces/WeatherApiInterfaces';
import weatherApiCall from './weather-api-call';

export default class WeatherApi {
  private readonly loaderFunction: LoaderFunction;

  constructor(loaderFunction: LoaderFunction = weatherApiCall) {
    this.loaderFunction = loaderFunction;
  }

  // Take "current" and "daily" from the weather API and turn it into something more pretty.
  public async fetch(): Promise<PrettyResponse> {
    const { current, daily }: ApiResponse = await this.loaderFunction();
    return this.formatPrettyResponse(current, this.getNextDaysFromApi(daily));
  }

  // Return the following four days.
  private getNextDaysFromApi(nextDays: ApiResponseDaily[]): ApiResponseDaily[] {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
    return nextDays.filter((day, index) => [1, 2, 3, 4].includes(index));
  }

  private formatPrettyResponse(today: ApiResponseCurrent, nextDays: ApiResponseDaily[]): PrettyResponse {
    return {
      today: {
        temp: today.temp,
        feelsLike: today.feels_like,
        windDirection: today.wind_deg,
        windSpeed: today.wind_speed,
        description: today.weather[0].main,
      },
      followingDays: nextDays.map((day) => ({
        dayOfTheWeek: moment.unix(day.dt).format('dddd'),
        temp: {
          am: day.temp.morn,
          pm: day.temp.eve,
        },
        description: day.weather[0].main,
      })),
    };
  }
}
