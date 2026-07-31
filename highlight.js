const fs = require('fs')
const path = require('path')

const PY_KEYWORDS = 'and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|True|False|None'
const PY_BUILTINS = 'print|len|range|type|int|str|float|bool|list|dict|set|tuple|input|open|sum|min|max|abs|sorted|enumerate|zip|map|filter|reduce|isinstance|hasattr|getattr|setattr|super|property|staticmethod|classmethod|object|super|__init__|__str__|__repr__|__add__|__eq__|__len__|__getitem__|__setitem__'

const kw = new RegExp('\\b(' + PY_KEYWORDS + ')\\b', 'g')
const bu = new RegExp('\\b(' + PY_BUILTINS + ')\\b', 'g')
const dec = /^(\s*@\w+)/gm
const num = /\b(\d+\.?\d*)\b/g
const str = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g
const cm = /(#.*)$/gm
const op = /([+\-*/%=<>!|^~]+)/g
const sep = /([\(\)\[\]\{\},:;])/g

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
}

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

const levels = ['beginner', 'intermediate', 'advanced', 'professional']
let count = 0

for (const level of levels) {
  const dir = path.join(__dirname, 'courses', level)
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'))
  for (const file of files) {
    const filePath = path.join(dir, file)
    let html = fs.readFileSync(filePath, 'utf-8')

    html = html.replace(
      /(<pre[^>]*>)([\s\S]*?)(<\/pre>)/g,
      (match, open, code, close) => {
        if (code.includes('<span')) return match
        const decoded = decodeEntities(code)
        const highlighted = highlightPython(decoded)
        return open + highlighted + close
      }
    )

    fs.writeFileSync(filePath, html)
    count++
    console.log(`DONE: ${level}/${file}`)
  }
}

console.log(`\nAll done! ${count} files processed.`)
