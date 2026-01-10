const medicines = {
  paracetamol: { name: "Paracetamol (Alvedon®)", doseMgPerKg: 10, concentration: 10, intervalH: 6, maxPerDay: 4 },
  ibuprofen: { name: "Ibuprofen (Ipren®)", doseMgPerKg: 5, concentration: 20, intervalH: 8, maxPerDay: 3 }
};

let children = [];

function addChild() {
  document.getElementById('child-form').style.display = 'block';
}

function calculateDose() {
  const name = document.getElementById('child-name').value;
  const weight = parseFloat(document.getElementById('child-weight').value);
  const medKey = document.getElementById('child-medicine').value;
  const med = medicines[medKey];

  if(!name || isNaN(weight) || weight<=0) { alert('Please enter valid name and weight.'); return; }

  const doseMg = weight * med.doseMgPerKg;
  const doseMl = doseMg / med.concentration;

  const childData = { name, weight, medKey, doseMg, doseMl, time: new Date() };
  children.push(childData);

  updateChildrenList();
  updateTimeline();
}

function updateChildrenList() {
  const list = document.getElementById('children-list');
  list.innerHTML = '';
  children.forEach(c => {
    const med = medicines[c.medKey];
    list.innerHTML += `<div>${c.name}, ${c.weight}kg → ${med.name}: ${c.doseMg} mg (${c.doseMl.toFixed(1)} ml)</div>`;
  });
}

function updateTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  children.forEach(c => {
    const med = medicines[c.medKey];
    let nextDose = new Date(c.time);
    for(let i=0;i<med.maxPerDay;i++) {
      const hour = nextDose.getHours().toString().padStart(2,'0');
      const min = nextDose.getMinutes().toString().padStart(2,'0');
      const cls = c.medKey==='paracetamol' ? 'paracetamol':'ibuprofen';
      timeline.innerHTML += `<div class="${cls}">${c.name} - ${med.name} next dose at ${hour}:${min}</div>`;
      nextDose.setHours(nextDose.getHours() + med.intervalH);
    }
  });
}
