import React, { useState } from "react"
import { graphql } from "gatsby"
import { chunk } from "lodash"
import { Helmet } from "react-helmet"

import "../styles/common.scss"

function IndexPage(props) {
  const players = props.data.players.nodes
  const [activePlayers, setActivePlayers] = useState([])
  const [isFakeLoading, setIsFakeLoading] = useState(false)
  const [teams, setTeams] = useState()

  function handlePlayerSelect(e, id) {
    if (e.target.checked) {
      setActivePlayers([...activePlayers, players.find(item => item.id === id)])
    } else {
      setActivePlayers([...activePlayers.filter(item => item.id !== id)])
    }
  }

  function shuffleTeams() {
    if (activePlayers.length % 2 !== 0) {
      alert("Нечетное количество игроков")
    } else {
      function shuffle(array) {
        let counter = array.length

        // While there are elements in the array
        while (counter > 0) {
          // Pick a random index
          let index = Math.floor(Math.random() * counter)

          // Decrease counter by 1
          counter--

          // And swap the last element with it
          let temp = array[counter]
          array[counter] = array[index]
          array[index] = temp
        }

        return array
      }

      const shuffledPlayers = shuffle(activePlayers)
      setTeams(chunk(shuffledPlayers, 2))
      setIsFakeLoading(true)
      setTimeout(() => setIsFakeLoading(false), 2000)
    }
  }

  return (
    <>
      <Helmet title="Vigbo Football Manager"></Helmet>
      <div className="container">
        {!teams && (
          <>
            <div className="players">
              {players.map(item => (
                <label key={item.id} className="player">
                  <img src={item.photo.url} alt="" className="photo"></img>
                  <h1 className="name">{item.name}</h1>
                  <h2 className="nickname">{item.nickname}</h2>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={e => handlePlayerSelect(e, item.id)}
                  ></input>
                </label>
              ))}
            </div>
            <button onClick={shuffleTeams} className="shuffle">
              РАЗБИТЬ НА КОМАНДЫ
            </button>
          </>
        )}

        {teams &&
          !isFakeLoading &&
          teams.map((item, idx) => (
            <div key={idx} className="teams">
              <div className="player">
                <h1 className="status">ВОРОТЧИК</h1>
                <img src={item[0].photo.url} alt="" className="photo"></img>
                <h1 className="name">{item[0].name}</h1>
                <h2 className="nickname">{item[0].nickname}</h2>
              </div>
              <div className="player">
                <h1 className="status">НАПАДАЛЬЩИК</h1>
                <img src={item[1].photo.url} alt="" className="photo"></img>
                <h1 className="name">{item[1].name}</h1>
                <h2 className="nickname">{item[1].nickname}</h2>
              </div>
            </div>
          ))}

        {isFakeLoading && (
          <img
            src="https://i2.wp.com/static.onemansblog.com/wp-content/uploads/2016/05/Boobs-Loading.gif"
            alt=""
          />
        )}
      </div>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    players: allDatoCmsPlayer {
      nodes {
        name
        nickname
        photo {
          url
        }
        bioNode {
          childMarkdownRemark {
            html
          }
        }
        id
      }
    }
  }
`
