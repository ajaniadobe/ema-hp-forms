export default function decorate(block) {
  const items = [...block.children];
  const ol = document.createElement('ol');
  ol.className = 'steps-list';

  items.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'steps-item';

    const content = document.createElement('div');
    content.className = 'steps-item-content';

    const cell = row.children[0];
    if (cell) {
      content.append(...cell.childNodes);
    }

    li.append(content);
    ol.append(li);
  });

  block.textContent = '';
  block.append(ol);
}
