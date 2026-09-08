"use strict";

const CASES = [
  {
    id: "python",
    profession: "Python-разработчик",
    professionGenitive: "Python-разработчика",
    closed: "assets/cases/python-closed.png",
    open: "assets/cases/python-open.png",
    alt: "В чемодане игрушечный питон, кружка с надписью while True: coffee, клавиша Enter и кроксы.",
    answers: ["Python-разработчик", "QA", "ML-инженер", "Менеджер продукта"],
  },
  {
    id: "ml",
    profession: "ML-инженер",
    professionGenitive: "ML-инженера",
    closed: "assets/cases/ml-closed.png",
    open: "assets/cases/ml-open.png",
    alt: "В чемодане маленький робот, увеличительное стекло и антистресс в виде мозга.",
    answers: ["ML-инженер", "Python-разработчик", "Продуктовый аналитик", "Менеджер продукта"],
  },
  {
    id: "qa",
    profession: "QA",
    professionGenitive: "QA-специалиста",
    closed: "assets/cases/qa-closed.png",
    open: "assets/cases/qa-open.png",
    alt: "В чемодане пластиковые жуки, чек-лист и красная кнопка ERROR.",
    answers: ["QA", "Python-разработчик", "Продуктовый исследователь", "Дизайнер"],
  },
  {
    id: "product-analyst",
    profession: "Продуктовый аналитик",
    professionGenitive: "продуктового аналитика",
    closed: "assets/cases/product-analyst-closed.png",
    open: "assets/cases/product-analyst-open.png",
    alt: "В чемодане калькулятор, планшет с графиками и книга о проверке гипотез.",
    answers: ["Продуктовый аналитик", "Дизайнер", "Контент-маркетолог", "Продуктовый исследователь"],
  },
  {
    id: "product-researcher",
    profession: "Продуктовый исследователь",
    professionGenitive: "продуктового исследователя",
    closed: "assets/cases/product-researcher-closed.png",
    open: "assets/cases/product-researcher-open.png",
    alt: "В чемодане диктофон, блокнот с цитатами пользователей и фигурка Вижн.",
    answers: ["Продуктовый исследователь", "Продуктовый аналитик", "Дизайнер", "Контент-маркетолог"],
  },
  {
    id: "product-manager",
    profession: "Менеджер продукта",
    professionGenitive: "менеджера продукта",
    closed: "assets/cases/product-manager-closed.png",
    open: "assets/cases/product-manager-open.png",
    alt: "В чемодане детали пазла, дорожный атлас, секундомер и кнопка SHIP IT.",
    answers: ["Менеджер продукта", "Продуктовый исследователь", "Продуктовый аналитик", "Менеджер по продажам"],
  },
  {
    id: "designer",
    profession: "Дизайнер",
    professionGenitive: "дизайнера",
    closed: "assets/cases/designer-closed.png",
    open: "assets/cases/designer-open.png",
    alt: "В чемодане веер цветовой палитры, стилус, линейка и книга о шрифтах.",
    answers: ["Дизайнер", "Продуктовый исследователь", "Контент-маркетолог", "Менеджер продукта"],
  },
  {
    id: "sales-manager",
    profession: "Менеджер по продажам",
    professionGenitive: "менеджера по продажам",
    closed: "assets/cases/sales-manager-closed.png",
    open: "assets/cases/sales-manager-open.png",
    alt: "В чемодане телефон, гарнитура, визитка и галстук.",
    answers: ["Менеджер по продажам", "Менеджер продукта", "Контент-маркетолог", "Продуктовый исследователь"],
  },
  {
    id: "content-marketer",
    profession: "Контент-маркетолог",
    professionGenitive: "контент-маркетолога",
    closed: "assets/cases/content-marketer-closed.png",
    open: "assets/cases/content-marketer-open.png",
    alt: "В чемодане планшет, камера, блокнот, кофейный стаканчик и экшн-камера.",
    answers: ["Контент-маркетолог", "Дизайнер", "Менеджер по продажам", "Продуктовый исследователь"],
  },
  {
    id: "security",
    profession: "Специалист по информационной безопасности",
    professionGenitive: "специалиста по информационной безопасности",
    closed: "assets/cases/security-closed.png",
    open: "assets/cases/security-open.png",
    alt: "В чемодане связка ключей, кнопочный телефон, чёрные очки и записка с паролями.",
    answers: ["Специалист по информационной безопасности", "QA", "Python-разработчик", "ML-инженер"],
  },
];

