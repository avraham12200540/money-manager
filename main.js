
const personalPassword = "12200540";
const parentsPassword = "22312231";
let selectedType = "";

// ----- Login -----
function login() {
  const pass = document.getElementById('password').value;
  if (pass === personalPassword) {
    window.location.href = "dashboard.html";
  } else if (pass === parentsPassword) {
    window.location.href = "parents.html";
  } else {
    document.getElementById('error-msg').innerText = "סיסמה שגויה";
  }
}

// ----- Logout -----
function logout() {
  window.location.href = "index.html";
}

// ----- Dashboard Steps -----
function selectType(type) {
  selectedType = type;
  document.getElementById('step1').style.display = "none";
  document.getElementById('step2').style.display = "block";
}

function nextStep2() {
  document.getElementById('step2').style.display = "none";
  document.getElementById('step3').style.display = "block";
}

function nextStep3() {
  document.getElementById('step3').style.display = "none";
  document.getElementById('step4').style.display = "block";
}

// ----- Save Transaction -----
function saveTransaction() {
  const amount = document.getElementById('amount').value;
  const reason = document.getElementById('reason').value;
  const date = document.getElementById('date').value || new Date().toISOString().slice(0,10);

  const url = "https://script.google.com/macros/s/AKfycbwMrK3AIDi6fkvwjRvQfeFd0BFBkx8u7OxqcXPhfU3DTNL_kPlZCSzK_X4SufawkndFnw/exec";

  fetch(url + `?type=${selectedType}&amount=${amount}&reason=${reason}&date=${date}`)
    .then(response => response.text())
    .then(result => {
      alert("נשמר בהצלחה!");
      location.reload();
    })
    .catch(err => alert("שגיאה בשמירה: " + err));
}

// ----- Load Data -----
function loadDashboardData() {
  const url = "https://script.google.com/macros/s/AKfycbwMrK3AIDi6fkvwjRvQfeFd0BFBkx8u7OxqcXPhfU3DTNL_kPlZCSzK_X4SufawkndFnw/exec?action=load";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById('balance').innerText = data.balance;
      document.getElementById('last-transaction').innerText = data.lastTransaction;
    });
}

function loadParentsData() {
  const url = "https://script.google.com/macros/s/AKfycbwMrK3AIDi6fkvwjRvQfeFd0BFBkx8u7OxqcXPhfU3DTNL_kPlZCSzK_X4SufawkndFnw/exec?action=parents";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById('parents-balance').innerText = data.balance;
    });
}

// ----- Auto load -----
if (document.getElementById('balance')) loadDashboardData();
if (document.getElementById('parents-balance')) loadParentsData();
