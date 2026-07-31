const SITE_PASSWORD = 'novalA77'
const WA_OWNER = '2347046855205'
const WA_ASSISTANT = '2349121419046'
const WA_MSG = encodeURIComponent("Hello there! I just came across Nova Py-Hub, it looks great! I'd love to learn more about Python programming. Can you help me get started?")

const ls = {
  get(k, d=null) { try { const v = localStorage.getItem('nph_'+k); return v ? JSON.parse(v) : d } catch { return d } },
  set(k, v) { localStorage.setItem('nph_'+k, JSON.stringify(v)) },
  del(k) { localStorage.removeItem('nph_'+k) }
}

const progress = {
  get() { return ls.get('progress', { beginner:[], intermediate:[], advanced:[], professional:[] }) },
  save(p) { ls.set('progress', p) },
  complete(level, num) {
    const p = this.get()
    if (!p[level].includes(num)) { p[level].push(num); p[level].sort((a,b)=>a-b) }
    this.save(p)
    return p
  },
  isComplete(level, num) { return this.get()[level].includes(num) },
  levelComplete(level) {
    const counts = { beginner:10, intermediate:10, advanced:10, professional:12 }
    return this.get()[level].length >= counts[level]
  }
}

function initPasswordGate() {
  const gate = document.getElementById('passwordGate')
  const input = document.getElementById('gateInput')
  const err = document.getElementById('gateErr')
  const btn = document.getElementById('gateBtn')
  const step1 = document.getElementById('gateStep1')
  const step2 = document.getElementById('gateStep2')
  const regFirst = document.getElementById('regFirst')
  const regLast = document.getElementById('regLast')
  const regAge = document.getElementById('regAge')
  const regBtn = document.getElementById('regBtn')
  const regErr = document.getElementById('regErr')
  const ageNote = document.getElementById('ageNote')
  const gateTitle = document.getElementById('gateTitle')
  const gateDesc = document.getElementById('gateDesc')
  const gateIcon = document.getElementById('gateIcon')

  const saved = ls.get('student')
  if (!gate || (ls.get('auth') && saved)) { if(gate) gate.classList.add('hidden'); document.body.style.overflow = ''; return }
  document.body.style.overflow = 'hidden'

  if (ls.get('auth') && !saved) {
    showRegStep()
  }

  function showRegStep() {
    step1.style.display = 'none'
    step2.classList.add('active')
    gateIcon.textContent = '📝'
    gateTitle.textContent = 'Almost there!'
    gateDesc.textContent = 'Tell us about yourself'
    setTimeout(() => regFirst.focus(), 300)
  }

  function validateAge(age) {
    const n = parseInt(age)
    if (isNaN(n) || n < 1) return { valid: false, msg: 'Please enter a valid age' }
    if (n < 18) return { valid: false, msg: 'You must be 18 or older to access this course' }
    if (n > 120) return { valid: false, msg: 'Please enter a valid age' }
    return { valid: true, msg: '' }
  }

  regAge.oninput = () => {
    const res = validateAge(regAge.value)
    ageNote.textContent = res.msg || (parseInt(regAge.value) >= 18 ? '✅ Age verified' : '')
    ageNote.className = 'age-note' + (res.valid ? ' pass' : regAge.value ? ' fail' : '')
  }

  regBtn.onclick = () => {
    const first = regFirst.value.trim()
    const last = regLast.value.trim()
    const age = regAge.value.trim()
    if (!first || !last || !age) { regErr.textContent = 'Please fill in all fields'; return }
    const res = validateAge(age)
    if (!res.valid) { regErr.textContent = res.msg; return }
    regErr.textContent = ''
    ls.set('student', { first, last, age: parseInt(age) })
    ls.set('auth', true)
    gate.classList.add('hidden')
    document.body.style.overflow = ''
    setTimeout(() => showDeviceModal(), 500)
  }

  regFirst.onkeydown = e => { if (e.key === 'Enter') regLast.focus() }
  regLast.onkeydown = e => { if (e.key === 'Enter') regAge.focus() }
  regAge.onkeydown = e => { if (e.key === 'Enter') regBtn.click() }

  btn.onclick = () => {
    if (input.value === SITE_PASSWORD) {
      err.textContent = ''
      showRegStep()
    } else {
      err.textContent = 'Wrong password. Try again.'
      input.value = ''
      input.focus()
      if (navigator.vibrate) navigator.vibrate(200)
    }
  }
  input.onkeydown = e => { if (e.key === 'Enter') btn.click() }
  input.focus()
}

