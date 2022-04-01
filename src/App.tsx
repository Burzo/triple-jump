import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Mimster } from './components/memes/Memester'
import { Weather } from './components/weather/Weather'
import { useInterval } from './hooks/useInterval'
import './index.scss'

function App() {
  const [i, setI] = useState(1)
  const [weather, setWeather] = useState(false)

  useInterval(() => {
    setI((prev: number) => {
      if (i > 10000000) {
        return 1
      }

      return prev + 1
    })
  }, 20000)

  useInterval(() => {
    setWeather((prev: boolean) => !prev)
  }, 30000)

  const newsURL = `https://static01.nyt.com/images/${dayjs().format(
    'YYYY/MM/DD'
  )}/nytfrontpage/INYT_frontpage_global.20220401.pdf`

  return (
    <div className="app">
      {i % 5 ? (
        <Mimster />
      ) : weather ? (
        <Weather />
      ) : (
        <iframe
          title="News"
          src={newsURL}
          width={window.innerWidth}
          height={window.innerHeight}
          frameBorder={0}
        />
      )}
    </div>
  )
}

export default App
