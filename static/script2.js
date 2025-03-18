function addCell() {
  let notebook = document.getElementById("notebook");
  let cell = document.createElement("div");
  let btn = document.createElement("button");
  btn.className = "runbtn";
  btn.textContent = "Run";
  btn.addEventListener("click", submitCode);
  cell.appendChild(btn);
  cell.appendChild(document.createElement("textarea"));
  cell.className = "cell";
  notebook.appendChild(cell);
}

async function submitCode() {
  try {
    code = this.parentNode.querySelector("textarea").value;
    const response = await fetch("http://127.0.0.1:5000/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cell: code }),
    });

    const data = await response.json();

    let div = document.createElement("div");

    div.innerText = data.result;

    this.parentNode.appendChild(div);
  } catch (error) {
    console.error("Execution error:", error);
  }
}
