export default function decorate(block) {
  const items = [...block.children];
  const grid = document.createElement('ul');
  grid.className = 'feature-grid-items';

  items.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'feature-grid-item';

    const image = row.children[0];
    const content = row.children[1];

    if (image) {
      image.className = 'feature-grid-item-image';
      li.append(image);
    }

    if (content) {
      content.className = 'feature-grid-item-content';
      li.append(content);
    }

    grid.append(li);
  });

  block.textContent = '';
  block.append(grid);
}
