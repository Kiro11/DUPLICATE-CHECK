(function () {
    const QUESTIONS = [
        {
tag:  'Q1 · IMPULSE CHECK',
      prompt: 'How did this item end up in your cart?',
           options: [
        { label: "I've been planning this purchase for a while", value: 0, flag: 'this was already on your list' },
        { label: 'I found it while scrolling, minutes ago', value: 2, flag: 'there was no plan — you just found it' }
      ]
    },
    {
       tag: 'Q2 · DUPLICATE CHECK',
      prompt: 'Do you already own something that does this job?',
      options: [
        { label: "No, there's a genuine gap", value: 0, 
            flag: 'it fills a genuine gap' },
        { label: 'Yes, something similar already works', value: 2, 
            flag: 'you already own something that does this' }
      ]
    },
    {
 tag: 'Q3 . SALES PRESSURE',
prompt:'Is anything on the page pushing you to decide fast?',
      options: [
        { label: "No, I'm browsing at my own pace", value: 0, flag: 'no artificial urgency' },
        { label: 'A countdown, "low stock", or a flash sale', value: 2, flag: 'a countdown or scarcity tactic is pushing the decision' }
      ]
    },
    {
      tag: 'Q4 · AFFORDABILITY',
      prompt: 'Could you pay for this right now without checking your balance?',
      options: [
        { label: 'Yes, without a second thought', value: 0, flag: 'you can afford it without a second thought' },
        { label: "I'd want to check first", value: 1, flag: "you'd need to check your balance first" }
      ]
   },
    {
tag: 'Q5 · 30-DAY TEST',
  prompt: 'Will you still want this in 30 days?',
      options: [
  { label: 'Yes, definitely', value: 0, flag: "you're confident it'll last" },
        { label: "Probably, though I'm not fully certain", value: 1, flag: "you're only half-sure it'll last" },
        { label: 'Honestly, I have no idea', value: 2, flag: "you can't say you'll still want it in a month" }
      ]
    },
    {
tag: 'Q6 · OUTSIDE VIEW',
      prompt: 'If a friend said they were buying this, what would you tell them?',
      options: [
        { label: 'Good for them — smart buy', value: 0, flag: 'a friend would call it a smart buy' },
        { label: '\u2019d gently ask if they needed it', value: 1, flag: 'a friend would ask a few questions first' },
        { label: "I'd tell them to sleep on it", value: 2, flag: 'a friend would tell you to sleep on it' }
      ]
    }
    ];
      const MAX_SCORE = QUESTIONS.reduce(function (sum, q) {
    return sum + Math.max.apply(null, q.options.map(function (o) { return o.value; }));
  }, 0);

 const el = {
    meta: document.getElementById('meta'),
    itemField: document.getElementById('itemField'),
    priceField: document.getElementById('priceField'),
    itemInput: document.getElementById('itemInput'),
    priceInput: document.getElementById('priceInput'),
    tape: document.getElementById('tape'),
    stage: document.getElementById('stage'),
    startBtn: document.getElementById('startBtn'),
    tagline: document.getElementById('tagline'),
    receipt: document.getElementById('receipt')
  };
let qIndex = 0;
let answers = [];
const receiptNo = Math.floor(1000 + Math.random()* 8999);

function stampMeta() {
const now = new Data();
 const date = now.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    el.meta.textContent = date + ' · ' + time + ' · NO. ' + receiptNo;
  }
stampMeta();
  el.itemInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); el.priceInput.focus(); }
  });
  el.priceInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); start(); }
  });

  el.startBtn.addEventListener('click', start);

  function start() {
    const item = el.itemInput.value.trim();
    if (!item) {
      el.itemInput.classList.add('error');
      el.itemInput.focus();
      el.itemInput.addEventListener('animationend', function () {
        el.itemInput.classList.remove('error');
      }, { once: true });
      return;
    }

    el.itemInput.disabled = true;
    el.priceInput.disabled = true;
    el.itemField.classList.add('locked');
    el.priceField.classList.add('locked');
    el.tagline.textContent = 'checking the impulse, one line at a time';

    qIndex = 0;
    answers = [];
    renderQuestion();
  }

  function renderQuestion() {
    const q = QUESTIONS[qIndex];
    const wrap = document.createElement('div');

    const tag = document.createElement('p');
    tag.className = 'q-tag';
    tag.textContent = q.tag + ' · ' + (qIndex + 1) + '/' + QUESTIONS.length;
    wrap.appendChild(tag);

    const prompt = document.createElement('p');
    prompt.className = 'q-prompt';
    prompt.textContent = q.prompt;
    wrap.appendChild(prompt);

    const opts = document.createElement('div');
    opts.className = 'q-options';
    q.options.forEach(function (opt) {
      const btn = document.createElement('button');
      btn.className = 'q-option';
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.addEventListener('click', function () { answer(q, opt); });
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);

    el.stage.replaceChildren(wrap);
}
function answer(question, option) {
    answers.push(option);
    printLine(question.tag.split(' · ')[0], option.label, option.value, false);
    qIndex++;
    if (qIndex < QUESTIONS.length) {
      renderQuestion();
    } else {
      finish();
    }
  }

  function printLine(tagShort, text, pts, isTotal) {
    const line = document.createElement('div');
    line.className = 'line' + (isTotal ? ' total' : '');

    const tagEl = document.createElement('span');
    tagEl.className = 'line-tag';
    tagEl.textContent = tagShort;

    const aEl = document.createElement('span');
    aEl.className = 'line-a';
    aEl.textContent = text;

    const ptsEl = document.createElement('span');
    ptsEl.className = 'line-pts';
    ptsEl.textContent = (pts === '' ? '' : (pts > 0 ? '+' + pts : String(pts)));

    line.appendChild(tagEl);
    line.appendChild(aEl);
    line.appendChild(ptsEl);
    el.tape.appendChild(line);
  }
function getVerdict(score) {
if(score <=2){
return { key: 'buy', label: 'Buy it', msg: 'this reads like a plan, not an impluse.Go ahead.'};
}
  if (score <= 6) {
      return { key: 'wait', label: 'Wait 24h', msg: "Nothing's wrong with it — but sleep on it. Revisit tomorrow with a clear head." };
    }
    return { key: 'skip', label: 'Skip it', msg: 'Most signs point to impulse, not need. Close the tab.' };
  }

  function finish() {
    const score = answers.reduce(function (s, a) { return s + a.value; }, 0);
    const verdict = getVerdict(score);

    printLine('TOTAL', 'Impulse heat', '', true);
    const totalLine = el.tape.lastElementChild;
    totalLine.querySelector('.line-pts').textContent = score + '/' + MAX_SCORE;

    const heatTrack = document.createElement('div');
    heatTrack.className = 'heat-track';
    const heatFill = document.createElement('div');
    heatFill.className = 'heat-fill';
    heatFill.style.background = 'var(--' + (verdict.key === 'buy' ? 'clarity' : verdict.key === 'wait' ? 'caution' : 'impulse') + ')';
    heatTrack.appendChild(heatFill);
    el.tape.appendChild(heatTrack);
    requestAnimationFrame(function () {
      heatFill.style.width = Math.round((score / MAX_SCORE) * 100) + '%';
    });

    const wrap = document.createElement('div');

    const stamp = document.createElement('div');
    stamp.className = 'stamp ' + verdict.key;
    stamp.textContent = verdict.label;
    wrap.appendChild(stamp);

    const msg = document.createElement('p');
    msg.className = 'result-msg';
    msg.textContent = verdict.msg;
    wrap.appendChild(msg);

    const flags = answers
      .map(function (a, i) { return Object.assign({}, a, { order: i }); })
      .filter(function (a) { return a.value > 0; })
      .sort(function (a, b) { return b.value - a.value || a.order - b.order; })
      .slice(0, 3)
      .map(function (a) { return a.flag; });

    const why = document.createElement('p');
    why.className = 'result-why';
    if (flags.length === 0) {
      why.innerHTML = '<b>No red flags at all</b> — every answer pointed to a clear decision.';
    } else {
      why.innerHTML = '<b>Mostly because:</b> ' + flags.join('; ') + '.';
    }
   


    wrap.appendChild(Why);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.textContent = 'Copy verdict';
    copyBtn.addEventListener('click', function () { copyVerdict(copyBtn, verdict, score); });
    actions.appendChild(copyBtn);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.textContent = 'New receipt';
    resetBtn.addEventListener('click', reset);
    actions.appendChild(resetBtn);

    wrap.appendChild(actions);
    el.stage.replaceChildren(wrap);
    el.tagline.textContent = 'thanks for shopping mindfully';
  }

  function copyVerdict(btn, verdict, score) {
    const item = el.itemInput.value.trim();
    const price = el.priceInput.value.trim();
    const lines = [
      'REGRET RECEIPT',
      'Item: ' + item + (price ? '  ·  Price: ' + price : ''),
      'Verdict: ' + verdict.label + '  (' + score + '/' + MAX_SCORE + ')',
      verdict.msg
    ];
    const text = lines.join('\n');

    const done = function () {
      const original = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = original; }, 1400);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      done();
    } catch (e) {
    }
    document.body.removeChild(ta);
  }







