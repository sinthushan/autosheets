var spreadsheet = document.getElementById("spreadsheet");
const X = 50;
const Y = 500;

var row = spreadsheet.appendChild(document.createElement("div"));
row.classList.add("row", "headerrow");
row.setAttribute("id", "row_0");

for (var j = 0; j < X; j++) {
  var cell = row.appendChild(document.createElement("div"));
  cell.classList.add("headercell");
  if (j != 0) {
    cell.classList.add("rowcell");
  }
  cell.setAttribute("id", "cell_0_" + j);
  cell.innerText = j;
}

for (var i = 1; i < Y; i++) {
  var row = spreadsheet.appendChild(document.createElement("div"));
  row.classList.add("row");
  row.setAttribute("id", "row_" + i);
  index = row.appendChild(document.createElement("div"));
  index.classList.add("index");
  index.innerText = i;
  for (var j = 1; j < X; j++) {
    var cell = row.appendChild(document.createElement("input"));
    cell.classList.add("cell");
    cell.classList.add("rowcell");
    cell.setAttribute("id", "cell_" + i + "_" + j);
    cell.dataset.row = i;
    cell.dataset.column = j;
  }
}

document.querySelectorAll(".rowcell").forEach((element) => {
  element.addEventListener("keyup", function (e) {
    eval_keys = ["Enter", "Tab"];
    if (e.code == "Enter") {
      current_row = this.dataset.row;
      current_col = this.dataset.column;
      nextcell = document.querySelector(
        `[data-row='${
          parseInt(current_row) + 1
        }'][data-column='${current_col}']`
      );
      this.classList.remove("formulaInput");
      nextcell.focus();
    }
    if (e.code == "ArrowDown") {
      current_row = this.dataset.row;
      current_col = this.dataset.column;
      nextcell = document.querySelector(
        `[data-row='${
          parseInt(current_row) + 1
        }'][data-column='${current_col}']`
      );
      if (nextcell != null) {
        nextcell.focus();
      } else {
        this.focus;
      }
    }
    if (e.code == "ArrowUp") {
      current_row = this.dataset.row;
      current_col = this.dataset.column;
      nextcell = document.querySelector(
        `[data-row='${
          parseInt(current_row) - 1
        }'][data-column='${current_col}']`
      );
      if (nextcell != null) {
        nextcell.focus();
      } else {
        this.focus;
      }
    }
    if (e.code == "ArrowRight") {
      current_row = this.dataset.row;
      current_col = this.dataset.column;
      nextcell = document.querySelector(
        `[data-column='${
          parseInt(current_col) + 1
        }'][data-row='${current_row}']`
      );
      if (nextcell != null) {
        nextcell.focus();
      } else {
        this.focus;
      }
    }
    if (e.code == "ArrowLeft") {
      current_row = this.dataset.row;
      current_col = this.dataset.column;
      nextcell = document.querySelector(
        `[data-column='${
          parseInt(current_col) - 1
        }'][data-row='${current_row}']`
      );
      if (nextcell != null) {
        nextcell.focus();
      } else {
        this.focus;
      }
    }
    if ((this.value[0] == "=") & !eval_keys.includes(e.code)) {
      this.classList.add("formulaInput");
    }
  });
});

document.querySelectorAll(".rowcell").forEach((element) => {
  element.addEventListener("blur", function (e) {
    if (this.value[0] == "=") {
      var sanitized_formula = sanitize_formula(this.value);
      answer = eval(sanitized_formula);
      if (answer != undefined) {
        this.dataset.formula = this.value;
        this.value = answer;
      }
    }
  });
});

document.querySelectorAll(".rowcell").forEach((element) => {
  element.addEventListener("focus", function () {
    let formulaInput = document.querySelector(".formulaInput");
    if (formulaInput != null) {
      console.log("here");
      formulaInput.classList.remove("formulaInput");
      formulaInput.value = formulaInput.value + this.id;
      formulaInput.focus();
    } else if ("formula" in this.dataset && this.dataset.formula != "") {
      this.value = this.dataset.formula;
    }
  });
});

function sanitize_formula(formula) {
  formula = formula.slice(1);

  tokens = formula.match(/[a-zA-Z_]\w*|\d+|[\+\-\/\%\*]/g);
  new_formula = "";

  tokens.forEach((token) => {
    if (token.startsWith("cell")) {
      token = document.getElementById(token).value;
    }
    if (token == "") {
      token = 0;
    }
    new_formula = new_formula + " " + token;
  });

  return new_formula;
}
