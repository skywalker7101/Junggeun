const generateBtn = document.getElementById("generateBtn");
const resultContainer = document.getElementById("result");
const countSelect = document.getElementById("count");

function getRandomNumbers() {
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
  const selected = [];

  while (selected.length < 6) {
    const index = Math.floor(Math.random() * numbers.length);
    selected.push(numbers.splice(index, 1)[0]);
  }

  return selected.sort((a, b) => a - b);
}

function renderResult(sets) {
  resultContainer.innerHTML = "";

  sets.forEach((numbers, index) => {
    const setEl = document.createElement("div");
    setEl.className = "set";

    const titleEl = document.createElement("p");
    titleEl.className = "set-title";
    titleEl.textContent = `추천 세트 ${index + 1}`;

    const numbersEl = document.createElement("div");
    numbersEl.className = "numbers";

    numbers.forEach((number, numIndex) => {
      const numberEl = document.createElement("span");
      numberEl.className = `number${numIndex === numbers.length - 1 ? " bonus" : ""}`;
      numberEl.textContent = number;
      numbersEl.appendChild(numberEl);
    });

    setEl.appendChild(titleEl);
    setEl.appendChild(numbersEl);
    resultContainer.appendChild(setEl);
  });
}

function generateSets(count) {
  return Array.from({ length: count }, () => getRandomNumbers());
}

generateBtn.addEventListener("click", () => {
  const count = Number(countSelect.value);
  const sets = generateSets(count);
  renderResult(sets);
});
