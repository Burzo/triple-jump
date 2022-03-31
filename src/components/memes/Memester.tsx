import { useReducer } from 'react'
import { useInterval } from '../../hooks/useInterval'
import reducer, { ActionKind, initialState } from './state/reducer'

export const Mimster = () => {
  const [{ data, loading, error }, dispatch] = useReducer(reducer, initialState)

  useInterval(() => {
    fetchMeme()
  }, 30000)

  const fetchMeme = () => {
    dispatch({ type: ActionKind.Start })
    fetch('https://meme-api.herokuapp.com/gimme')
      .then((res: Response) => res.json())
      .then((data: any) => {
        if (data.url.includes('.gif') || data.nsfw) {
          console.log('Is either NSFW or a gif.')
          fetchMeme()
          return
        }
        dispatch({ type: ActionKind.Success, payload: data })
      })
      .catch((e: any) => {
        dispatch({ type: ActionKind.Error, payload: e as Error })
      })
  }
  if (loading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  return <img alt="Meme image" src={data.url} />
}
