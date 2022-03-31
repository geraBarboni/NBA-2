const date = new Date()
let month = date.getMonth()
let day = date.getDate()
let year = date.getFullYear()
let months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]
let correctDate = year + '-' + months[month] + '-' + day
let gamesOfTheDate
let areGamesInProgress
let gamesInProgress = []
let schedule
let teams
let injuredPlayers

async function teamsAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/teams?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    teams = await response.json()
    //console.log(teams)
  } catch (err) {
    console.log('Error ==> ', err)
  }
  gamesByDateAPI()
}
teamsAPI()

async function gamesByDateAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${correctDate}?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    gamesOfTheDate = await response.json()
    //console.log(gamesOfTheDate)
  } catch (err) {
    console.log('Error ==> ', err)
  }
  areGamesInProgressAPI()
}

async function areGamesInProgressAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    areGamesInProgress = await response.json()
    //console.log(areGamesInProgress)
  } catch (err) {
    console.log('Error ==> ', err)
  }
  //showGamesInProgressHTML()
  boxScoreAPI()
}

async function boxScoreAPI() {
  for (let i = 0; i < gamesOfTheDate.length; i++) {
    try {
      let response = await fetch(
        `https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${gamesOfTheDate[i].GameID}?key=8511bfc544294db6b0c8aec24806f54f`,
      )
      gameBoxScore = await response.json()
      gamesInProgress.push(gameBoxScore)
    } catch (err) {
      console.log('Error ==> ', err)
    }
  }

  console.log(gamesInProgress)
  showGamesInProgressHTML()
}

function showGamesInProgressHTML() {
  let gamesOfTheDayInProgressHTML = document.getElementById(
    'gamesOfTheDayInProgress',
  )

  if (areGamesInProgress) {
    gamesOfTheDayInProgressHTML.innerHTML = ''

    for (let i = 0; i < gamesOfTheDate.length; i++) {
      let homeTeam = teams.filter(
        (homeTeamSreach) =>
          homeTeamSreach.TeamID === gamesOfTheDate[i].HomeTeamID,
      )

      let awayTeam = teams.filter(
        (awayTeamSreach) =>
          awayTeamSreach.TeamID === gamesOfTheDate[i].AwayTeamID,
      )

      let gameLiveInfo = gamesInProgress.filter(
        (thisGame) => thisGame.Game.GameID === gamesOfTheDate[i].GameID,
      )

      console.log(gameLiveInfo[0].Game.HomeTeamScore)

      if (gameLiveInfo[0].Game.Status === 'InProgress') {
        gamesOfTheDayInProgressHTML.innerHTML += `
            <div class="card p-3 my-2 shadow">
              <div class="row">
                <div class="col-4 d-flex ">
                  <img class="img-fluid img-teams m-auto" src="${homeTeam[0].WikipediaLogoUrl}" alt="" />
                </div>
                <div class="col-4 m-auto">
                  <div class="row">
                    <div class="col-12 m-auto">
                      <p class="text-center m-auto gameTime"> Q 
                      ${gameLiveInfo[0].Game.Quarter}
                      </p>
                    </div>
                    <div class="col-12 m-auto">
                      <p class="text-center m-auto gameTime">
                        ${gameLiveInfo[0].Game.HomeTeamScore} | ${gameLiveInfo[0].Game.AwayTeamScore}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-4 d-flex">
                  <img class="img-fluid img-teams m-auto" src="${awayTeam[0].WikipediaLogoUrl}" alt="" />
                </div>
              </div>
            </div>
                    `
      }
    }
  } else {
    gamesOfTheDayInProgressHTML.innerHTML = ''
    gamesOfTheDayInProgressHTML.innerHTML += `
      <div class="col-12 d-flex justify-content-center my-3">
        <h3>No hay partidos en vivo</h3>
      </div>
    `
  }
}
