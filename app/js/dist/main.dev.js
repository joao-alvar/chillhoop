"use strict";

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
var album = document.getElementById('album__track'); // Titulo da Musica

var musicas = ['Simplexity', 'Bliss', 'Higher', 'Solstice', 'Toddle']; // Mantem o controle da musica

var musicaIndex = 2; // Carrega inicialmente os detalhes da música no DOM

loadMusica(musicas[musicaIndex]); // Atualiza detalhes da musicas

function loadMusica(musica) {
  titulo.innerText = musica;
  Artista.innerText = musica;
  audio.src = "./musicas/".concat(musica, ".mp3");
  album.src = "./imagens/".concat(musica, ".jpg");
} // Toca musicas


function musicaPlay() {
  playerContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
} // Pausar musicas


function pauseMusica() {
  playerContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
} // Musica anterior


function prevMusica() {
  musicaIndex--;

  if (musicaIndex < 0) {
    musicaIndex = musicas.length - 1;
  }

  loadMusica(musicas[musicaIndex]);
  musicaPlay();
} // Proxima musica


function proxMusica() {
  musicaIndex++;

  if (musicaIndex > musicas.length - 1) {
    musicaIndex = 0;
  }

  loadMusica(musicas[musicaIndex]);
  musicaPlay();
} // atualiza barra de progresso


function updateProgresso(e) {
  var _e$srcElement = e.srcElement,
      duration = _e$srcElement.duration,
      currentTime = _e$srcElement.currentTime;
  var progressoPorcentagem = currentTime / duration * 100;
  progresso.style.width = "".concat(progressoPorcentagem, "%");
} // definir barra de progresso


function setProgresso(e) {
  var width = this.clientWidth;
  var clickX = e.offsetX;
  var duration = audio.duration;
  audio.currentTime = clickX / width * duration;
} // adicionar eventListener


playBtn.addEventListener('click', function () {
  var isPlaying = playerContainer.classList.contains('play');

  if (isPlaying) {
    pauseMusica();
  } else {
    musicaPlay();
  }
}); // Trocar musica

prevBtn.addEventListener('click', prevMusica);
proxBtn.addEventListener('click', proxMusica); // Atualizar Time/musica 

audio.addEventListener('timeupdate', updateProgresso); // Click na barra de progresso 

progressoContainer.addEventListener('click', setProgresso); // Musica termina

audio.addEventListener('ended', proxMusica);
volumeslider = document.getElementById("volumeslider");
volumeslider.addEventListener("mousemove", setvolume);

function setvolume() {
  audio.volume = volumeslider.value / 100;
}
/* SLIDER SECTION */


var slides = document.querySelectorAll('.slide__wrap div');
var slideSayisi = slides.length;
var prevSlider = document.querySelector('.sliderBtn__prev');
var nextSlider = document.querySelector('.sliderBtn__next');

for (var index = 0; index < slides.length; index++) {
  var element = slides[index];
  element.style.transform = "translateX(" + 100 * index + "%)";
}

var loop = 0 + 1000 * slideSayisi;

function proximo() {
  loop++;

  for (var _index = 0; _index < slides.length; _index++) {
    var _element = slides[_index];
    _element.style.transform = "translateX(" + 100 * (_index - loop % slideSayisi) + "%)";
  }
}

function anterior() {
  loop--;

  for (var _index2 = 0; _index2 < slides.length; _index2++) {
    var _element2 = slides[_index2];
    _element2.style.transform = "translateX(" + 100 * (_index2 - loop % slideSayisi) + "%)";
  }
}

nextSlider.addEventListener('click', proximo);
prevSlider.addEventListener('click', anterior);
document.addEventListener('keydown', function (e) {
  if (e.code === 'ArrowRight') {
    proximo();
  } else if (e.code === 'ArrowLeft') {
    anterior();
  }
});