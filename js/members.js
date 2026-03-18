const ORG = 'Mond-AI-y-Coffee';
const GRID = document.getElementById('members-grid');

async function fetchMembers() {
  try {
    const res = await fetch(`https://api.github.com/orgs/${ORG}/members?per_page=100`);
    if (!res.ok) throw new Error(res.statusText);
    const members = await res.json();

    // Fetch individual profiles in parallel for display name + bio
    const profiles = await Promise.all(
      members.map(m =>
        fetch(m.url)
          .then(r => r.ok ? r.json() : m)
          .catch(() => m)
      )
    );

    GRID.innerHTML = profiles.map(renderCard).join('');
  } catch (err) {
    GRID.innerHTML = '<p class="members-error">Could not load members at this time.</p>';
  }
}

function renderCard(profile) {
  const name = profile.name || profile.login;
  const bio  = profile.bio ? `<p class="member-bio">${profile.bio}</p>` : '';
  return `
    <a class="member-card" href="${profile.html_url}" target="_blank" rel="noopener" aria-label="${name} on GitHub">
      <img class="member-avatar" src="${profile.avatar_url}" alt="" width="64" height="64" loading="lazy" />
      <div class="member-info">
        <span class="member-name">${name}</span>
        ${bio}
      </div>
    </a>
  `;
}

fetchMembers();
