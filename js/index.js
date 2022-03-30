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
  showGamesOfTheDayHTML()
}

async function scheduleAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/Games/${year}?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    schedule = await response.json()
    console.log(schedule)
  } catch (err) {
    console.log('Error ==> ', err)
  }
}
scheduleAPI()

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

async function injuredPlayersAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/projections/json/InjuredPlayers?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    injuredPlayers = await response.json()
    console.log(injuredPlayers)
  } catch (err) {
    console.log('Error ==> ', err)
  }
}
injuredPlayersAPI()

/*------------------------------------------------------MANIPULANDO HTML*/

function showGamesOfTheDayHTML() {
  let gamesOfTheDayHTML = document.getElementById('gamesOfTheDay')
  gamesOfTheDayHTML.innerHTML = ''
  for (let i = 0; i < gamesOfTheDate.length; i++) {
    let homeTeam = teams.filter(
      (homeTeamSreach) =>
        homeTeamSreach.TeamID === gamesOfTheDate[i].HomeTeamID,
    )

    let awayTeam = teams.filter(
      (awayTeamSreach) =>
        awayTeamSreach.TeamID === gamesOfTheDate[i].AwayTeamID,
    )

    let gameTime = new Date(gamesOfTheDate[i].DateTimeUTC + '-0000')

    let gameHour = gameTime.getHours()
    let gameMinutes = gameTime.getMinutes()

    if (gameMinutes === 0) {
      gameMinutes = '00'
    }

    gamesOfTheDayHTML.innerHTML += `
    <div class="card p-3 my-2 shadow">
    <div class="row">
      <div class="col-4 img-teams">
        <img class="img-fluid " src="${homeTeam[0].WikipediaLogoUrl}" alt="" />
      </div>
      <div class="col-4 m-auto">
        <p class="text-center m-auto gameTime">${gameHour}:${gameMinutes}</p>
      </div>
      <div class="col-4 img-teams">
        <img class="img-fluid " src="${awayTeam[0].WikipediaLogoUrl}" alt="" />
      </div>
    </div>
        `
  }
}
