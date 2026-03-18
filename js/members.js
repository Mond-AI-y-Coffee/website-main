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

    GRID.innerHTML = profiles.map(renderCard).join('') + renderJoinCard();
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

function renderJoinCard() {
  return `
    <a class="member-card member-card--join" href="https://github.com/Mond-AI-y-Coffee" target="_blank" rel="noopener" aria-label="Join the Mond(AI)y Coffee GitHub community">
      <svg class="member-avatar gh-octocat" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <div class="member-info">
        <span class="member-name">Join Our Community</span>
      </div>
    </a>
  `;
}

fetchMembers();