function showDeviceModal() {
  const m = document.getElementById('deviceModal')
  if (!m) return
  if (ls.get('device')) { showDeviceSwitcher(); return }
  m.classList.add('active')
}

function showDeviceSwitcher() {
  const m = document.getElementById('deviceModal')
  if (!m) return
  m.classList.add('active')
}

window.showDeviceSwitcher = showDeviceSwitcher

function selectDevice(type) {
  ls.set('device', type)
  document.getElementById('deviceModal').classList.remove('active')
  initDeviceTips()
  const tips = document.getElementById('deviceTips')
  if (tips) tips.style.display = 'block'
}

window.selectDevice = selectDevice

function getDeviceType() { return ls.get('device', 'pc') }

function initTheme() {
  const toggle = document.getElementById('themeToggle')
  if (!toggle) return
  const isDark = ls.get('darkMode', true)
  if (!isDark) document.body.classList.add('light')
  toggle.textContent = isDark ? '☀' : '☾'
  toggle.onclick = () => {
    const dark = document.body.classList.toggle('light')
    ls.set('darkMode', !dark)
    toggle.textContent = dark ? '☾' : '☀'
  }
}

function initNav() {
  const toggle = document.querySelector('.nav-toggle')
  const links = document.querySelector('.nav-links')
  if (toggle && links) {
    toggle.onclick = () => links.classList.toggle('open')
    document.addEventListener('click', e => { if (!toggle.contains(e.target) && !links.contains(e.target)) links.classList.remove('open') })
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')))
  }
}

/* Syntax Highlighting */
const PY_KEYWORDS = 'and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|True|False|None'
const PY_BUILTINS = 'print|len|range|type|int|str|float|bool|list|dict|set|tuple|input|open|sum|min|max|abs|sorted|enumerate|zip|map|filter|reduce|isinstance|hasattr|getattr|setattr|super|property|staticmethod|classmethod|object|super|__init__|__str__|__repr__|__add__|__eq__|__len__|__getitem__|__setitem__'

function highlightPython(code) {
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const kw = new RegExp('\\b('+PY_KEYWORDS+')\\b','g')
  const bu = new RegExp('\\b('+PY_BUILTINS+')\\b','g')
  const dec = /^(\s*@\w+)/gm
  const num = /\b(\d+\.?\d*)\b/g
  const str = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g
  const cm = /(#.*)$/gm
  const op = /([+\-*/%=<>!&|^~]+)/g
  const sep = /([\(\)\[\]\{\},:;])/g
  const patterns = [
    {re:str,cl:'str'},{re:cm,cl:'cm'},{re:dec,cl:'dec'},
    {re:kw,cl:'kw'},{re:bu,cl:'bu'},{re:num,cl:'num'},
    {re:op,cl:'op'},{re:sep,cl:'sep'}
  ]
  let tokens = []
  for (const p of patterns) {
    const r = new RegExp(p.re.source, p.re.flags)
    let m; while ((m = r.exec(code)) !== null)
      tokens.push({s:m.index,e:m.index+m[0].length,c:p.cl,t:m[0]})
  }
  tokens.sort((a,b) => a.s-b.s || (b.e-b.s)-(a.e-a.s))
  let out = '', last = 0
  for (const t of tokens) {
    if (t.s < last) continue
    if (t.s > last) out += esc(code.slice(last, t.s))
    out += '<span class="'+t.c+'">'+esc(t.t)+'</span>'
    last = t.e
  }
  if (last < code.length) out += esc(code.slice(last))
  return out
}

function initCodeBlocks() {
  document.querySelectorAll('pre:not([data-highlighted])').forEach(pre => {
    pre.dataset.highlighted = 'true'
    if (!pre.closest('.code-block-wrap')) {
      const wrap = document.createElement('div')
      wrap.className = 'code-block-wrap'
      pre.parentNode.insertBefore(wrap, pre)
      wrap.appendChild(pre)
    }
  })
}

function addCopyButtons() {
  document.querySelectorAll('.code-block-wrap').forEach(wrap => {
    if (wrap.querySelector('.code-block-header')) return
    const pre = wrap.querySelector('pre')
    const header = document.createElement('div')
    header.className = 'code-block-header'
    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.textContent = 'Copy'
    btn.onclick = () => {
      const code = pre.textContent
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!'
        btn.classList.add('copied')
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied') }, 2000)
      }).catch(() => {
        const ta = document.createElement('textarea')
        ta.value = code; document.body.appendChild(ta); ta.select(); execCommand('copy'); ta.remove()
        btn.textContent = 'Copied!'; btn.classList.add('copied')
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied') }, 2000)
      })
    }
    header.appendChild(btn)
    wrap.insertBefore(header, pre)
  })
}
/* Quiz Engine */
class QuizEngine {
  constructor(containerId, questions) {
    this.el = document.getElementById(containerId)
    if (!this.el || !questions || !questions.length) return
    this.questions = questions
    this.current = 0
    this.score = 0
    this.answered = false
    this.answers = []
    this.render()
  }

