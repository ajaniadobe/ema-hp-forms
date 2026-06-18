import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // First row is the optional section heading if it has no image sibling cell
  const firstRow = rows[0];
  let headingEl = null;
  if (firstRow && firstRow.children.length === 1) {
    const heading = firstRow.querySelector('h2, h3');
    if (heading) {
      headingEl = firstRow;
      headingEl.className = 'card-grid-heading';
      rows.shift();
    }
  }

  const ul = document.createElement('ul');

  rows.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'card-grid-item';
    moveInstrumentation(row, li);

    const [imageCell, infoCell] = [...row.children];

    const picture = imageCell?.querySelector('picture');
    const link = infoCell?.querySelector('a');
    const title = infoCell?.querySelector('p:first-of-type');
    const meta = infoCell?.querySelector('p:nth-of-type(2)');

    const wrapper = link
      ? Object.assign(document.createElement('a'), { href: link.href, className: 'card-grid-link' })
      : document.createElement('div');

    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'card-grid-image';
      imageWrapper.append(picture);
      wrapper.append(imageWrapper);
    }

    const info = document.createElement('div');
    info.className = 'card-grid-info';
    if (title) {
      title.className = 'card-grid-title';
      info.append(title);
    }
    if (meta) {
      meta.className = 'card-grid-meta';
      info.append(meta);
    }
    wrapper.append(info);

    li.append(wrapper);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    img.closest('picture').replaceWith(optimized);
  });

  block.textContent = '';
  if (headingEl) block.append(headingEl);
  block.append(ul);
}
