function calculate() {
  const weight = parseFloat(document.getElementById("weight").value);
  const medicine = document.getElementById("medicine").value;
  const time = document.getElementById("lastTime").value;

  if (!weight || !time) {
    alert("Please fill all fields");
    return;
  }

  let doseMg = 0;
  let interval = "";

  if (medicine === "paracetamol") {
    doseMg = weight * 15;
    interval = "every 4–6 hours";
  } else {
    doseMg = weight * 10;
    interval = "every 6–8 hours";
  }

  const spoons = (doseMg / 120).toFixed(1);

  document.getElementById("result").innerHTML = `
    <h3>Result</h3>
    <p>Dose: <strong>${doseMg} mg</strong></p>
    <p>≈ ${spoons} teaspoons (5ml)</p>
    <p>Interval: ${interval}</p>
    <p>Last dose time: ${time}</p>
  `;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