const GRID_COLUMNS = 40;
const GRID_ROWS = 24;
// Маска получена из силуэта исходного закрытого чемодана. Логотип и чёрный фон
// не входят в область исследования, поэтому движение по ним не даёт прогресс.
const SUITCASE_MASK_ROWS = [
  [],
  [],
  [[9, 30]],
  [[6, 31]],
  [[6, 31]],
  [[8, 31]],
  [[8, 31]],
  [[8, 31]],
  [[8, 32]],
  [[8, 32]],
  [[8, 33]],
  [[8, 33]],
  [[8, 33]],
  [[8, 33]],
  [[8, 32]],
  [[8, 31]],
  [[8, 31]],
  [[8, 31]],
  [[8, 31]],
  [[6, 31]],
  [[6, 31]],
  [[7, 30]],
  [],
  [],
];
const VALID_CELL_COUNT = SUITCASE_MASK_ROWS.reduce(
  (total, ranges) => total + ranges.reduce((rowTotal, [start, end]) => rowTotal + end - start + 1, 0),
  0,
);
const UNLOCK_PERCENT = 50;
const GAME_IDLE_MS = 90_000;
const RESULT_IDLE_MS = 60_000;

const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const resultScreen = document.querySelector("#resultScreen");
const screens = [startScreen, gameScreen, resultScreen];
const startButton = document.querySelector("#startButton");
const playAgainButton = document.querySelector("#playAgainButton");
const fullscreenButton = document.querySelector("#fullscreenButton");
const assetStatus = document.querySelector("#assetStatus");
const suitcase = document.querySelector("#suitcase");
const closedImage = document.querySelector("#closedImage");
const openImage = document.querySelector("#openImage");
const resultImage = document.querySelector("#resultImage");
const touchHint = document.querySelector("#touchHint");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const progressBar = document.querySelector("#progressBar");
const progressHint = document.querySelector("#progressHint");
const answerArea = document.querySelector("#answerArea");
const answerContent = document.querySelector("#answerContent");
const answers = document.querySelector("#answers");
const resultTitle = document.querySelector("#resultTitle");
const resultStamp = document.querySelector("#resultStamp");
const resultCountdown = document.querySelector("#resultCountdown");
const resultCountdownValue = document.querySelector("#resultCountdownValue");

const visitedCells = new Set();
let currentCase = null;
let activePointerId = null;
let scannerX = 50;
let scannerY = 50;
let answerUnlocked = false;
let answerSubmitted = false;
let scannerInputMode = "pointer";
let lastInteractionMode = "pointer";
let activeScreen = "start";
let idleTimer = null;
let idleCountdownTimer = null;
let idleDeadline = 0;
let isStartingGame = false;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const random = globalThis.crypto?.getRandomValues
      ? globalThis.crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
      : Math.random();
    const target = Math.floor(random * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function showScreen(name) {
  activeScreen = name;
  const selected = name === "start" ? startScreen : name === "game" ? gameScreen : resultScreen;
  screens.forEach((screen) => {
    const isSelected = screen === selected;
    screen.hidden = !isSelected;
    screen.classList.toggle("is-active", isSelected);
  });
  resetIdleTimer();
}

function chooseCase() {
  const availableCases = currentCase
    ? CASES.filter((item) => item.id !== currentCase.id)
    : CASES;
  return availableCases[Math.floor(Math.random() * availableCases.length)] || CASES[0];
}

function buildAnswers(item) {
  answers.replaceChildren();
  shuffled(item.answers).forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;
    button.dataset.answer = answer;
    button.addEventListener("click", () => submitAnswer(answer));
    answers.append(button);
  });
}

function resetGameState() {
  visitedCells.clear();
  activePointerId = null;
  scannerX = 50;
  scannerY = 50;
  answerUnlocked = false;
  answerSubmitted = false;
  scannerInputMode = "pointer";
  suitcase.classList.remove("is-scanning");
  suitcase.style.setProperty("--lens-x", "50%");
  suitcase.style.setProperty("--lens-y", "50%");
  touchHint.classList.remove("is-hidden");
  answerArea.classList.add("is-locked");
  answerContent.hidden = true;
  updateProgress();
}

async function startGame() {
  if (isStartingGame) return;
  isStartingGame = true;
  startButton.disabled = true;
  playAgainButton.disabled = true;
  assetStatus.textContent = "Загружаем выбранный чемодан…";
  assetStatus.classList.remove("is-ready", "is-error");

  const nextCase = chooseCase();
  try {
    await Promise.all([preloadAsset(nextCase.closed), preloadAsset(nextCase.open)]);
    currentCase = nextCase;
    resetGameState();
    closedImage.src = currentCase.closed;
    openImage.src = currentCase.open;
    openImage.alt = "";
    buildAnswers(currentCase);
    showScreen("game");
    assetStatus.textContent = "Игра готова";
    assetStatus.classList.add("is-ready");
    if (lastInteractionMode === "keyboard") {
      window.setTimeout(() => suitcase.focus({ preventScroll: true }), 220);
    }
  } catch (error) {
    console.error(error);
    assetStatus.textContent = "Не удалось загрузить материалы игры. Перезапустите приложение.";
    assetStatus.classList.add("is-error");
  } finally {
    isStartingGame = false;
    startButton.disabled = false;
    playAgainButton.disabled = false;
  }
}

