import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { chunk } from "lodash"
import { Helmet } from "react-helmet"

import "../styles/common.scss"

function IndexPage(props) {
  const players = props.data.players.nodes
  const [activePlayers, setActivePlayers] = useState([])
  const [teams, setTeams] = useState()

  function handlePlayerSelect(id, isActive) {
    if (isActive) {
      setActivePlayers([...activePlayers, players.find(item => item.id === id)])
    } else {
      setActivePlayers([...activePlayers.filter(item => item.id !== id)])
    }
  }

  function shuffleTeams() {
    if (activePlayers.length % 2 !== 0) {
      alert("Нечетное количество игроков")
    } else if (activePlayers.length > 4) {
      alert("Нужно выбрать 4 игрока")
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
    }
  }

  function handleResetClick() {
    setActivePlayers([])
    setTeams(false)
  }

  return (
    <>
      <Helmet title="Sqvirbo Football Manager"></Helmet>
      {!teams && (
        <header className="header">
          <div className="container">
            <h1 className="title">
              CHOOSE YOUT FIGHTERS... ({activePlayers.length}/4)
            </h1>
          </div>
        </header>
      )}
      {teams && (
        <header className="header">
          <div className="container">
            <h1 className="title">РЕЗУЛЬТАТ</h1>
          </div>
        </header>
      )}
      <div className="container">
        {!teams && (
          <>
            <div className="players">
              {players.map(item => (
                <Player
                  key={item.id}
                  {...item}
                  handlePlayerSelect={handlePlayerSelect}
                ></Player>
              ))}
            </div>
          </>
        )}
      </div>
      {teams && (
        <div className="teams">
          <div className="container">
            <div className="first-team">
              <div className="team-player">
                <h2 className="team-title">КОМАНДА 1</h2>
                <div className="photo">
                  <img src={teams[0][0].photo.url} alt=""></img>
                </div>
                <h1 className="status">Воротчик</h1>
              </div>
              <div className="team-player">
                <div className="photo">
                  <img src={teams[0][1].photo.url} alt=""></img>
                </div>
                <h1 className="status">Нападальщик</h1>
              </div>
            </div>
            <div className="second-team">
              <div className="team-player">
                <h2 className="team-title">КОМАНДА 2</h2>
                <div className="photo">
                  <img src={teams[1][0].photo.url} alt=""></img>
                </div>
                <h1 className="status">Воротчик</h1>
              </div>
              <div className="team-player">
                <div className="photo">
                  <img src={teams[1][1].photo.url} alt=""></img>
                </div>
                <h1 className="status">Нападальщик</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      {!teams && (
        <aside className="selector">
          <button onClick={shuffleTeams} className="button">
            РАЗБИТЬ НА КОМАНДЫ
          </button>
        </aside>
      )}
      {teams && (
        <aside className="selector">
          <button onClick={handleResetClick} className="button">
            РЕЗЕТ
          </button>
        </aside>
      )}
    </>
  )
}

export default IndexPage

function Player({ id, photo, name, nickname, handlePlayerSelect }) {
  const [isActive, setIsActive] = useState(false)
  function handleClick() {
    setIsActive(!isActive)
  }

  useEffect(() => handlePlayerSelect(id, isActive), [isActive])

  return (
    <div
      className={`player ${isActive ? "player-active" : ""}`}
      onClick={handleClick}
    >
      <div className="photo">
        <img src={photo.url} alt=""></img>
      </div>
      <div>
        <h2 className="name">{name}</h2>
        <h3 className="nickname">{nickname}</h3>
      </div>
    </div>
  )
}

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
