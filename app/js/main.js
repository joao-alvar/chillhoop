var playerContainer = document.getElementById('musica-container');
var playBtn = document.getElementById('play');
var prevBtn = document.getElementById('prev');
var proxBtn = document.getElementById('prox');

var audio = document.querySelector('.audio');
var progresso = document.getElementById('progresso');
var progressoContainer = document.getElementById('progresso-container');
var volume = document.getElementById('volumeslider');
var volumeConatiner = document.getElementById('volume');
var titulo = document.getElementById('titulo');
var Artista = document.getElementById('artista');
var album = document.getElementById('album__track');

// Titulo da Musica

const musicas = ['Simplexity', 'Bliss', 'Higher', 'Solstice', 'Toddle'];

// Mantem o controle da musica
let musicaIndex = 2;

// Carrega inicialmente os detalhes da música no DOM
loadMusica(musicas[musicaIndex]);

// Atualiza detalhes da musicas
function loadMusica(musica) {
  titulo.innerText = musica;
  Artista.innerText = musica;
  audio.src = `./musicas/${musica}.mp3`;
  album.src = `./imagens/${musica}.jpg`;
}

// Toca musicas
function musicaPlay() {
  playerContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pausar musicas
function pauseMusica() {
  playerContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Musica anterior
function prevMusica() {
  musicaIndex--;

  if (musicaIndex < 0) {
    musicaIndex = musicas.length - 1;
  }

  loadMusica(musicas[musicaIndex]);

  musicaPlay();
}

// Proxima musica
function proxMusica() {
  musicaIndex++;

  if (musicaIndex > musicas.length - 1) {
    musicaIndex = 0;
  }

  loadMusica(musicas[musicaIndex]);

  musicaPlay();
}

// atualiza barra de progresso
function updateProgresso(e) {
  const { duration, currentTime } = e.srcElement;
  const progressoPorcentagem = (currentTime / duration) * 100;
  progresso.style.width = `${progressoPorcentagem}%`;
}

// definir barra de progresso
function setProgresso(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// adicionar eventListener
playBtn.addEventListener('click', () => {
  const isPlaying = playerContainer.classList.contains('play');

  if (isPlaying) {
    pauseMusica();
  } else {
    musicaPlay();
  }
});

// Trocar musica
prevBtn.addEventListener('click', prevMusica);
proxBtn.addEventListener('click', proxMusica);

// Atualizar Time/musica 
audio.addEventListener('timeupdate', updateProgresso);

// Click na barra de progresso 
progressoContainer.addEventListener('click', setProgresso);

// Musica termina
audio.addEventListener('ended', proxMusica);

volumeslider = document.getElementById("volumeslider");

volumeslider.addEventListener("mousemove", setvolume);

function setvolume(){
  audio.volume = volumeslider.value / 100;
}