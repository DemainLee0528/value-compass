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
  ["周五下班，群里突然甩来一张今晚出发的低价车票。你的第一反应？",
    ["autonomy","去也行，但我想留一天按自己的节奏走。"],
    ["exploration","买票。到了再找当地人问哪里好玩。"],
    ["security","先看末班车和住宿，回程有着落我就去。"]],
  ["异地的朋友发来一句「今天有点烦」。你刚到一个完全陌生的街区，接下来两小时没安排。",
    ["exploration","随手发张街景约朋友云逛，把这条街走成一次小冒险。"],
    ["security","找家熟悉的连锁店坐下，先把回住处的路线弄清楚，再慢慢回。"],
    ["care","找个安静的地方打过去，今天的闲逛可以改天。"]],
  ["合租冰箱只剩一层空位。一人每周备餐，另一人天天加班，临时买不到饭。你会怎么分？",
    ["security","各有固定区域，再留一小块给临时放东西。"],
    ["care","这周先让加班的人多放一点，下周再商量。"],
    ["fairness","按实际占用量谈好分法，每个人都按同一标准来。"]],
  ["小组作品进了决赛。主办方只给一个上台名额：最熟内容的人紧张，最会讲的人做得最少。",
    ["care","先私下问最熟内容的人想不想试，我可以陪练。"],
    ["fairness","三个候选人都试讲一遍，按事先说好的标准选。"],
    ["achievement","让最会讲的人上台，团队一起把稿子磨到最好。"]],
  ["你做的短片意外火了。平台邀你拍续集，要求把原班同学的出镜和署名压缩。你先谈什么？",
    ["fairness","先把贡献和署名谈清楚，原班同学一起确认。"],
    ["achievement","先谈制作资源和发行，让这次有机会拍出更好的成片。"],
    ["autonomy","先确认我有最终剪辑权，想拍什么由我决定。"]],
  ["你收到一张能报任意课程的券，三门课都在同一晚。你会选哪门？",
    ["achievement","我已会一点的摄影，想认真做一套能投展的作品。"],
    ["autonomy","工作上用不到的木工，我一直想亲手做一张桌子。"],
    ["exploration","即兴戏剧。我完全想象不到第一节课会发生什么。"]],
  ["朋友临时把你的生日局凑成了十人大桌，你原本只想和两个人吃饭。你会怎么回？",
    ["care","先谢谢他张罗，私下问能不能一起把聚会拆成两场。"],
    ["autonomy","直接告诉大家我今年想小过，人数就按原来的来。"],
    ["achievement","干脆把这场聚会办起来，我来订桌、排流程，把它办得有意思。"]],
  ["游戏队伍已经连输三局，下一局还能换一次打法。你提议？",
    ["autonomy","这次让我来指挥，按我看见的机会打一次。"],
    ["fairness","三个提案各给一分钟，投票决定，谁声音大都一样。"],
    ["exploration","试一个平时根本不敢用的阵容，看看会发生什么。"]],
  ["搬进同一栋楼，三间房租金一样。你先选哪间？",
    ["fairness","隔音和采光都中等，公共区域怎么用有大家一起定的规则。"],
    ["exploration","窗外就是旧街区，拐几个弯就有没去过的小店。"],
    ["security","交通、门锁和维修都靠谱，住进去几乎不用操心。"]],
  ["你和朋友做的小摊第一次赚到钱。现金只够做一件事。",
    ["exploration","试一批从没卖过的新口味，看谁愿意买。"],
    ["security","留着付下个月的摊位费，淡季也有现金。"],
    ["fairness","先照事前商量的分成结给每个人。"]],
  ["租约快到期。一个常一起做饭的朋友请你多住半年，现房其实一直有小毛病。",
    ["security","先问房东能不能把续租和维修条件写进合同。"],
    ["achievement","换到离工作室更近的地方，把通勤时间还给我的作品。"],
    ["care","如果关系很重要，我愿意再住半年，先跟朋友聊聊他的处境。"]],
  ["社区电影节放映前，预算只剩一笔。你希望用在哪儿？",
    ["achievement","找专业调色和声音师，把几部重点短片做到能投别的影展。"],
    ["care","留给字幕、无障碍动线和接送，让平时来不了的人也能看。"],
    ["autonomy","做一个开放放映时段，把选片和主持交给创作者自己。"]],
  ["一份做了半年的作品被退回，评审说改成流行风格就有机会入选。你愿意先做什么？",
    ["autonomy","保留最想表达的部分，找一个适合这个版本的场合。"],
    ["achievement","请评审指出最影响效果的两处，集中把它们磨到过关。"],
    ["fairness","先问清评审标准，希望公开说明原版和改版按什么规则比。"]],
  ["你有一个完全自由的半天。手机里同时跳出三条消息，你会先回哪条？",
    ["achievement","距离作品征集截止还有六小时，组员问要不要把最后一段剪出来。"],
    ["exploration","朋友在河对岸发现一间今天才开的展厅，问要不要现场碰头。"],
    ["care","邻居刚搬过来，问有没有人能陪他走一遍附近的菜市场。"]],
  ["朋友拉你参加一场江边夜间露天电影。出门前下起小雨，你倾向？",
    ["exploration","带把伞先去看看，下雨的露天电影听着也挺有意思。"],
    ["security","提议直接换到附近室内场次，省得大家白跑一趟。"],
    ["autonomy","告诉他们我今晚更想一个人待着，让他们照自己喜欢的安排。"]],
  ["群聊里两个人聊着聊着吵起来。你是管理员，群里还在不停弹消息。",
    ["fairness","先对照群规，给两边同样的时间把情况说清楚。"],
    ["autonomy","告诉大家我只负责群务，把是否继续谈交回当事人。"],
    ["achievement","把争论收敛到一个能决定的问题，争取今晚给项目一个明确结论。"]],
  ["朋友用了你推荐的摄影师，成片不满意。摄影师说返工会耽误下一单。你愿意帮忙谈哪件事？",
    ["care","问朋友哪个画面最舍不得，然后帮他争取先修那几张。"],
    ["fairness","和双方对一下原来的约定，按同一标准确定该返工的范围。"],
    ["security","争取约定一个明确交付日期和补救方案，双方好安排后续。"]],
  ["周末你只能参加一个朋友组织的小活动。哪张邀请最容易让你出门？",
    ["security","熟悉的几个人在老地方吃饭，几点散场都说好了。"],
    ["care","给准备离开这座城的朋友办个小聚，大家带一张和他的合照。"],
    ["exploration","蒙眼听歌识曲，地点在一间晚上才开放的旧剧院。"]],
  ["如果家附近有间小铺能免费用一个月，你最想拿它做什么？",
    ["exploration","每周换一种玩法，这周是交换怪东西，下周是即兴演出。"],
    ["fairness","做开放工作间，把借用时段和材料费用写清楚，大家按同一方式预约。"],
    ["autonomy","开一间只在我方便时营业的独立小店，摆我真正想做的东西。"]],
  ["邻里一起修天台花园，周末突然下雨。只剩半天，该把人手用在哪里？",
    ["security","先排掉积水并加固花架，等天晴再补工程。"],
    ["autonomy","让每个人挑最愿意做的一小块，当天能做多少算多少。"],
    ["fairness","重排值班表，照顾先前已经出过力的人。"]],
  ["好友的演出临时缺人手，偏偏你的小组今晚要冲最后一轮。你先确认什么？",
    ["care","先问好友缺的是哪一段，我愿意挪出那一段时间。"],
    ["achievement","先带小组完成最影响成败的部分，再看能不能抽身。"],
    ["security","把两边的时间和备用人手问清楚，确定可兑现再答应。"]],
  ["你接手一个快散掉的读书会。第一周，你只来得及做一个改变。",
    ["fairness","把选书和主持改成轮值，让平时沉默的人也有一票。"],
    ["exploration","来一场盲选夜，每个人带一本只露出三句话的书。"],
    ["care","先问几位最近没来的人，看看什么让他们愿意回来。"]],
  ["三位朋友要一起拍一部周末短片，都愿意让你决定风格。你会提议拍什么？",
    ["autonomy","拍一个自己压在抽屉里的剧本，风格可以很个人。"],
    ["security","从熟悉的场地和设备出发，做一部肯定能按时剪完的片子。"],
    ["achievement","选一个难度刚够得着的剧本，争取拍出能送展的版本。"]],
  ["隔壁社区办夜市，第一次给你留一个摊位。你最想邀请谁来搭档？",
    ["achievement","手艺最强的人，我们一起把一个招牌产品做出来。"],
    ["care","平时总想试着摆摊却缺个搭档的朋友，一起迈出第一步。"],
    ["exploration","刚认识、做的东西和我完全不同的人，看看能拼出什么。"]],
];

