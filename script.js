const container = document.getElementById('trailer-list');
container.innerHTML = '';

fetch('https://apivcdn.xyz/api/short?api_token=7cb67565ace3a08cd9d099c749787121')
  .then(res => res.json())
  .then(data => {
    data.data.slice(0, 8).forEach(movie => {
      const card = document.createElement('div');
      card.className = 'trailer-card';

      const iframe = document.createElement('iframe');
      iframe.src = movie.embed_url || movie.trailer || "https://www.youtube.com/embed/" + movie.trailer;
      card.appendChild(iframe);

      const title = document.createElement('h2');
      title.textContent = movie.ru_title || movie.title;
      card.appendChild(title);

      const description = document.createElement('p');
      description.textContent = movie.description || "Описание недоступно.";
      card.appendChild(description);

      const watchBtn = document.createElement('a');
      watchBtn.href = 'https://t.me/yourchannel'; // Замените на свою ссылку
      watchBtn.className = 'watch-button';
      watchBtn.textContent = 'Смотреть фильм';
      card.appendChild(watchBtn);

      container.appendChild(card);
    });
  })
  .catch(err => {
    container.innerHTML = '<p>Ошибка загрузки трейлеров.</p>';
  });