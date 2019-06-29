const compute = (team1Elo,team2Elo, team1Won) => {
	const avg1 = team1Elo
    const avg2 = team2Elo
    
 	let res = `Team ${avg1 > avg2 ? 1 : 2} is stronger. `

 	let x = 10**(Math.abs(avg1 - avg2)/400) // abs assumes avg1 is stronger
 	const pa = 1/(1+x)
	const k = 32 // magic ;)
    const differenceStrongerWin =  Math.round(k * pa)
    const differenceWeakerWin = Math.round(k * (1-pa))

    const didStrongerWin = (team1Won && avg1 > avg2) || (!team1Won && (avg1 < avg2))
    const difference = didStrongerWin ? differenceStrongerWin : differenceWeakerWin

    return difference
}


exports.computeAveraging = (a1, a2, b1, b2, team1Won) => {
  const avg1 = a2 !== null ? (a1 + a2)/2 : a1
  const avg2 = b2 !== null ? (b1 + b2)/2 : b1
  return compute(avg1, avg2, team1Won)
}

exports.computeAddition = (a1, a2, b1, b2, team1Won) => {
  return compute(a1+a2, b1+b2, team1Won)  
}
