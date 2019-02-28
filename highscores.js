const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// console.log(highScores)

highScoresList.innerHTML = highScores.map(highScore => {
  return `<li class = "high-score">${highScore.name}- ${highScore.score}</li>`
}).join("")