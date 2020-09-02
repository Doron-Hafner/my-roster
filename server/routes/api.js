const urllib = require('urllib')
const express = require('express')
const router = express.Router()
let json = {}

urllib.request('http://data.nba.net/10s/prod/v1/2019/players.json', function (err, res) {
    let result = JSON.parse(res.toString())
    json.data = result.league.standard
})

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

router.get('/api/teams/:teamName', function (req, res) {
    const teamName = req.params.teamName
    if (teamToIDs[teamName]) {
        const teamId = teamToIDs[teamName]
        const team = json.data
            .filter(d => d.teamId === teamId && d.isActive)
            .map(d => (
                {
                    firstName: d.firstName,
                    lastName: d.lastName,
                    jersey: d.jersey,
                    pos: d.pos,
                    img: `https://nba-players.herokuapp.com/players/${d.lastName}/${d.firstName}`
                }))
        res.send(team)
    } else {
        res.send({ error: 'team not found' })
    }
})

module.exports = router