const storageKey = "value-compass-v2";
const byId = (id) => document.getElementById(id);
const home = byId("home");
const quiz = byId("quiz");
const report = byId("report");
const start = byId("start");
const answers = byId("answers");
const previous = byId("previous");
const heading = byId("question");
const optionLetters = ["A", "B", "C"];

function loadState() {
  const fresh = { index: 0, responses: questions.map(() => null), finished: false };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || !Array.isArray(saved.responses) || saved.responses.length !== questions.length) return fresh;
    if (!saved.responses.every((value, index) => value === null ||
      (Number.isInteger(value) && value >= 0 && value < questions[index].length - 1))) return fresh;
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
  previous.querySelector("span").textContent = state.index === 0 ? "回到首页" : "上一题";
}

function renderQuestion() {
  const [prompt, ...choices] = questions[state.index];
  heading.textContent = prompt;
  answers.innerHTML = choices.map(([, label], value) => {
    const selected = state.responses[state.index] === value;
    return `<button type="button" class="answer${selected ? " selected" : ""}" data-choice="${value}" aria-pressed="${selected}"><span class="answer-letter" aria-hidden="true">${optionLetters[value]}</span><span>${label}</span></button>`;
  }).join("");
  previous.disabled = false;
  updateQuestionControls();
  showScreen(quiz, heading);
}

function getScores(responses) {
  return Object.entries(dimensions).map(([key, dimension]) => {
    let opportunities = 0;
    let chosen = 0;
    questions.forEach(([, ...choices], index) => {
      if (choices.some(([dimensionKey]) => dimensionKey === key)) opportunities += 1;
      if (choices[responses[index]]?.[0] === key) chosen += 1;
    });
    const points = Math.round(chosen / opportunities * 100);
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
answers.addEventListener("click", (event) => {
  const choice = event.target.closest("button[data-choice]");
  if (!choice || choice.disabled) return;
  state.responses[state.index] = Number(choice.dataset.choice);
  for (const button of answers.children) {
    button.classList.toggle("selected", button === choice);
    button.setAttribute("aria-pressed", String(button === choice));
    button.disabled = true;
  }
  previous.disabled = true;
  saveState();
  updateQuestionControls();
  window.setTimeout(advanceQuestion, 210);
});

function advanceQuestion() {
  if (state.index === questions.length - 1) {
    state.finished = true;
    saveState();
    renderReport();
    return;
  }
  state.index += 1;
  saveState();
  renderQuestion();
}
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
