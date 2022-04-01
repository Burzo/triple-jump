import { useEffect, useReducer } from 'react'
import { ActionKind, initialState, NewsReducer } from './state/reducer'
import './index.scss'
import _ from 'underscore'

export const News = () => {
  const [{ data, error }, dispatch] = useReducer(NewsReducer, initialState)

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
        console.log(JSON.stringify(e))
        // dispatch({ type: ActionKind.Error, payload: e as Error })
      })
  }

  if (error && !data) return <div>{error.message}</div>

  if (!data) return null

  // const articles: any[] = _.sample(data.articles, 2)
  const articles: any[] = [
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title: "Canada's Supreme Court upholds C$9m fine on maple syrup thief",
      description:
        'Nearly 3,000 tonnes of maple syrup was stolen in the so-called Great Canadian Maple Syrup Heist.',
      url: 'http://www.bbc.co.uk/news/world-us-canada-60947470',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/147FE/production/_123966938_syrup.jpg',
      publishedAt: '2022-03-31T18:22:22.8789396Z',
      content:
        "Image source, Getty Images\r\nCanada's top court has imposed a C$9.1m ($7.3m; £5.5m) fine on a man behind one of the country's stickiest crimes - the theft of 3,000 tonnes of maple syrup.\r\nThe so-calle… [+1591 chars]",
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title: 'Oil prices drop as Biden considers releasing reserves',
      description:
        'The potential move could be the largest release of oil reserves in US history.',
      url: 'http://www.bbc.co.uk/news/business-60936468',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/121BF/production/_123957147_gettyimages-1236600189.jpg',
      publishedAt: '2022-03-31T14:52:21.222094Z',
      content:
        'Image source, Getty Images\r\nOil prices have fallen sharply after reports that the US is set to take new steps to bring down high fuel costs.\r\nThe Biden administration is reportedly considering the re… [+3324 chars]',
    },
  ]

  return (
    <div className="news">
      {data &&
        articles.map((article: any, i: number) => {
          return (
            <div className="article" key={i}>
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
