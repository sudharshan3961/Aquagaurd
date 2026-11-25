const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const questions = [
  {q:'Which of these can cause water pollution?', a:['Untreated factory wastewater','Planting trees','Using a reusable bottle','Collecting rainwater'], correct:0, explain:'Correct! Untreated industrial wastewater can carry harmful chemicals into rivers and lakes.'},
  {q:'What can agricultural runoff carry into waterways?', a:['Fertiliser and pesticides','Clean drinking water','Only oxygen','Solar energy'], correct:0, explain:'Exactly. Rain can wash fertilisers and pesticides from fields into nearby water.'},
  {q:'Why are excess nutrients in water harmful?', a:['They always make water safer','They can cause algal blooms and lower oxygen','They remove all plastic','They stop rainfall'], correct:1, explain:'Right! Algal blooms can use up oxygen and harm aquatic life.'},
  {q:'Which is a helpful everyday action?', a:['Pouring oil down the drain','Leaving plastic on a beach','Using reusable bags and bottles','Washing chemicals into storm drains'], correct:2, explain:'Great choice! Reusables help reduce plastic waste that can reach waterways.'}
];
let current = 0, score = 0, selected = false;
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const countEl = document.getElementById('question-count');
const scoreEl = document.getElementById('score-label');
const progressEl = document.getElementById('progress-bar');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

function renderQuestion() {
  const item = questions[current]; selected = false;
  countEl.textContent = `QUESTION 0${current+1} / 0${questions.length}`;
  scoreEl.textContent = `SCORE: ${score}`;
  progressEl.style.width = `${(current / questions.length) * 100}%`;
  questionEl.textContent = item.q; feedbackEl.textContent = '';
  answersEl.innerHTML = '';
  item.a.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer'; button.textContent = `${String.fromCharCode(65+index)}.  ${answer}`;
    button.addEventListener('click', () => chooseAnswer(index, button));
    answersEl.appendChild(button);
  });
  nextBtn.disabled = true; nextBtn.textContent = current === questions.length-1 ? 'See my result →' : 'Next question →';
}
function chooseAnswer(index, button) {
  if (selected) return; selected = true;
  const item = questions[current];
  [...answersEl.children].forEach((el, i) => {
    el.disabled = true;
    if (i === item.correct) el.classList.add('correct');
  });
  if (index === item.correct) { score++; feedbackEl.textContent = item.explain; }
  else { button.classList.add('wrong'); feedbackEl.textContent = `Not quite. ${item.explain}`; }
  scoreEl.textContent = `SCORE: ${score}`;
  progressEl.style.width = `${((current+1) / questions.length) * 100}%`;
  nextBtn.disabled = false;
}
nextBtn.addEventListener('click', () => {
  if (!selected) return;
  if (current < questions.length-1) { current++; renderQuestion(); }
  else {
    questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
    answersEl.innerHTML = '';
    feedbackEl.textContent = score === questions.length ? 'Perfect score! You are an AquaGuard champion.' : 'Thanks for learning with AquaGuard. Explore the page and try again!';
    countEl.textContent = 'QUIZ COMPLETE'; progressEl.style.width = '100%';
    nextBtn.textContent = 'Try again ↻';
    nextBtn.disabled = false;
    nextBtn.onclick = () => { current=0; score=0; nextBtn.onclick=null; renderQuestion(); };
  }
});
renderQuestion();

document.getElementById('pledge-form').addEventListener('submit', event => {
  event.preventDefault();
  const pledge = document.getElementById('pledge').value.trim();
  if (!pledge) return;
  document.getElementById('pledge-message').textContent = `Thank you for your promise: “${pledge}” 💧`;
  event.target.reset();
});
