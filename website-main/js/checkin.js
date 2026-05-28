(() => {
  const SITE_ORIGIN = 'mondaiycoffee.com';
  const MEMBERS_JSON = '/members/index.json';

  let memberMap = {};   // slug → { name, role }
  let checkedIn = [];   // [{ slug, name }] in order of scan
  let scanning = false;
  let stream = null;
  let facingMode = 'environment';
  let rafId = null;

  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const flash = document.getElementById('flash');
  const toast = document.getElementById('toast');
  const btnStart = document.getElementById('btn-start');
  const btnStop = document.getElementById('btn-stop');
  const btnFlip = document.getElementById('btn-flip');
  const btnExport = document.getElementById('btn-export');
  const exportNote = document.getElementById('export-note');
  const sessionSection = document.getElementById('session-section');
  const checkinList = document.getElementById('checkin-list');
  const countEl = document.getElementById('count');
  const dateInput = document.getElementById('session-date');

  // Set default date to today
  dateInput.value = new Date().toISOString().slice(0, 10);

  // Load member list
  fetch(MEMBERS_JSON)
    .then(r => r.json())
    .then(members => {
      members.forEach(m => { memberMap[m.slug] = { name: m.name, role: m.role }; });
    })
    .catch(() => { /* scanner still works; names fall back to slug */ });

  btnStart.addEventListener('click', startCamera);
  btnStop.addEventListener('click', stopCamera);
  btnFlip.addEventListener('click', flipCamera);
  btnExport.addEventListener('click', exportList);

  function startCamera() {
    if (scanning) return;
    navigator.mediaDevices.getUserMedia({ video: { facingMode } })
      .then(s => {
        stream = s;
        video.srcObject = s;
        video.play();
        scanning = true;
        btnStart.hidden = true;
        btnStop.hidden = false;
        btnFlip.hidden = false;
        requestAnimationFrame(scanFrame);
      })
      .catch(err => {
        showToast('Camera access denied: ' + err.message, 'error');
      });
  }

  function stopCamera() {
    scanning = false;
    if (rafId) cancelAnimationFrame(rafId);
    if (stream) stream.getTracks().forEach(t => t.stop());
    video.srcObject = null;
    btnStop.hidden = true;
    btnStart.hidden = false;
    btnFlip.hidden = true;
  }

  function flipCamera() {
    facingMode = facingMode === 'environment' ? 'user' : 'environment';
    stopCamera();
    startCamera();
  }

  function scanFrame() {
    if (!scanning) return;
    rafId = requestAnimationFrame(scanFrame);

    if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) handleQR(code.data);
  }

  function handleQR(data) {
    let url;
    try { url = new URL(data); } catch { return; }

    if (url.hostname !== SITE_ORIGIN) return;

    // Expect path like /members/adam-gautsch/
    const match = url.pathname.match(/^\/members\/([^/]+)\/?$/);
    if (!match) return;

    const slug = match[1];
    const already = checkedIn.some(m => m.slug === slug);

    if (already) {
      triggerFlash('duplicate');
      const name = memberMap[slug] ? memberMap[slug].name : slugToName(slug);
      showToast(name + ' is already here', 'duplicate');
      return;
    }

    const name = memberMap[slug] ? memberMap[slug].name : slugToName(slug);
    checkedIn.push({ slug, name });
    triggerFlash('success');
    showToast(name, 'success');
    addToList(slug, name);
  }

  function addToList(slug, name) {
    sessionSection.hidden = false;
    countEl.textContent = checkedIn.length;

    const li = document.createElement('li');
    li.className = 'checkin__list-item';
    li.innerHTML = `<span class="checkin__list-name">${escHtml(name)}</span><span class="checkin__list-slug">${escHtml(slug)}</span>`;
    checkinList.appendChild(li);
  }

  function triggerFlash(type) {
    flash.className = 'checkin__flash checkin__flash--' + type;
    flash.addEventListener('animationend', () => { flash.className = 'checkin__flash'; }, { once: true });
  }

  let toastTimer;
  function showToast(msg, type) {
    toast.textContent = msg;
    toast.className = 'checkin__toast checkin__toast--' + type + ' checkin__toast--visible';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.className = 'checkin__toast'; }, 2200);
  }

  function exportList() {
    const date = dateInput.value || new Date().toISOString().slice(0, 10);
    if (checkedIn.length === 0) {
      showToast('No one checked in yet', 'error');
      return;
    }

    const lines = [
      `Session: ${date}`,
      `Attendees (${checkedIn.length}):`,
      ...checkedIn.map(m => `  • ${m.name} (${m.slug})`),
      '',
      `Add to each member's front matter:`,
      `  meetings_attended:`,
      `    - "${date}"`,
    ];

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      exportNote.hidden = false;
      setTimeout(() => { exportNote.hidden = true; }, 2500);
    }).catch(() => {
      showToast('Copy failed — select and copy manually', 'error');
    });
  }

  function slugToName(slug) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