function returnToStart() {
  activePointerId = null;
  suitcase.classList.remove("is-scanning");
  showScreen("start");
  if (lastInteractionMode === "keyboard") {
    window.setTimeout(() => startButton.focus({ preventScroll: true }), 180);
  }
}

function getPoint(clientX, clientY) {
  const rect = suitcase.getBoundingClientRect();
  return {
    x: clamp(clientX - rect.left, 0, rect.width),
    y: clamp(clientY - rect.top, 0, rect.height),
    width: rect.width,
    height: rect.height,
  };
}

function isSuitcaseCell(column, row) {
  if (column < 0 || column >= GRID_COLUMNS || row < 0 || row >= GRID_ROWS) return false;
  return SUITCASE_MASK_ROWS[row].some(([start, end]) => column >= start && column <= end);
}

function setScannerPosition(clientX, clientY) {
  if (answerSubmitted || activeScreen !== "game") return;
  const point = getPoint(clientX, clientY);
  const relativeX = point.x / point.width;
  const relativeY = point.y / point.height;
  const column = clamp(Math.floor(relativeX * GRID_COLUMNS), 0, GRID_COLUMNS - 1);
  const row = clamp(Math.floor(relativeY * GRID_ROWS), 0, GRID_ROWS - 1);
  scannerX = (point.x / point.width) * 100;
  scannerY = (point.y / point.height) * 100;
  suitcase.style.setProperty("--lens-x", `${scannerX}%`);
  suitcase.style.setProperty("--lens-y", `${scannerY}%`);
  suitcase.classList.add("is-scanning");
  touchHint.classList.add("is-hidden");
  if (isSuitcaseCell(column, row)) markVisitedArea(relativeX, relativeY);
}

function markVisitedArea(relativeX, relativeY) {
  const centerColumn = clamp(Math.floor(relativeX * GRID_COLUMNS), 0, GRID_COLUMNS - 1);
  const centerRow = clamp(Math.floor(relativeY * GRID_ROWS), 0, GRID_ROWS - 1);
  for (let rowOffset = -2; rowOffset <= 2; rowOffset += 1) {
    for (let columnOffset = -2; columnOffset <= 2; columnOffset += 1) {
      const column = centerColumn + columnOffset;
      const row = centerRow + rowOffset;
      if (isSuitcaseCell(column, row)) {
        visitedCells.add(`${column}:${row}`);
      }
    }
  }
  updateProgress();
}

function updateProgress() {
  const progress = Math.min(100, Math.round((visitedCells.size / VALID_CELL_COUNT) * 100));
  progressText.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuenow", String(progress));
  progressBar.setAttribute("aria-valuetext", `Исследовано ${progress}%`);

  if (progress >= UNLOCK_PERCENT && !answerUnlocked) {
    answerUnlocked = true;
    answerArea.classList.remove("is-locked");
    answerContent.hidden = false;
    progressHint.textContent = "Готово! Теперь выбери профессию";
    if (scannerInputMode === "keyboard") {
      window.setTimeout(() => answers.querySelector("button")?.focus({ preventScroll: true }), 160);
    }
  } else if (!answerUnlocked) {
    progressHint.textContent = "Проведи лупой по разным частям чемодана";
  }
}

function submitAnswer(selectedAnswer) {
  if (!answerUnlocked || answerSubmitted || !currentCase) return;
  answerSubmitted = true;
  const isCorrect = selectedAnswer === currentCase.profession;
  const resultPrefix = document.createTextNode(isCorrect ? "Верно! Это чемодан " : "Неверно. Это чемодан ");
  const profession = document.createElement("span");
  profession.className = "result-title-profession";
  profession.textContent = currentCase.professionGenitive;
  resultTitle.replaceChildren(resultPrefix, profession, document.createTextNode("."));
  resultTitle.classList.toggle("is-long", currentCase.professionGenitive.length > 30);
  resultImage.src = currentCase.open;
  resultImage.alt = currentCase.alt;
  resultStamp.textContent = isCorrect ? "Верно" : "Неверно";
  resultStamp.className = `result-stamp ${isCorrect ? "is-correct" : "is-wrong"}`;
  showScreen("result");
  if (lastInteractionMode === "keyboard") {
    window.setTimeout(() => playAgainButton.focus({ preventScroll: true }), 220);
  }
}

