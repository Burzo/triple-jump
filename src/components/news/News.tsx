import { useEffect, useReducer } from 'react'
import { useInterval } from '../../hooks/useInterval'
import { ActionKind, initialState, MemeReducer } from './state/reducer'
import './index.scss'
import _ from 'underscore'

export const News = () => {
  const [{ data, error }, dispatch] = useReducer(MemeReducer, initialState)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = () => {
    dispatch({ type: ActionKind.Start })
    fetch(
      'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=03aaa428fcec4d9992577a3b8fa8426d'
    )
      .then((res: Response) => res.json())
      .then((data: any) => {
        dispatch({ type: ActionKind.Success, payload: data })
      })
      .catch((e: any) => {
        dispatch({ type: ActionKind.Error, payload: e as Error })
      })
  }

  if (error && !data) return <div>{error.message}</div>

  if (!data) return null

  const articles: any[] = _.sample(data.articles, 2)

  return (
    <div className="news">
      {data &&
        articles.map((article: any, i: number) => {
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
