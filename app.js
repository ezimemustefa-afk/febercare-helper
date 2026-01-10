let children = [];

function addChild() {
  document.getElementById('child-form').style.display = 'block';
}

function calculateDose() {
  const name = document.getElementById('child-name').value;
  const weight = parseFloat(document.getElementById('child-weight').value);
  if (!name || isNaN(weight) || weight <= 0) {
    alert('Please enter valid name and weight.');
    return;
  }

  // Example: dose = 10mg per kg
  const doseMg = weight * 10;
  const doseMl = doseMg / 5; // Example: syrup 5mg/ml

  children.push({name, weight, doseMg, doseMl});
  updateChildrenList();
  document.getElementById('dose-result').innerHTML =
    `${name}'s dose: ${doseMg} mg (${doseMl.toFixed(1)} ml)`;
}

function updateChildrenList() {
  const list = document.getElementById('children-list');
  list.innerHTML = '';
  children.forEach((child, index) => {
    list.innerHTML += `<div>${child.name}, ${child.weight}kg → ${child.doseMg} mg (${child.doseMl.toFixed(1)} ml)</div>`;
  });
}
