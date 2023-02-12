const dolhpineScore = (97 + 112 + 101) / 3;
const koalaScore = (109 + 95 + 123) / 3;
const minScore = 100;

console.log(dolhpineScore, koalaScore);

if (dolhpineScore > koalaScore && dolhpineScore >= minScore) {
    console.log("dolphines win the trophy")
} else if (koalaScore > dolhpineScore && koalaScore >= minScore) {
    console.log("koalas win the trophy")
} else if (koalaScore === dolhpineScore && dolhpineScore >= minScore && koalaScore >= minScore) {
    console.log("both teams win the trophy")
} else {
    console.log("no one wins the trophy")
}

