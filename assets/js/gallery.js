// gallery
(function(){
  const heroImg = document.getElementById('main-hero-image');
  const thumbs = document.querySelectorAll('.gallery-thumbnail');
  const prev = document.querySelector('.prev-button');
  const next = document.querySelector('.next-button');
  if(!heroImg || thumbs.length === 0) return;

  let index = 0;
  function show(i){
    index = (i + thumbs.length) % thumbs.length;
    const src = thumbs[index].getAttribute('src');
    heroImg.src = src;
  }

  thumbs.forEach((t,i)=> t.addEventListener('click', ()=> show(i)) );
  prev && prev.addEventListener('click', ()=> show(index-1));
  next && next.addEventListener('click', ()=> show(index+1));
})();
