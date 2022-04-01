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
        console.log(data)
        dispatch({ type: ActionKind.Success, payload: data })
      })
      .catch((e: any) => {
        console.log(JSON.stringify(e))
        // dispatch({ type: ActionKind.Error, payload: e as Error })
      })
  }

  if (error && !data) return <div>{error.message}</div>

  // if (!data) return null

  const samples: any[] = [
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title: 'Patrick Demarchelier: Fashion photographer dies aged 78',
      description:
        'He photographed famous figures including Princess Diana, Beyonce, Madonna and Jennifer Lopez.',
      url: 'http://www.bbc.co.uk/news/entertainment-arts-60952353',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/3419/production/_123973331_gettyimages-487472880.jpg',
      publishedAt: '2022-04-01T09:52:27.2220993Z',
      content:
        'Image source, Getty Images\r\nImage caption, Patrick Demarchelier in front of some of his photos\r\nPatrick Demarchelier, who photographed famous figures including Princess Diana, Beyonce, Madonna and Je… [+2715 chars]',
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title: 'Energy price: Bill shock for millions as rises hit',
      description:
        'A host of essential bills - dominated by energy - are rising from now with warnings of more to come.',
      url: 'http://www.bbc.co.uk/news/business-60943192',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/5519/production/_123958712_3_energy_prices_getty.jpg',
      publishedAt: '2022-04-01T08:52:21.9103965Z',
      content:
        'By Kevin PeacheyPersonal finance correspondent, BBC News\r\nImage source, Getty Images\r\nMillions of people will now feel the impact of an unprecedented £700-a-year rise in energy costs - at the same ti… [+6952 chars]',
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title:
        'Will Smith: Police were ready to arrest star during Oscars, producer says',
      description:
        "The ceremony's producer describes the conversation between Chris Rock and officers about Will Smith.",
      url: 'http://www.bbc.co.uk/news/entertainment-arts-60952217',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/CAD7/production/_123972915_gettyimages-1239560026.jpg',
      publishedAt: '2022-04-01T08:37:25.1910349Z',
      content:
        'Image source, Getty Images\r\nImage caption, Oscars producer Will Packer (left) with Chris Rock backstage during the Oscars\r\nPolice were ready to arrest Will Smith at the Oscars after the actor slapped… [+2815 chars]',
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title: 'War in Ukraine: Russia accuses Ukraine of attacking oil depot',
      description:
        'Russia claims a Ukrainian helicopter raid set fuel tanks ablaze in Belgorod, a Russian city.',
      url: 'http://www.bbc.co.uk/news/world-europe-60952125',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/13067/production/_123972977_mediaitem123972976.jpg',
      publishedAt: '2022-04-01T08:37:22.9884579Z',
      content:
        'Image source, Russian Emergencies Ministry\r\nImage caption, The Russian Emergencies Ministry posted video showing a massive blaze at the oil depot\r\nAn oil storage depot is on fire in a Russian city ju… [+1347 chars]',
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title:
        'Ukraine war: Gruesome evidence points to war crimes on road outside Kyiv',
      description:
        'The BBC finds the charred remains of civilians on a highway where Russian troops had stationed tanks.',
      url: 'http://www.bbc.co.uk/news/world-europe-60949791',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/12F8B/production/_123970777_blurredgraphicdead6.jpg',
      publishedAt: '2022-04-01T06:37:21.2063699Z',
      content:
        'Image source, Jeremy Bowen\r\nImage caption, Corpses and burned out cars litter this stretch of the E-40 highway\r\nFootage of Russian troops shooting a man with his hands up on a highway outside Kyiv at… [+7698 chars]',
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title:
        'Police find five foetuses at the home of US anti-abortion activist',
      description:
        'Foetuses have been discovered in a Washington DC home reportedly belonging to activist Lauren Handy.',
      url: 'http://www.bbc.co.uk/news/world-us-canada-60950016',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/C54B/production/_123970505_mediaitem123970501.jpg',
      publishedAt: '2022-04-01T03:07:20.473264Z',
      content:
        'Image caption, Lauren Handy, left, is a leader of the Progressive Anti-Abortion Uprising\r\nFive foetuses have been discovered in a Washington home reportedly belonging to an anti-abortion activist, po… [+2083 chars]',
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'BBC News',
      title: 'Ex-hostage recounts ordeal at trial of Islamic State jihadist',
      description:
        'An Italian aid worker says he was beaten and given dog names by his Islamic State captors in Syria.',
      url: 'http://www.bbc.co.uk/news/world-us-canada-60881825',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/15816/production/_123968088_elshafeeelsheikh.jpg',
      publishedAt: '2022-03-31T19:37:23.5170327Z',
      content:
        'Image caption, \r\nA former hostage has testified in a US court that he was subject to beatings and given dog names by his Islamic State captors.\r\nFederico Motka, an Italian aid worker, was one of doze… [+3542 chars]',
    },
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
      title: 'Ukraine war: Russian forces regrouping for attack - Nato',
      description:
        "Nato's statement comes after Russia said it would 'radically' reduce its military activity around the capital Kyiv.",
      url: 'http://www.bbc.co.uk/news/world-europe-60945068',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/81A2/production/_123968133_gettyimages-1388627449.jpg',
      publishedAt: '2022-03-31T18:07:20.644364Z',
      content:
        'Image source, Getty Images\r\nImage caption, A man rides past a destroyed Russian tank in Trostyanets, north-east Ukraine\r\nRussian forces in Ukraine are regrouping to double down on their attacks in th… [+2494 chars]',
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

  const articles: any[] = _.sample(samples, 2)

  return (
    <div className="news">
      {articles.map((article: any, i: number) => {
        return (
          <div className="article" key={i}>
            <div>
              <div className="title">{article.title}</div>
              <div className="content">
                <div className="news-image">
                  <img className="image" alt="news" src={article.urlToImage} />
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
