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
let gamesInProgress
let schedule
let teams
let injuredPlayers

async function teamsAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/teams?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    teams = await response.json()
    console.log(teams)
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
    console.log(gamesOfTheDate)
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
    gamesInProgress = await response.json()
    console.log(gamesInProgress)
  } catch (err) {
    console.log('Error ==> ', err)
  }
  showGamesInProgressHTML()
}

function showGamesInProgressHTML() {
  let gamesOfTheDayInProgressHTML = document.getElementById(
    'gamesOfTheDayInProgress',
  )
  if (gamesInProgress) {
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

      gamesOfTheDayInProgressHTML.innerHTML += `
              <div class="card p-3 my-2 shadow">
              <div class="row">
                <div class="col-4 img-teams">
                  <img class="img-fluid " src="${
                    homeTeam[0].WikipediaLogoUrl
                  }" alt="" />
                </div>
                <div class="col-4 m-auto">
                  <div class="row">
                      <div class="col-12 m-auto">
                          <p class="text-center m-auto gameTime">C ${
                            gamesOfTheDate[i].Quarter === null
                              ? (gamesOfTheDate[i].Quarter = '0')
                              : gamesOfTheDate[i].Quarter
                          }</p>
                      </div>
                      <div class="col-12 m-auto">
                          <p class="text-center m-auto gameTime">${
                            gamesOfTheDate[i].HomeTeamScore === null
                              ? (gamesOfTheDate[i].HomeTeamScore = '0')
                              : gamesOfTheDate[i].HomeTeamScore
                          } | ${
        gamesOfTheDate[i].AwayTeamScore === null
          ? (gamesOfTheDate[i].AwayTeamScore = '0')
          : gamesOfTheDate[i].AwayTeamScore
      }</p>
                      </div>
                  </div>
                </div>
                <div class="col-4 img-teams">
                  <img class="img-fluid " src="${
                    awayTeam[0].WikipediaLogoUrl
                  }" alt="" />
                </div>
              </div>
                  `
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
