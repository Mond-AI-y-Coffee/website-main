(() => {
  const controls = document.getElementById('member-filter');
  const input = document.getElementById('member-search');
  const count = document.getElementById('member-count');
  const cards = [...document.querySelectorAll('#member-directory .members-card')];
  if (!controls || !input || !count || !cards.length) return;
  const filter = () => {
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      card.hidden = !card.querySelector('.members-card__name').textContent.toLocaleLowerCase().includes(query);
      if (!card.hidden) visible++;
    });
    count.textContent = visible ? `${visible} of ${cards.length} members` : 'No matching members. Try another name.';
  };
  input.addEventListener('input', filter);
  filter();
  controls.hidden = false;
})();
