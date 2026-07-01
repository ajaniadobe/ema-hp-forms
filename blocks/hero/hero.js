export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'hero-content';
  let imageDiv = null;

  [...block.children].forEach((row) => {
    const picture = row.querySelector('picture');
    if (picture) {
      imageDiv = row;
      imageDiv.classList.add('hero-image');
    } else {
      content.append(...row.children);
    }
  });

  block.textContent = '';
  if (imageDiv) block.append(imageDiv);
  block.append(content);
}
