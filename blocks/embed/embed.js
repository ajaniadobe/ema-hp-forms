const loadEmbed = (block, link) => {
  if (block.dataset.embedLoaded === 'true') return;

  const url = new URL(link);
  const isYoutube = link.includes('youtube') || link.includes('youtu.be');

  if (isYoutube) {
    const usp = new URLSearchParams(url.search);
    let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
    if (url.origin.includes('youtu.be')) {
      [, vid] = url.pathname.split('/');
    }
    const embed = document.createElement('div');
    embed.innerHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://www.youtube.com/embed/${vid}?rel=0" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
    </div>`;
    block.append(embed.firstElementChild);
    block.dataset.embedLoaded = true;
  } else {
    const embed = document.createElement('div');
    embed.innerHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="${link}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
      allowfullscreen="" scrolling="no" title="Embedded content" loading="lazy"></iframe>
    </div>`;
    block.append(embed.firstElementChild);
    block.dataset.embedLoaded = true;
  }
};

export default function decorate(block) {
  const link = block.querySelector('a')?.href;
  if (!link) return;

  block.textContent = '';
  block.dataset.embedLoaded = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadEmbed(block, link);
    }
  });
  observer.observe(block);
}
