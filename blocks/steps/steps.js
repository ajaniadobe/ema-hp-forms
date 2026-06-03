export default function decorate(block) {
  const items = [...block.children];
  const ol = document.createElement('ol');
  ol.className = 'steps-list';

  items.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'steps-item';
    const cells = [...row.children];

    const content = document.createElement('div');
    content.className = 'steps-item-content';

    const titleCell = cells[0];
    if (titleCell) {
      const h4 = document.createElement('h4');
      h4.textContent = titleCell.textContent;
      content.append(h4);
    }

    const descCell = cells[1];
    if (descCell) {
      content.append(...descCell.childNodes);
    }

    li.append(content);
    ol.append(li);
  });

  block.textContent = '';
  block.append(ol);
}
