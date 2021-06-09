var playerContainer = document.querySelector('.player__container');
var playBtn = document.querySelector('#play');
var prevBtn = document.querySelector('#prev');
var proxBtn = document.querySelector('#prox');

var audio = document.querySelector('.audio');
var progresso = document.querySelector('.progresso');
var progressoContainer = document.querySelector('.progresso-container');
var titulo = document.querySelector('.titulo');
var Artista = document.querySelector('.artista');
var album = document.querySelector('.track__imagem');

// titulo das musicas 
const musicas = ['hey', 'summer', 'ukulele'];

//mantem o controle das musicas
let musicaIndex = 2;

// carrega inicialmente detalhes das musicas no DOM
loadMusica(musicas[musicaIndex]);

// atualiza detalhes das musicas
function loadMusica(musica) {
    titulo.innerText = musica;
    Artista.innerText = musica;
    audio.src = `musicas/${musica}.mp3`;
    cover.src = `images/${musica}.jpg`;
  }

  // tocar a musica
  function musicaPlay() {
    musicaContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
  
    audio.play();
  }
  
  // pausa a musica
  function pauseMusica() {
    musicaContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
  
    audio.pause();
  }

  // musica anterior
  function prevMusica() {
    musicaIndex--;
  
    if (musicaIndex < 0) {
      musicaIndex = musicas.length - 1;
    }
  
    loadMusica(musicas[musicaIndex]);
  
    musicaPlay();
  }

  // proxima musica
  function proxMusica() {
    musicaIndex++;
  
    if (musicaIndex > musicas.length - 1) {
      musicaIndex = 0;
    }
  
    loadMusica(musicas[musicaIndex]);
  
    musicaPlay();
  }