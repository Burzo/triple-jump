import React, { useState } from 'react'
import { Mimster } from './components/memes/Memester'
import { News } from './components/news/News'
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

  return (
    <div className="app">
      {i % 5 ? <Mimster /> : weather ? <Weather /> : <News />}
    </div>
  )
}

export default App
