const { computeAddition, computeAveraging } = require('./compute');
const { matches } = require('./match-dump');
const { players } = require('./player-dump');

players.forEach(player => player.Rating = player.InitialRating);

const playersById = {};
players.forEach(player => playersById[player.Id] = player);

console.log(playersById);

matches.forEach(match => {
    const t1p1Elo = playersById[match.Team1Player1Id].Rating;
    const t1p2Elo = match.Team1Player2Id !== null ? playersById[match.Team1Player2Id].Rating : null;
    const t2p1Elo = playersById[match.Team2Player1Id].Rating;
    const t2p2Elo = match.Team2Player2Id !== null ? playersById[match.Team2Player2Id].Rating : null;
    const difference = computeAddition(t1p1Elo, t1p2Elo, t2p1Elo, t2p2Elo, match.Team1Won);

    console.log(`${t1p1Elo}, ${t1p2Elo}, ${t2p1Elo}, ${t2p2Elo}`);
    console.log(difference);

    if (match.Team1Won) {
        playersById[match.Team1Player1Id].Rating += difference;
        if (match.Team1Player2Id !== null) playersById[match.Team1Player2Id].Rating += difference;
        playersById[match.Team2Player1Id].Rating -= difference;
        if (match.Team2Player2Id !== null) playersById[match.Team2Player2Id].Rating -= difference;
    } else {
        playersById[match.Team1Player1Id].Rating -= difference;
        if (match.Team1Player2Id !== null) playersById[match.Team1Player2Id].Rating -= difference;
        playersById[match.Team2Player1Id].Rating += difference;
        if (match.Team2Player2Id !== null) playersById[match.Team2Player2Id].Rating += difference;
    }
});

const sortedPlayers = Object.values(playersById).sort((player1, player2) => player2.Rating - player1.Rating)
console.log(sortedPlayers);
