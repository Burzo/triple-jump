import { useReducer } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { ActionKind, initialState, MemeReducer } from './state/reducer'

export const Mimster = () => {
  const [{ data, error }, dispatch] = useReducer(MemeReducer, initialState)

  useInterval(() => {
    fetchMeme()
  }, 1000 * 10)

  const fetchMeme = () => {
    dispatch({ type: ActionKind.Start })
    fetch('https://meme-api.herokuapp.com/gimme')
      .then((res: Response) => res.json())
      .then((data: any) => {
        if (data.url.includes('.gif') || data.nsfw) {
          fetchMeme()
          return
        }
        dispatch({ type: ActionKind.Success, payload: data })
      })
      .catch((e: any) => {
        dispatch({ type: ActionKind.Error, payload: e as Error })
      })
  }

  if (error && !data) return <div>{error.message}</div>

  if (!data) return null

  return (
    <div className="image-container">
      {data && (
        <img
          style={{ height: window.innerHeight }}
          alt="Just a meme"
          src={data.url}
        />
      )}
    </div>
  )
}
