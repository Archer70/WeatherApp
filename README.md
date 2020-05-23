# Weather App

A quick, example weather app using Expo.

## Installation
First install dependencies by running:
```shell script
yarn
```

Then run the project with:
```shell script
yarn start
```

Once started, it should open a browser window with instructions to open the app in an emulator or physical device.

**Warning**  
Occasionally, clicking "Run on X emulator" will result in a message on the device saying "Expo has stopped."
If this happens, please try again.
It usually works the second time.

Tested with Android Studio on the following platform:
- Linux (Manjaro, but should be the same on Ubuntu)
- Emulated "Galaxy Nexus" phone
- Android 10.0

## Other Scripts

Run the tests:
```shell script
yarn test
```

**Note:**
The tests use mock API data located at `__tests__/mock-data/api-response.json`

Check for code style inconsistencies:
```shell script
yarn lint
```

## Design Decisions

#### The Important Part  
`src/helpers/WeatherApi.ts`  
`src/interfaces/WeatherApiInterfaces.ts`

OpenWeather's API provides a lot of information not necessary to the app, so I used a Facade-ish pattern to narrow the data structure down to just what we actually need.
This has the added benefit of letting the rest of the application rely on a data structure that we specify, instead of what someone else gives us.
In doing so, we are more guarded against upstream API changes, in that any changes could be dealt with by updating our interface, rather than making data changes across the entire code-base.

Additionally, the WeatherApi object has a single `.fetch()` method that returns a promise with the returned data.
This is preferable to slapping an API call directly in the template code, just from a cleanliness standpoint.

I did not include API/network error handling, because it's not necessary for this non-production app.
If this were a "real" application, I would have included better error handling.

#### UI

**App.tsx**  
Typically, I like the keep the main component clean of much logic and template code. In this case, it does a few things.
- Calls the API on component load.
- While waiting for the data to return from the API, it shows the "Loading" state.
- After the data is loaded, it shows the "App" state.

I could've extracted "App" and "Loading" states into their own component files, but I figured that would be over-engineering, and would add little value.
Putting them in separate instance methods and using a single ternary in `.render()` is, in my opinion, easy enough to follow.

**Layout Components**  
`src/layout/Heading.tsx`  
`src/layout/TodaysWeather.tsx`   
`src/layout/Forecast.tsx`

Looking at the app mockup, I saw the layout in three sections.
- A top section containing the location, weather conditions, and temperature.
- A "current conditions" section with temperature and wind conditions.
- A "forecast" section detailing the conditions for the next four days.

As such, those three sections each got their own component files for presenting their data.

Each of those components receives the returned API data via a `weatherData` prop.
In my opinion, it  would be overkill to add the API data to a more sophisticated state management solution, like React's "Context", or "Redux".
If the sections had nested components that needed to access the data, this decision would be worth reconsidering.  

**Table Components**  
`src/components/Table.tsx`  
`src/components/Row.tsx`  
`src/components/Cell.tsx`

These components are the result of my realization that a table-like structure would need to be used across more than one component, so some kind of abstraction would be necessary.
My first thought was to share a stylesheet, and apply styles to `<View>` components, but ultimately I went with custom components, because `<Cell>` looks nicer than `<View style={tableStyles.cell}>` in my opinion.

#### Problems and Tradeoffs

**Incomplete API Data**

In using the "One Call API", I noticed that the weather description, such as "Sunny," was ultimately only available once per day, whereas the mockup has two description updates per day.

It is possible that, since the daily weather description is delivered in an array, there _could_ be more than one per day, but none of my tests showed that to be true.
Additionally, even if there were more than one weather update per day, the update objects do not contain any form of time stamp, so there is no way to determine if that weather update is for morning or afternoon.

Exmaple:
```json
{
  "daily": [
    {
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ]
    }
  ]
}
```