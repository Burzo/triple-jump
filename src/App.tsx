import React, { useState } from 'react'
import { Mimster } from './components/memes/Memester'
import { News } from './components/news/News'
import { Weather } from './components/weather/Weather'
import { useInterval } from './hooks/useInterval'
import './index.scss'

function App() {
  const [i, setI] = useState(2)

  useInterval(() => {
    setI((prev: number) => {
      if (prev >= 3) {
        return 1
      }

      return prev + 1
    })
  }, 20000)

  switch (i) {
    case 1:
      return (
        <div className="app">
          <Mimster />
        </div>
      )
    case 2:
      return (
        <div className="app">
          <Weather />
        </div>
      )
    case 3:
      return (
        <div className="app">
          <News />
        </div>
      )
    default:
      return (
        <div className="app">
          <Mimster />
        </div>
      )
  }
}

export default App
