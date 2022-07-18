async function getVersion() {
  r = await fetch(
    "https://api.github.com/repos/germanivanov0719/grades/commits/release"
  );
  j = await r.json();
  return j["sha"].slice(0, 7);
}

async function setVersion() {
  let v = await getVersion();
  console.log("Version (fetch): " + v);
  document.getElementById("version").textContent = v;
}

async function update() {
  document.getElementById("update").textContent = "Обновляем...";
  if (navigator.onLine) {
    caches.delete("GradesCache");
    location.reload();
  } else {
    document.getElementById("update").textContent = "Офлайн";
  }
}

async function updateStatus() {
  if (navigator.onLine) {
    document.getElementById("update").textContent = "Обновить сейчас";
    document.getElementById("update").style.textDecoration = "underline";
  } else {
    document.getElementById("update").textContent = "Офлайн";
    document.getElementById("update").style.textDecoration = "none";
  }
}

window.ononline = window.onoffline = updateStatus;

updateStatus();
setVersion();
