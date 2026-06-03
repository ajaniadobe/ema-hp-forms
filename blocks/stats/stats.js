export default function decorate(block) {
  const items = [...block.children];
  const list = document.createElement('ul');
  list.className = 'stats-list';

  items.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'stats-item';

    const value = row.children[0];
    const label = row.children[1];

    if (value) {
      value.className = 'stats-item-value';
      li.append(value);
    }

    if (label) {
      label.className = 'stats-item-label';
      li.append(label);
    }

    list.append(li);
  });

  block.textContent = '';
  block.append(list);
}
