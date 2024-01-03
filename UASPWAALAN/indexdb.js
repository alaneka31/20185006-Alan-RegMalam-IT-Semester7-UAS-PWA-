// Fungsi untuk menambahkan mahasiswa ke IndexedDB
function addMahasiswa() {
  const form = document.getElementById('mahasiswaForm');
  const mahasiswa = {
    nama: form.nama.value,
    nim: form.nim.value,
    kelas: form.kelas.value,
    semester: form.semester.value,
    jurusan: form.jurusan.value,
    alasan: form.alasan.value
  };

  // Buka koneksi dengan IndexedDB
  const request = window.indexedDB.open('MahasiswaDB', 1);

  request.onerror = function (event) {
    console.error('Error opening IndexedDB:', event.target.errorCode);
  };

  request.onupgradeneeded = function (event) {
    // Buat atau perbarui skema IndexedDB
    const db = event.target.result;
    const objectStore = db.createObjectStore('mahasiswa', { keyPath: 'nim' });

    // Definisi kolom di dalam objectStore
    objectStore.createIndex('nama', 'nama', { unique: false });
    objectStore.createIndex('kelas', 'kelas', { unique: false });
    objectStore.createIndex('semester', 'semester', { unique: false });
    objectStore.createIndex('jurusan', 'jurusan', { unique: false });
    objectStore.createIndex('alasan', 'alasan', { unique: false });
  };

  request.onsuccess = function (event) {
    // Tambahkan data mahasiswa ke dalam objectStore
    const db = event.target.result;
    const transaction = db.transaction(['mahasiswa'], 'readwrite');
    const objectStore = transaction.objectStore('mahasiswa');
    const addRequest = objectStore.add(mahasiswa);

    addRequest.onsuccess = function () {
      console.log('Mahasiswa ditambahkan ke IndexedDB:', mahasiswa);
      // Bersihkan formulir setelah data ditambahkan
      form.reset();
      // Tampilkan kembali data mahasiswa
      displayMahasiswa();
    };

    addRequest.onerror = function (error) {
      console.error('Gagal menambahkan mahasiswa:', error);
    };

    transaction.oncomplete = function () {
      db.close();
    };
  };
}

// Fungsi untuk menampilkan data mahasiswa dari IndexedDB ke dalam tabel
function displayMahasiswa() {
  const mahasiswaTableBody = document.getElementById('mahasiswaTableBody');

  // Buka koneksi dengan IndexedDB
  const request = window.indexedDB.open('MahasiswaDB', 1);

  request.onerror = function (event) {
    console.error('Error opening IndexedDB:', event.target.errorCode);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['mahasiswa'], 'readonly');
    const objectStore = transaction.objectStore('mahasiswa');
    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function () {
      // Bersihkan isi tabel sebelum menambahkan data baru
      mahasiswaTableBody.innerHTML = '';

      // Tambahkan data mahasiswa ke dalam tabel
      const mahasiswaData = getAllRequest.result;
      mahasiswaData.forEach((mahasiswa) => {
        const row = mahasiswaTableBody.insertRow();
        row.insertCell(0).textContent = mahasiswa.nama;
        row.insertCell(1).textContent = mahasiswa.nim;
        row.insertCell(2).textContent = mahasiswa.kelas;
        row.insertCell(3).textContent = mahasiswa.semester;
        row.insertCell(4).textContent = mahasiswa.jurusan;
        row.insertCell(5).textContent = mahasiswa.alasan;
      });
    };

    getAllRequest.onerror = function (error) {
      console.error('Gagal mendapatkan data mahasiswa:', error);
    };

    transaction.oncomplete = function () {
      db.close();
    };
  };
}

// Tampilkan data mahasiswa saat halaman dimuat
displayMahasiswa();
