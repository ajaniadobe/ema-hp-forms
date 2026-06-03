export default function decorate(block) {
  const items = [...block.children];
  const ol = document.createElement('ol');
  ol.className = 'steps-list';

  items.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'steps-item';

    const icon = row.querySelector('.icon');
    if (icon) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'steps-item-icon';
      iconWrap.append(icon);
      li.append(iconWrap);
    }

    const content = document.createElement('div');
    content.className = 'steps-item-content';
    content.append(...row.children);
    li.append(content);

    ol.append(li);
  });

  block.textContent = '';
  block.append(ol);
}
