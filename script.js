const inputBox = document.getElementById('inputBox');
const preview = document.getElementById('preview');
let expr = "";

function update() {
  inputBox.value = expr;
  try {
    preview.textContent = expr ? "= " + eval(expr.replace(/%/g, "/100")) : "";
  } catch {
    preview.textContent = "";
  }
}

function append(value) {
  expr += value;
  update();
}

function calculate() {
  try {
    expr = String(eval(expr.replace(/%/g, "/100")));
  } catch {
    expr = "Error";
  }
  update();
}

function delOne() {
  expr = expr.slice(0, -1);
  update();
}

function clearAll() {
  expr = "";
  update();
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.innerText;
    if (t === '=') calculate();
    else if (t === 'AC') clearAll();
    else if (t === 'DEL') delOne();
    else append(t);
  });
});

document.addEventListener('keydown', (e) => {
  if ("0123456789.+-*/%".includes(e.key)) {
    append(e.key);
  }
  else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  }
  else if (e.key === 'Backspace') {
    e.preventDefault();
    delOne();
  }
  else if (e.key === 'Escape') {
    clearAll();
  }
});

update();