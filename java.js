// script.js - navigasi, chart, dan fungsi ubah nama/kelas
// ---------------------------
// Utility: show one page only
function showOnly(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + pageId);
  if (el) el.classList.add('active');

  // highlight menu active state
  document.querySelectorAll('.menu').forEach(m => m.classList.remove('active'));
  const menuMap = {
    home: 'menu-home',
    mahasiswa: 'menu-mahasiswa',
    kelas: 'menu-kelas',
    settings: 'menu-settings'
  };
  if (menuMap[pageId]) {
    const m = document.getElementById(menuMap[pageId]);
    if (m) m.classList.add('active');
  } else {
    // deselect others when showing other pages
    document.getElementById('menu-home').classList.remove('active');
  }
}

// goHome(true) -> also reset highlight, goHome(false) -> just show home
function goHome(resetHighlight) {
  // show main home area (page-home)
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-home').classList.add('active');

  // set menu active
  document.querySelectorAll('.menu').forEach(m => m.classList.remove('active'));
  document.getElementById('menu-home').classList.add('active');

  // if reset requested, restore default welcome text
  if (resetHighlight) {
    document.getElementById('mahasiswaNama').innerText = 'Nama Mahasiswa';
    document.getElementById('kelasNama').innerText = 'SI-3X';
  }

  // remove any highlights
  document.querySelectorAll('.highlight').forEach(h => h.classList.remove('highlight'));
}

// show other page (mahasiswa, kelas, settings)
function showPage(name, resetHighlight=false) {
  showOnly(name);
  // if called from sidebar link, remove any highlighted boxes on home
  if (resetHighlight) {
    document.querySelectorAll('.highlight').forEach(h => h.classList.remove('highlight'));
  }
}

// when user clicks Aktivitas/Statistik/Dokumen menu: highlight corresponding box in HOME
function highlightFromMenu(target) {
  goHome(false); // show home first

  // clear any previous highlights
  document.querySelectorAll('.highlight').forEach(h => h.classList.remove('highlight'));

  if (target === 'aktivitas') {
    const box = document.getElementById('box-aktivitas');
    if (box) box.classList.add('highlight');
    // set menu active
    document.querySelectorAll('.menu').forEach(m => m.classList.remove('active'));
    document.getElementById('menu-aktivitas').classList.add('active');
  } else if (target === 'statistik') {
    const box = document.getElementById('box-statistik');
    if (box) box.classList.add('highlight');
    document.querySelectorAll('.menu').forEach(m => m.classList.remove('active'));
    document.getElementById('menu-statistik').classList.add('active');
  } else if (target === 'dokumen') {
    const box = document.getElementById('box-dokumen');
    if (box) box.classList.add('highlight');
    document.querySelectorAll('.menu').forEach(m => m.classList.remove('active'));
    document.getElementById('menu-dokumen').classList.add('active');
  }
}

// ---------------------------
// UBAH MAHASISWA menggunakan getElementById().innerText
function ubahMahasiswa() {
  const val = document.getElementById('inputNama').value.trim();
  if (!val) {
    alert('Masukkan nama mahasiswa terlebih dahulu.');
    return;
  }
  // gunakan innerText sesuai permintaan
  document.getElementById('mahasiswaNama').innerText = val;
  alert('Nama mahasiswa berhasil diubah.');
  // kembali ke home (tetap pertahankan nama baru)
  goHome(false);
}

// UBAH KELAS menggunakan getElementById().innerText
function ubahKelas() {
  const val = document.getElementById('inputKelas').value.trim();
  if (!val) {
    alert('Masukkan nama kelas terlebih dahulu.');
    return;
  }
  document.getElementById('kelasNama').innerText = val;
  alert('Nama kelas berhasil diubah.');
  goHome(false);
}

// ---------------------------
// Inisialisasi Chart.js (chart asli)
(function initChart(){
  const ctx = document.getElementById('chartMahasiswa').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Class A','Class B','Class C','Class D','Class E'],
      datasets: [
        {
          label: 'Persentase',
          data: [30, 22, 45, 18, 55],
          backgroundColor: '#0b5ecb',
          borderRadius: 6
        },
        {
          type: 'line',
          label: 'Trend',
          data: [28, 25, 40, 20, 50],
          borderColor: '#2aa3c0',
          borderWidth: 2,
          fill: false,
          tension: 0.3,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero:true, ticks: { stepSize: 10 } }
      },
      plugins: { legend: { display: false } }
    }
  });
})();