  render() {
    const q = this.questions[this.current]
    if (!q) { this.showResult(); return }
    this.answered = false
    const letters = ['A', 'B', 'C', 'D']
    this.el.innerHTML = `
      <div class="quiz-title">📝 Quick Quiz</div>
      <div class="quiz-counter">Question ${this.current + 1} of ${this.questions.length}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">${q.options.map((o, i) => `
        <div class="quiz-opt" data-idx="${i}">
          <span class="opt-letter">${letters[i]}</span>
          <span>${o}</span>
        </div>`).join('')}
      </div>
      <div class="quiz-explain" id="quizExplain"></div>
      <button class="quiz-next" id="quizNext">Next →</button>`

    this.el.querySelectorAll('.quiz-opt').forEach(opt => {
      opt.onclick = () => this.check(parseInt(opt.dataset.idx))
    })
  }

  check(idx) {
    if (this.answered) return
    this.answered = true
    const q = this.questions[this.current]
    const opts = this.el.querySelectorAll('.quiz-opt')
    const ex = this.el.querySelector('#quizExplain')
    const next = this.el.querySelector('#quizNext')

    opts.forEach((o, i) => { o.classList.add('disabled') })

    if (idx === q.a) {
      opts[idx].classList.add('correct')
      this.score++
      ex.className = 'quiz-explain show correct'
      ex.textContent = '✓ Correct! ' + q.e
    } else {
      opts[idx].classList.add('wrong')
      opts[q.a].classList.add('correct')
      ex.className = 'quiz-explain show wrong'
      ex.textContent = '✗ ' + q.e
      if (navigator.vibrate) navigator.vibrate(150)
    }

    this.answers.push({ q: this.current, selected: idx, correct: idx === q.a })
    next.classList.add('show')
    next.onclick = () => {
      this.current++
      this.render()
    }
  }

  showResult() {
    const total = this.questions.length
    const pct = Math.round((this.score / total) * 100)
    const grade = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Keep Practicing!' : 'Try Again!'
    this.el.innerHTML = `
      <div class="quiz-result show">
        <h3>${grade}</h3>
        <div class="score">${this.score}/${total}</div>
        <div class="score-detail">${pct}% Correct</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <p style="color:var(--text2);font-size:.9rem">${pct >= 60 ? '🎉 Lesson completed!' : 'Review the material and try again.'}</p>
      </div>`
    this.onComplete(this.score, total, pct)
  }

  onComplete(score, total, pct) {
    if (pct >= 60) {
      const level = document.body.dataset.level
      const num = parseInt(document.body.dataset.lesson)
      if (level && num) {
        progress.complete(level, num)
        console.log(`✅ ${level} lesson ${num} completed`)
      }
    }
  }
}

function initQuizzes() {
  const quizData = document.getElementById('quizData')
  if (!quizData) return
  try {
    const questions = JSON.parse(quizData.textContent)
    new QuizEngine('quizContainer', questions)
  } catch(e) { console.error('Quiz error:', e) }
}

