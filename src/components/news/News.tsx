import { useReducer } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { ActionKind, initialState, MemeReducer } from './state/reducer'
import './index.scss'

export const News = () => {
  const [{ data, error }, dispatch] = useReducer(MemeReducer, initialState)

  useInterval(() => {
    fetchNews()
  }, 1000 * 10)

  const fetchNews = () => {
    dispatch({ type: ActionKind.Start })
    fetch(
      'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=03aaa428fcec4d9992577a3b8fa8426d'
    )
      .then((res: Response) => res.json())
      .then((data: any) => {
        console.log(data)

        dispatch({ type: ActionKind.Success, payload: data })
      })
      .catch((e: any) => {
        dispatch({ type: ActionKind.Error, payload: e as Error })
      })
  }

  if (error && !data) return <div>{error.message}</div>

  if (!data) return null

  return (
    <div className="news">
      {data &&
        data.articles.map((article: any, i: number) => {
          if (i > 1) return null

          return (
            <div className="article">
              <div>
                <div className="title">{article.title}</div>
                <div className="content">
                  <div className="news-image">
                    <img
                      className="image"
                      alt="news"
                      src={article.urlToImage}
                    />
                  </div>
                  <div className="description">{article.description}</div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
