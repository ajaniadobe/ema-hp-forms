export default function decorate(block) {
  const items = [...block.children];
  const grid = document.createElement('ul');
  grid.className = 'feature-grid-items';

  items.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'feature-grid-item';
    const cells = [...row.children];

    const image = cells[0];
    if (image) {
      image.className = 'feature-grid-item-image';
      li.append(image);
    }

    const content = document.createElement('div');
    content.className = 'feature-grid-item-content';

    const title = cells[1];
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      content.append(h3);
    }

    const specs = cells[2];
    if (specs) {
      content.append(...specs.childNodes);
    }

    const cta = cells[3];
    if (cta) {
      const link = cta.querySelector('a');
      if (link) {
        link.className = 'button';
        content.append(link);
      }
    }

    li.append(content);
    grid.append(li);
  });

  block.textContent = '';
  block.append(grid);
}
