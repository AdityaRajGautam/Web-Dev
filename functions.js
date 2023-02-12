const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const scoreDolphins = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 49);
const checkWinners = function (avgDolphins, avgkoalas) {
    if (avgDolphins >= 2 * avgkoalas) {
        console.log(`Dolphins win(${scoreDolphins} VS ${scoreKoalas})`);
    } else if (avgkoalas >= 2 * avgDolphins) {
        console.log(`Koalas win(${scoreKoalas} VS ${scoreDolphins})`);
    } else {
        console.log("no team wins");
    }
}

checkWinners(scoreDolphins, scoreKoalas);

checkWinners(577, 111)