function onPointerDown(event) {
  noteActivity();
  scannerInputMode = "pointer";
  activePointerId = event.pointerId;
  try {
    suitcase.setPointerCapture?.(event.pointerId);
  } catch {
    // Some synthetic and legacy pointer sources cannot be captured.
  }
  setScannerPosition(event.clientX, event.clientY);
}

function onPointerMove(event) {
  const mouseHover = event.pointerType === "mouse";
  const activeTouch = activePointerId === event.pointerId;
  if (!mouseHover && !activeTouch) return;
  noteActivity();
  scannerInputMode = "pointer";
  setScannerPosition(event.clientX, event.clientY);
}

function onPointerEnd(event) {
  if (activePointerId === event.pointerId) activePointerId = null;
  if (event.pointerType !== "mouse") suitcase.classList.remove("is-scanning");
}

function onSuitcaseKeydown(event) {
  const movement = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
  }[event.key];
  if (!movement) return;
  event.preventDefault();
  noteActivity();
  scannerInputMode = "keyboard";
  const step = event.shiftKey ? 10 : 5;
  scannerX = clamp(scannerX + movement[0] * step, 0, 100);
  scannerY = clamp(scannerY + movement[1] * step, 0, 100);
  const rect = suitcase.getBoundingClientRect();
  setScannerPosition(
    rect.left + (scannerX / 100) * rect.width,
    rect.top + (scannerY / 100) * rect.height,
  );
}

function clearIdleTimer() {
  window.clearTimeout(idleTimer);
  window.clearInterval(idleCountdownTimer);
  idleTimer = null;
  idleCountdownTimer = null;
  idleDeadline = 0;
}

function getIdleDuration() {
  return activeScreen === "result" ? RESULT_IDLE_MS : GAME_IDLE_MS;
}

function updateResultCountdown() {
  if (activeScreen !== "result" || !idleDeadline) return;
  const remainingSeconds = Math.max(0, Math.ceil((idleDeadline - Date.now()) / 1000) - 1);
  resultCountdownValue.textContent = String(remainingSeconds).padStart(2, "0");
}

function resetIdleTimer() {
  clearIdleTimer();
  resultCountdown.hidden = activeScreen !== "result";
  if (activeScreen === "start") return;
  const idleDuration = getIdleDuration();
  idleDeadline = Date.now() + idleDuration;
  if (activeScreen === "result") {
    updateResultCountdown();
    idleCountdownTimer = window.setInterval(updateResultCountdown, 250);
  }
  idleTimer = window.setTimeout(() => {
    returnToStart();
  }, idleDuration);
}

function noteActivity() {
  if (activeScreen !== "start") resetIdleTimer();
}

function onDocumentPointerDown() {
  lastInteractionMode = "pointer";
  noteActivity();
}

function onDocumentKeyDown() {
  lastInteractionMode = "keyboard";
  noteActivity();
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch (error) {
    console.warn("Полноэкранный режим недоступен:", error.message);
  }
}

function updateFullscreenControl() {
  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenButton.setAttribute("aria-label", isFullscreen ? "Выйти из полноэкранного режима" : "Открыть на весь экран");
  fullscreenButton.title = isFullscreen ? "Выйти из полноэкранного режима" : "На весь экран";
}

function preloadAsset(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = () => reject(new Error(`Не загрузился файл: ${src}`));
    image.src = src;
  });
}

async function preloadAssets() {
  try {
    await preloadAsset(CASES[0].closed);
    startButton.disabled = false;
    assetStatus.textContent = "Игра готова";
    assetStatus.classList.add("is-ready");
  } catch (error) {
    console.error(error);
    assetStatus.textContent = "Не удалось загрузить материалы игры. Перезапустите приложение.";
    assetStatus.classList.add("is-error");
  }
}

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenControl);
document.addEventListener("pointerdown", onDocumentPointerDown, { passive: true });
document.addEventListener("keydown", onDocumentKeyDown);

suitcase.addEventListener("pointerdown", onPointerDown);
suitcase.addEventListener("pointermove", onPointerMove);
suitcase.addEventListener("pointerup", onPointerEnd);
suitcase.addEventListener("pointercancel", onPointerEnd);
suitcase.addEventListener("pointerleave", (event) => {
  if (event.pointerType === "mouse" && activePointerId === null) suitcase.classList.remove("is-scanning");
});
suitcase.addEventListener("keydown", onSuitcaseKeydown);
suitcase.addEventListener("dragstart", (event) => event.preventDefault());

showScreen("start");
preloadAssets();
