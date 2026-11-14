"use strict";

const dimensions = {
  autonomy: { name: "自主", detail: "按自己的判断做决定，也愿意为选择负责。" },
  exploration: { name: "探索", detail: "给好奇心留空间，愿意尝试不同的做法。" },
  achievement: { name: "成就", detail: "看重进步和成果，愿意为明确的目标投入努力。" },
  security: { name: "安稳", detail: "看重可靠和可预期，习惯为变动留出余地。" },
  care: { name: "关怀", detail: "留意他人的感受和处境，愿意给出实际支持。" },
  fairness: { name: "公平", detail: "在意标准是否一致，以及每个人能否被公正对待。" }
};

const questions = [
  ["autonomy", "家人都看好一条路。我仍会把自己想过怎样的生活放在首位。"],
  ["exploration", "周末没有安排时，我愿意花半天尝试一件完全陌生的活动。"],
  ["care", "朋友临时遇到难处，我愿意挪出原本留给自己的时间帮忙。"],
  ["security", "做一笔较大的支出前，我会先确认还留有足够的应急钱。"],
  ["fairness", "评选名额有限时，即使我的朋友参选，我也希望按同一套标准评。"],
  ["achievement", "学一门新技能时，能看见自己一步步进步，会让我更有动力。"],
  ["security", "如果一个机会很吸引我，即使退路还没想清楚，我也很容易直接答应。", true],
  ["autonomy", "做重要决定时，只要亲近的人看法一致，我通常就会照他们的意见做。", true],
  ["fairness", "多人合作的成果被归到一个人名下时，我会在意其他贡献是否也被提到。"],
  ["exploration", "点餐时，即使菜单上有熟悉的最爱，我也经常想试试没吃过的菜。"],
  ["achievement", "在一件我重视的事上，我通常满足于完成，很少想再把它做好一点。", true],
  ["care", "讨论安排时，如果有人没开口，我会留意他们是不是有顾虑。"],
  ["exploration", "熟悉的方法已经够用时，即使试错成本很低，我也很少想换个做法。", true],
  ["fairness", "轮值给朋友带来不便时，即使别人也有类似困难，我仍倾向只给朋友通融。", true],
  ["security", "出门旅行前，先理清住宿和交通安排，会让我更能享受旅程。"],
  ["care", "朋友讲起一件伤心事时，我很少停下来想这件事对他有什么感受。", true],
  ["achievement", "做长期项目时，我喜欢设几个明确的目标，借此看自己做到了哪一步。"],
  ["autonomy", "选一项长期爱好时，即使身边的人觉得没用，我也愿意继续做自己喜欢的事。"],
  ["care", "发现同伴最近承担太多时，即使对方没开口，我也愿意问问哪里可以帮忙。"],
  ["achievement", "遇到喜欢但暂时做不好的事，我愿意反复练习，直到达到给自己定的目标。"],
  ["fairness", "如果一条分配规则对我有利，但漏算了部分人的实际投入，我也愿意提出重议。"],
  ["security", "两份工作的其他条件差不多时，我更偏向收入和排班稳定的那份。"],
  ["autonomy", "大家都喜欢某种生活方式时，我仍会按自己的需求决定是否跟随。"],
  ["exploration", "参加一个新项目时，能接触到以前不了解的领域，会让我更想参与。"]
];

const options = ["很不同意", "不太同意", "说不准", "比较同意", "很同意"];
const storageKey = "value-compass-v1";
const byId = (id) => document.getElementById(id);
const home = byId("home");
const quiz = byId("quiz");
const report = byId("report");
const start = byId("start");
const answers = byId("answers");
const next = byId("next");
const previous = byId("previous");
const heading = byId("question");

function loadState() {
  const fresh = { index: 0, responses: questions.map(() => null), finished: false };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || !Array.isArray(saved.responses) || saved.responses.length !== questions.length) return fresh;
    if (!saved.responses.every((value) => value === null || (Number.isInteger(value) && value >= 0 && value < options.length))) return fresh;
    const firstMissing = saved.responses.indexOf(null);
    const lastReachable = firstMissing === -1 ? questions.length - 1 : firstMissing;
    const index = Number.isInteger(saved.index) ? Math.max(0, Math.min(lastReachable, saved.index)) : 0;
    return { index, responses: saved.responses, finished: saved.finished === true && firstMissing === -1 };
  } catch {
    return fresh;
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Some browsers limit storage in private sessions.
  }
}

function showScreen(screen, focus) {
  for (const section of [home, quiz, report]) section.hidden = section !== screen;
  window.scrollTo(0, 0);
  if (focus) focus.focus({ preventScroll: true });
}

function updateQuestionControls() {
  const completed = state.responses.filter((value) => value !== null).length;
  byId("progress").value = completed;
  byId("progress-text").textContent = `第 ${state.index + 1} / ${questions.length} 题`;
  next.disabled = state.responses[state.index] === null;
  previous.querySelector("span").textContent = state.index === 0 ? "回到首页" : "上一题";
}

