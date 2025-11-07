// Tampilkan modal
document.getElementById('uploadBtn').onclick = function() {
  document.getElementById('uploadModal').style.display = 'block';
};

document.getElementById('closeModal').onclick = function() {
  document.getElementById('uploadModal').style.display = 'none';
};

// Form submit
document.getElementById('uploadForm').onsubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const files = form.files.files;
  if (files.length > 200) {
    alert("Maksimal 200 file!");
    return;
  }
  document.getElementById('loadingBar').style.display = 'block';
  const data = new FormData(form);
  // Kirim ke Google Apps Script WebApp
  const scriptUrl = "URL_WEBAPP_SCRIPT"; // https://script.google.com/macros/s/AKfycbzP7Jwzec0vWH3mzpeVIhww_WkZiFegmHoe6kwhgwAz-oBI9YCeh0OfCh0YgYpbPXadew/exec
  let loaded = 0;
  for (let i = 0; i < files.length; i++) {
    data.set('file', files[i]);
    const res = await fetch(scriptUrl, {
      method: 'POST',
      body: data
    });
    loaded++;
    document.getElementById('uploadPercent').textContent = Math.round((loaded/files.length)*100);
  }
  document.getElementById('loadingBar').style.display = 'none';
  alert("Upload selesai!");
  document.getElementById('uploadModal').style.display = 'none';
};