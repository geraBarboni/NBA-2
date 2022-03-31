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
let teamSelectedInfo
let playersTeam
let injuredPlayers
let selectTeamStanding
let selectedID = parseInt(JSON.parse(localStorage.getItem('selectedID')))

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
  selectTeamInTeamsAPI()
}

function selectTeamInTeamsAPI() {
  teamSelectedInfo = teams.filter(
    (teamSelected) => teamSelected.TeamID === selectedID,
  )
  playersTeamAPI()
}

async function playersTeamAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/Players/${teamSelectedInfo[0].Key}?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    playersTeam = await response.json()
    console.log(playersTeam)
  } catch (err) {
    console.log('Error ==> ', err)
  }
  standingsAPI()
}

async function standingsAPI() {
  try {
    let response = await fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/Standings/${year}?key=8511bfc544294db6b0c8aec24806f54f`,
    )
    standings = await response.json()
    console.log(standings)
  } catch (err) {
    console.log('Error ==> ', err)
  }
  selectTeamStandings()
}

function selectTeamStandings() {
  selectTeamStanding = standings.filter(
    (teamSelected) => teamSelected.TeamID === selectedID,
  )
  console.log(selectTeamStanding)
  teamInfoHTML()
  playersInfoHTML()
}

teamsAPI()

function teamInfoHTML() {
  let teamInfo = document.getElementById('teamInfo')

  teamInfo.innerHTML = ''
  teamInfo.innerHTML += `
<div class="row d-flex justify-content-center card shadow m-4">
<div class="col-12">
  <div class="row d-flex">
    <div class="col-12 col-md-6 d-flex">
      <div class="img-team-info-div d-flex m-auto">
        <img class="m-auto img-team-info" src="${teamSelectedInfo[0].WikipediaLogoUrl}" alt="" />
      </div>
    </div>
    <div
      class="col-12 col-md-6 d-flex text-center text-md-start"
    >
      <div class="p-3 m-auto">
        <h2 class="m-0 p-0">${teamSelectedInfo[0].City} ${teamSelectedInfo[0].Name}</h2>
        <hr />
        <p>${selectTeamStanding[0].Wins}-${selectTeamStanding[0].Losses}</p>
      </div>
    </div>
  </div>
</div>
</div>
`
}

function playersInfoHTML() {
  let playersTeamHTML = document.getElementById('playersTeam')

  playersTeamHTML.innerHTML = ''
  for (let i = 0; i < playersTeam.length; i++) {
    playersTeamHTML.innerHTML += `
    <div class="card my-2 p-2 shadow">
    <div class="row p-2">
      <div class="col-4 d-flex">
        <img class="img-fluid imgPlayersTeam m-auto" src="${playersTeam[i].PhotoUrl}" alt="" />
      </div>
      <div class="col-4 m-auto">
        <p class="text-center m-auto">
        ${playersTeam[i].FirstName} ${playersTeam[i].LastName}
        </p>
      </div>
      <div class="col-2 d-flex">
        <p class="text-center m-auto">
        ${playersTeam[i].Position}
        </p>
        </div>
        <div class="col-2 d-flex">
        <p class="text-center m-auto">
        #${playersTeam[i].Jersey}
        </p>
      </div>
    </div>
  </div>
  `
  }
}
