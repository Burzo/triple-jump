import { useReducer, useState } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { ActionKind, initialState, WeatherReducer } from './state/reducer'
import './index.scss'
import dayjs, { Dayjs } from 'dayjs'

export const Weather = () => {
  const [{ data, error }, dispatch] = useReducer(WeatherReducer, initialState)
  const [lastCall, setLastCall] = useState<null | Dayjs>(null)

  useInterval(() => {
    fetchWeather()
  }, 1000 * 60)

  const fetchWeather = () => {
    dispatch({ type: ActionKind.Start })
    fetch(
      'https://api.openweathermap.org/data/2.5/onecall?lat=36.7213&lon=-4.4213&appid=9a08abfe88016bf60119939f2d43276c&units=metric'
    )
      .then((res: Response) => res.json())
      .then((data: any) => {
        // console.log(data)
        dispatch({ type: ActionKind.Success, payload: data })
        setLastCall(dayjs())
      })
      .catch((e: any) => {
        dispatch({ type: ActionKind.Error, payload: e as Error })
      })
  }

  if (error && !data) return <div>{error.message}</div>

  if (!data) return null

  return (
    <div className="weather">
      <div className="row">
        {data.current.weather && data.current.weather.length > 0 && (
          <div className="container align-right">
            <div className="weather-now">
              <img
                className="weather-icon"
                alt="weather"
                src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
              />
              {data.current.weather[0].description}
            </div>
          </div>
        )}
        <div className="container">
          <div className="today">
            <div className="now">{data.current.temp} &#8451;</div>
            <div className="feels-now">
              Feels like: {data.current.feels_like} &#8451;
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container align-center">
          <div className="humidity">Humidity: {data.current.humidity}%</div>
        </div>
        <div className="container align-center">
          {' '}
          <div className="pressure">Pressure: {data.current.pressure} hPa</div>
        </div>
        <div className="container align-center">
          <div className="wind-speed">
            Sunset: {dayjs(data.current.sunset).format('HH:mm')}
          </div>
        </div>
        <div className="container align-center">
          {' '}
          <div className="wind-speed">Wind: {data.current.wind_speed} m/s</div>
        </div>
      </div>
      <div className="row">
        <div className="next-container">
          {data.daily.map((day: any, i: number) => {
            console.log(day)
            if (i < 7) {
              return (
                <div className="next-day">
                  <div>
                    <img
                      className="weather-icon"
                      alt="weather"
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    />
                  </div>
                  <div>
                    {dayjs()
                      .add(i + 1, 'day')
                      .format('ddd')}
                  </div>
                  <div>{Math.round(day.temp.day)} &#8451;</div>
                </div>
              )
            }
          })}
        </div>
      </div>
      <div className="row">
        <div className="container align-right">
          {lastCall && (
            <div className="last-updated">
              Last updated:
              <br />
              {lastCall?.format('DD. MMMM - HH:mm')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// clouds: 40
// dew_point: 11.31
// dt: 1648734483
// feels_like: 16.59
// humidity: 69
// pressure: 1007
// sunrise: 1648706712
// sunset: 1648751897
// temp: 17.03
// uvi: 3.54
// visibility: 10000
// weather:
//    description: "scattered clouds"
//    icon: "03d"
//    id: 802
//     main: "Clouds"
// wind_deg: 300
// wind_speed: 4.63
