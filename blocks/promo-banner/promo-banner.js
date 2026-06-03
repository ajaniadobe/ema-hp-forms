export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const content = row.children[0];
  if (content) content.classList.add('promo-banner-content');

  const close = document.createElement('button');
  close.className = 'promo-banner-close';
  close.setAttribute('aria-label', 'Dismiss banner');
  close.innerHTML = '<span aria-hidden="true">&times;</span>';
  close.addEventListener('click', () => {
    block.closest('.section')?.remove();
  });

  block.append(close);
}
