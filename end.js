const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem('recentScore')
console.log(recentScore)

finalScore.textContent = recentScore

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})


const saveHighScore = e => {
  e.preventDefault();
  console.log('Clicked')
}