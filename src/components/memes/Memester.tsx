import { useReducer } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { ActionKind, initialState, MemeReducer } from './state/reducer'

export const Mimster = () => {
  const [{ data, error }, dispatch] = useReducer(MemeReducer, initialState)

  const urlSearchParams = new URLSearchParams(window.location.search)

  const SUBS: string[] = []

  const interval = urlSearchParams.get('interval')
  const nsfw = urlSearchParams.get('nsfw')
  const nogif = urlSearchParams.get('nogif')
  const allgif = urlSearchParams.get('allgif')
  const subreddits = urlSearchParams.get('subreddits')

  subreddits &&
    subreddits.split(',').forEach((sub) => {
      SUBS.push(sub)
    })

  const randomSub = (subs: string[]) => {
    return subs[Math.floor(Math.random() * subs.length)]
  }

  useInterval(() => {
    fetchMeme()
  }, 1000 * (interval ? parseInt(interval) : 30))

  const fetchMeme = () => {
    dispatch({ type: ActionKind.Start })
    fetch(`https://meme-api.herokuapp.com/gimme/${randomSub(SUBS)}`)
      .then((res: Response) => res.json())
      .then((data: any) => {
        if (
          (data.nsfw && nsfw) ||
          (nogif && data.url.includes('.gif')) ||
          (allgif && !data.url.includes('.gif'))
        ) {
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

  if (!data || SUBS.length <= 0) return null

  return (
    <div className="image-container">
      {data && (
        <img
          style={{ height: window.innerHeight }}
          alt="Just a meme"
          src={data.url}
        />
      )}
      {nsfw && <div className="nsfw">NSFW ON</div>}
      {data && <div className="subreddit">{data.subreddit}</div>}
    </div>
  )
}
