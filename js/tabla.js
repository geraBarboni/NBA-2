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
let standings
let teams

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
  standingsAPI()
}
teamsAPI()

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
  showTableHTML()
}

function showTableHTML() {
  let easternConference = []
  let westernConference = []

  for (let i = 0; i < standings.length; i++) {
    easternConference = standings.filter(
      (easternTeams) => easternTeams.Conference === 'Eastern',
    )
    westernConference = standings.filter(
      (westernTeams) => westernTeams.Conference === 'Western',
    )
  }

  let tableEastHTML = document.getElementById('tableEastHTML')
  let tableWestHTML = document.getElementById('tableWestHTML')

  easternConference = easternConference.sort((a, b) => a.Wins < b.Wins)
  westernConference = westernConference.sort((a, b) => a.Wins < b.Wins)

  tableEastHTML.innerHTML = ''
  tableWestHTML.innerHTML = ''

  for (let i = 0; i < easternConference.length; i++) {
    let teamsE = teams.filter(
      (teamE) => teamE.TeamID === easternConference[i].TeamID,
    )

    i === 6 &&
      (tableEastHTML.innerHTML += `
    <hr class="m-0">
    `)
    i === 10 &&
      (tableEastHTML.innerHTML += `
    <hr class="m-0">
    `)

    tableEastHTML.innerHTML += `
    <div class="card my-2 p-1 shadow" href="" id="${
      easternConference[i].TeamID
    }" onclick="ver(${easternConference[i].TeamID})">
    <div class="row p-1">
      <div class="col-4 d-flex">
        <div class="POseed col-2 m-auto">${[i + 1]}</div>
        <img class="imgTeamsTable m-auto" src="${
          teamsE[0].WikipediaLogoUrl
        }" alt="" />
      </div>
      <div class="col-4 m-auto">
        <p class="m-auto">${easternConference[i].City} ${
      easternConference[i].Name
    }</p>
      </div>
      <div class="col-4 m-auto">
        <p class="m-auto">${easternConference[i].Wins} - ${
      easternConference[i].Losses
    }</p>
      </div>
    </div>
  </div>
    `
  }

  for (let i = 0; i < westernConference.length; i++) {
    let teamsW = teams.filter(
      (teamW) => teamW.TeamID === westernConference[i].TeamID,
    )

    i === 6 &&
      (tableWestHTML.innerHTML += `
    <hr class="m-0">
    `)
    i === 10 &&
      (tableWestHTML.innerHTML += `
    <hr class="m-0">
    `)

    tableWestHTML.innerHTML += `
    <div class="card my-2 p-1 shadow" href="" id="${
      westernConference[i].TeamID
    }" onclick="ver(${westernConference[i].TeamID})">
    <div class="row p-1">
      <div class="col-4 d-flex">
        <div class="POseed col-2 m-auto">${[i + 1]}</div>
        <img class="imgTeamsTable m-auto" src="${
          teamsW[0].WikipediaLogoUrl
        }" alt="" />
      </div>
      <div class="col-4 m-auto">
        <p class="m-auto">${westernConference[i].City} ${
      westernConference[i].Name
    }</p>
      </div>
      <div class="col-4 m-auto">
        <p class="m-auto">${westernConference[i].Wins} - ${
      westernConference[i].Losses
    }</p>
      </div>
    </div>
  </div>
    `
  }

  console.log(easternConference)
  console.log(westernConference)
}

function ver(id) {
  let selectedID = id
  localStorage.setItem('selectedID', JSON.stringify(selectedID))
  window.location.href = '../html/infoEquipo.html'
}