function initDeviceTips() {
  const device = getDeviceType()
  const tips = document.getElementById('deviceTips')
  if (!tips) return
  const msgs = {
    pc: { title: '🖥 PC User', msg: 'Download Python from python.org. Install VS Code or PyCharm for the best coding experience. Use the terminal to run your scripts with "python filename.py".' },
    android: { title: '📱 Android User', msg: 'Install Termux from F-Droid (not Google Play — it\'s outdated). Open Termux and run: pkg update && pkg install python. You get a full Linux terminal on your phone!' },
    iphone: { title: '🍎 iPhone User', msg: 'Install Pythonista or Pyto from the App Store. Both include a built-in code editor and Python interpreter. You can also use online REPLs like Replit or Google Colab.' },
    tablet: { title: '📟 Tablet User', msg: 'Use the browser-based REPL at replit.com or install PyDroid 3 (Android) / Pythonista (iPad). Tablets work great with a Bluetooth keyboard for coding.' }
  }
  const m = msgs[device] || msgs.pc
  tips.innerHTML = `<h3>${m.title}</h3><p>${m.msg}</p>`
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.onclick = () => q.parentElement.classList.toggle('active')
  })
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.onclick = e => {
      e.preventDefault()
      const t = document.querySelector(a.getAttribute('href'))
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

function initProgressDisplay() {
  const el = document.getElementById('progressDisplay')
  if (!el) return
  const p = progress.get()
  const levels = [
    { key: 'beginner', name: 'Beginner', total: 10 },
    { key: 'intermediate', name: 'Intermediate', total: 10 },
    { key: 'advanced', name: 'Advanced', total: 10 },
    { key: 'professional', name: 'Professional', total: 12 }
  ]
  el.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;">' +
    levels.map(l => `<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;padding:1rem;text-align:center;">
      <div style="font-size:.85rem;color:var(--text2);margin-bottom:.3rem;">${l.name}</div>
      <div style="font-size:1.5rem;font-weight:800;color:${p[l.key].length >= l.total ? 'var(--gold)' : 'var(--text)'}">${p[l.key].length}/${l.total}</div>
      <div style="height:4px;background:var(--bg3);border-radius:2px;margin-top:.5rem;overflow:hidden;">
        <div style="height:100%;width:${(p[l.key].length/l.total)*100}%;background:linear-gradient(90deg,#FFD700,#2196F3);border-radius:2px;transition:width .5s;"></div>
      </div>
    </div>`).join('') + '</div>'
}

/* Auto-inject missing elements */
function ensureElements() {
  if (!document.getElementById('themeToggle') && document.querySelector('.nav-links')) {
    const btn = document.createElement('button'); btn.id = 'themeToggle'; btn.className = 'theme-toggle'; btn.textContent = '☀'
    document.querySelector('.nav-links').appendChild(btn)
    btn.onclick = () => {
      const dark = document.body.classList.toggle('light')
      ls.set('darkMode', !dark)
      btn.textContent = dark ? '☾' : '☀'
    }
  }
  if (!document.getElementById('deviceTips') && document.querySelector('.lesson-page')) {
    const d = document.createElement('div'); d.id = 'deviceTips'; d.style.cssText = 'max-width:800px;margin:0 auto 1.5rem;padding:0 1.2rem'
    const h = document.querySelector('.lesson-page .lesson-content h1')
    if (h) h.parentNode.insertBefore(d, h.nextSibling)
  }
  if (!document.getElementById('quizContainer') && document.querySelector('.lesson-page')) {
    const q = document.createElement('div'); q.id = 'quizContainer'; q.className = 'quiz-section'
    const nav = document.querySelector('.lesson-nav')
    const content = document.querySelector('.lesson-content')
    if (nav) content.insertBefore(q, nav)
  }
  /* Add WhatsApp FAB if on non-index page and no FAB exists */
  const gate = document.getElementById('passwordGate')
  if (!document.querySelector('.whatsapp-fab') && (!gate || gate.classList.contains('hidden'))) {
    const w = document.createElement('div'); w.className = 'whatsapp-fab left'
    w.innerHTML = `<a class="whatsapp-btn" href="https://wa.me/2347046855205?text=${encodeURIComponent("Hello there! I just came across Nova Py-Hub, it looks great! I'd love to learn more.")}" target="_blank"><span class="wa-icon">📞</span><span class="wa-label">Owner</span></a><a class="whatsapp-btn" href="https://wa.me/2349121419046?text=${encodeURIComponent("Hello there! I just came across Nova Py-Hub, it looks great! I'd love to learn more.")}" target="_blank"><span class="wa-icon">💬</span><span class="wa-label">Assistant</span></a>`
    document.body.appendChild(w)
  }
}

/* Fallback quiz for pages without quiz data */
function ensureQuizFallback() {
  const c = document.getElementById('quizContainer')
  const d = document.getElementById('quizData')
  if (!c || d) return
  const level = document.body.dataset.level || 'beginner'
  const num = parseInt(document.body.dataset.lesson) || 1
  const fallbacks = {
    beginner: [
      { q:"What is the correct way to create a variable in Python?", options:["var x = 5","x = 5","int x = 5","variable x == 5"], a:1, e:"In Python, you create variables by simply assigning a value: x = 5. No type declaration needed." },
      { q:"Which data type would you use for a whole number?", options:["float","string","int","bool"], a:2, e:"int (integer) is used for whole numbers like 42, -7, or 0." },
      { q:"What does the len() function return?", options:["The last element","The length of a sequence","The largest number","A random number"], a:1, e:"len() returns the number of items in a sequence (string, list, tuple, etc.)." },
      { q:"Which operator is used for exponentiation?", options:["^","**","*","^^"], a:1, e:"** is the exponentiation operator. 2**3 equals 8." },
      { q:"What is the output of print(type(3.14))?", options:["<class 'int'>","<class 'float'>","<class 'str'>","<class 'decimal'>"], a:1, e:"3.14 is a float (decimal number), so type(3.14) returns <class 'float'>." }
    ],
    intermediate: [
      { q:"What does *args allow a function to do?", options:["Accept keyword arguments","Accept any number of positional arguments","Create a new list","Return multiple values"], a:1, e:"*args collects any number of positional arguments into a tuple." },
      { q:"Which of these creates a list of squares?", options:["[x**2 for x in range(5)]","for x in range(5): x**2","list(squares for 5)","range(5).square()"], a:0, e:"List comprehension [x**2 for x in range(5)] creates [0, 1, 4, 9, 16]." },
      { q:"What does the with statement do?", options:["Creates a new variable","Handles file operations safely","Defines a function","Loops through items"], a:1, e:"The with statement ensures proper acquisition/release of resources, commonly used for file handling." }
    ],
    advanced: [
      { q:"What is a decorator in Python?", options:["A design pattern","A function that modifies another function","A type of loop","A data structure"], a:1, e:"A decorator is a function that takes another function and extends its behavior without modifying it." },
      { q:"Which module is used for regular expressions?", options:["regex","re","regexp","pattern"], a:1, e:"The 're' module provides regular expression operations in Python." },
      { q:"What does asyncio allow you to do?", options:["Run threads","Write asynchronous code","Create classes","Sort data"], a:1, e:"asyncio provides infrastructure for writing single-threaded concurrent code using async/await." }
    ],
    professional: [
      { q:"What does SOLID stand for?", options:["A set of OOP design principles","A programming language","A database system","A testing framework"], a:0, e:"SOLID is an acronym for five object-oriented design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion." },
      { q:"Which pattern ensures a class has only one instance?", options:["Factory","Observer","Singleton","Strategy"], a:2, e:"The Singleton pattern ensures a class has only one instance and provides a global point of access to it." }
    ]
  }
  const qs = fallbacks[level]
  if (!qs || !qs.length) return
  try { new QuizEngine('quizContainer', qs) } catch(e) { console.log('Quiz fallback:', e) }
}

/* Fade-in animation */
function initScrollAnim() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)' }
    })
  }, { threshold: .1 })
  document.querySelectorAll('.offering-card, .stat-card, .gallery-item, .lesson-item').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'opacity .6s, transform .6s'
    obs.observe(el)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initPasswordGate()
  initTheme()
  initNav()
  ensureElements()
  initCodeBlocks()
  addCopyButtons()
  initQuizzes()
  ensureQuizFallback()
  initDeviceTips()
  initFAQ()
  initSmoothScroll()
  initProgressDisplay()
  initScrollAnim()
})