function renderQuestion() {
  heading.textContent = questions[state.index][1];
  answers.innerHTML = options.map((label, value) => {
    const selected = state.responses[state.index] === value;
    return `<label class="answer${selected ? " selected" : ""}"><input type="radio" name="answer" value="${value}" aria-describedby="answer-hint"${selected ? " checked" : ""}><span>${label}</span></label>`;
  }).join("");
  next.textContent = state.index === questions.length - 1 ? "查看结果 →" : "下一题 →";
  updateQuestionControls();
  showScreen(quiz, heading);
}

function getScores(responses) {
  return Object.entries(dimensions).map(([key, dimension]) => {
    const values = questions.flatMap(([questionKey, , reversed], index) => {
      if (questionKey !== key) return [];
      return [reversed ? 4 - responses[index] : responses[index]];
    });
    const points = values.reduce((sum, value) => sum + value, 0) / (values.length * 4) * 100;
    return { ...dimension, points };
  }).sort((a, b) => b.points - a.points);
}

function renderReport() {
  const scores = getScores(state.responses);
  const leaders = scores.filter((score) => score.points === scores[0].points);
  const title = byId("result-title");
  title.textContent = leaders.length === scores.length ? "六种价值倾向并列" : `你更看重${leaders.map(({ name }) => name).join("、")}`;
  byId("result-copy").textContent = leaders.length === 1 ? leaders[0].detail : "这次作答里，你给这些维度的分数一样高。";
  byId("scores").innerHTML = scores.map(({ name, detail, points }) =>
    `<div class="score${points === scores[0].points ? " leading" : ""}"><div class="score-title"><strong>${name}</strong><span>${points} 分</span></div><progress max="100" value="${points}" aria-label="${name}"></progress><small>${detail}</small></div>`
  ).join("");
  byId("share-status").textContent = "";
  showScreen(report, title);
}

function renderHome() {
  const label = state.finished ? "查看上次结果" : state.responses.some((value) => value !== null) ? "继续测试" : "开始测试";
  start.querySelector("span").textContent = label;
  showScreen(home, byId("home-title"));
  drawCompass();
}

start.addEventListener("click", () => state.finished ? renderReport() : renderQuestion());
answers.addEventListener("change", (event) => {
  state.responses[state.index] = Number(event.target.value);
  for (const row of answers.children) row.classList.toggle("selected", row.firstElementChild.checked);
  saveState();
  updateQuestionControls();
});
byId("quiz-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (state.responses[state.index] === null) return;
  if (state.index === questions.length - 1) {
    state.finished = true;
    saveState();
    renderReport();
    return;
  }
  state.index += 1;
  saveState();
  renderQuestion();
});
previous.addEventListener("click", () => {
  if (state.index === 0) {
    renderHome();
    return;
  }
  state.index -= 1;
  saveState();
  renderQuestion();
});
byId("restart").addEventListener("click", () => {
  if (!window.confirm("清除本次答案，重新开始测试？")) return;
  state = { index: 0, responses: questions.map(() => null), finished: false };
  saveState();
  renderQuestion();
});
byId("share").addEventListener("click", async () => {
  const status = byId("share-status");
  if (location.protocol === "file:") {
    status.textContent = "网站上线后，可以复制它的公开链接。";
    return;
  }
  const link = new URL("./", location.href).href;
  try {
    await navigator.clipboard.writeText(link);
    status.textContent = "链接已复制，可以粘贴到微信聊天。";
  } catch {
    status.textContent = `请复制这个链接：${link}`;
  }
});
byId("about-button").addEventListener("click", () => byId("about").showModal());

function drawCompass() {
  const canvas = byId("compass");
  const { width, height } = canvas.getBoundingClientRect();
  if (!width || !height) return;
  const density = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * density);
  canvas.height = Math.round(height * density);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(density, density);
  ctx.translate(width / 2, height / 2);
  const radius = Math.min(height * .35, width * .32);
  const labels = Object.values(dimensions).map(({ name }) => name);
  const point = (index, distance) => {
    const angle = -Math.PI / 2 + index * Math.PI / 3;
    return [Math.cos(angle) * distance, Math.sin(angle) * distance];
  };
  const polygon = (lengths) => {
    ctx.beginPath();
    lengths.forEach((length, i) => {
      const [x, y] = point(i, length);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
  };
  ctx.strokeStyle = "#aebdad";
  for (const scale of [.25, .5, .75, 1]) {
    polygon(labels.map(() => radius * scale));
    ctx.stroke();
  }
  labels.forEach((label, i) => {
    const [x, y] = point(i, radius);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    const [labelX, labelY] = point(i, radius + 24);
    ctx.fillStyle = "#344d3e";
    ctx.font = '600 12px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, labelX, labelY);
  });
  const lengths = [.82, .60, .71, .48, .78, .64].map((scale) => scale * radius);
  polygon(lengths);
  ctx.fillStyle = "#6c8b745c";
  ctx.fill();
  ctx.strokeStyle = "#406951";
  ctx.lineWidth = 1.6;
  ctx.stroke();
  lengths.forEach((length, i) => {
    ctx.beginPath();
    ctx.arc(...point(i, length), 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#a4472a";
    ctx.fill();
  });
}

window.addEventListener("resize", drawCompass);
renderHome();
