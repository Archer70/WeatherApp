export interface LoaderFunction {
  (): Promise<ApiResponse>
}

export interface PrettyResponseToday {
  temp: number;
  feelsLike: number;
  windDirection: number;
  windSpeed: number;
  description: string;
}

export interface PrettyResponseFollowingDay {
  dayOfTheWeek: string;
  temp: {
    am: number;
    pm: number;
  };
  description: string;
}

export interface PrettyResponse {
  today: PrettyResponseToday;
  followingDays: PrettyResponseFollowingDay[],
}

/* eslint-disable camelcase */
export interface ApiResponseCurrent {
  temp: number;
  feels_like: number;
  wind_deg: number;
  wind_speed: number;
  weather: {
    main: string;
  }[];
}

export interface ApiResponseDaily {
  dt: number;
  temp: {
    morn: number;
    eve: number;
  };
  weather: {
    main: string;
  }[];
}

export interface ApiResponse {
  current: ApiResponseCurrent;
  daily: ApiResponseDaily[];
}
