const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem('recentScore')
// console.log(recentScore)

const MAX_HIGH_SCORES = 5;
const highScores = JSON.parse(localStorage.getItem('highScores') || []);
// console.log(highScores)

finalScore.textContent = recentScore

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})


const saveHighScore = e => {
  e.preventDefault();
  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
  }
  highScores.push(score);
  highScores.sort((a,b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('/')
}