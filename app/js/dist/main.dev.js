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
var album = document.getElementById('album__track'); // Mantem o controle da musica e dados como nome dos artistas o nome das musicas e capa dos albums 

var musicaIndex = 0;
musicas = ['./musicas/Higher.mp3', './musicas/Toddle.mp3', './musicas/Solstice.mp3', './musicas/Bliss.mp3', './musicas/Simplexity.mp3'];
albums = ['./imagens/Higher.jpg', './imagens/Toddle.jpg', './imagens/Solstice.jpg', './imagens/Bliss.jpg', './imagens/Simplexity.jpg'];
Artistas = ['Misha, jussi Halme', 'Oddfish', 'Middle School, Henry Gritton', 'Misha, jussi Halme', 'Evil Needle'];
Titulos = ["Higher", "Toddle", 'Solstice', 'Bliss', 'Simplexity']; // Carrega inicialmente os detalhes da música no DOM

loadMusica(musicas[musicaIndex]); // Atualiza detalhes da musicas

function loadMusica(musica) {
  Artista.innerHTML = Artistas[musicaIndex];
  titulo.innerHTML = Titulos[musicaIndex];
  audio.src = musicas[musicaIndex];
  album.src = albums[musicaIndex];
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
}); // atualiza progresso.max da musica  duração, o mesmo para o progresso.value, atualiza o currentTime/duration no DOM

function updateProgressoValue() {
  progresso.max = audio.duration;
  progresso.value = audio.currentTime;
  document.querySelector('.currentTime').innerHTML = formatTime(Math.floor(audio.currentTime));

  if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
    document.querySelector('.durationTime').innerHTML = "0:00";
  } else {
    document.querySelector('.durationTime').innerHTML = formatTime(Math.floor(audio.duration));
  }
}

; // converter musica.currentTime e musica.duration para formato MM:SS 

function formatTime(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = Math.floor(seconds - min * 60);

  if (sec < 10) {
    sec = "0".concat(sec);
  }

  ;
  return "".concat(min, ":").concat(sec);
}

; // rodar updateProgressoValue function cada 1/2 secundos para mostrar mudanças no progresso e na musica.currentTime no DOM

setInterval(updateProgressoValue, 500); // function onde o progresso.value é mudado quando slider a barra de progresso é adiantada sem audio auto-playing 

function mudarProgresso() {
  audio.currentTime = progresso.value;
}

; // Trocar musica

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
/* PLAYER TOGGLE */

function toggleMenu() {
  var menuToggle = document.querySelector('#toggle');
  var navigation = document.querySelector('.player__container');
  navigation.classList.toggle('active');
}

; // ADICIONAR INTERSECTION OBSERVER API PARA MUDAR A COR DA NAVBAR DEPENDENDO DA POSIÇÃO DO VIEWPORT.

var header = document.querySelector("header");
var sectionOne = document.querySelector(".realeses__songs");
var sectionOneOptions = {
  threShold: 0,
  rootMargin: "0px 0px -230px 0px"
};
sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      header.classList.remove("nav__scroll");
    } else {
      header.classList.add("nav__scroll");
    }
  });
}, sectionOneOptions);
sectionOneObserver.observe(sectionOne);
var navbar = document.querySelector("header");
var sectionTwo = document.querySelector(".chillhoop__setion");
var sectionTwoOptions = {
  threShold: 0,
  rootMargin: "0px 0px -590px 0px"
};
sectionTwoObserver = new IntersectionObserver(function (entries, sectionTwoObserver) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      navbar.classList.remove("nav__chill");
    } else {
      navbar.classList.add("nav__chill");
    }
  });
}, sectionTwoOptions);
sectionTwoObserver.observe(sectionTwo);
var navScroll = document.querySelector("header");
var sectionTree = document.querySelector(".all__rights");
var sectionTreeOptions = {
  threShold: 1,
  rootMargin: "0px 0px -20px 0px"
};
sectionTreeObserver = new IntersectionObserver(function (entries, sectionTreeObserver) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      navScroll.classList.remove("nav__scroll__change");
    } else {
      navScroll.classList.add("nav__scroll__change");
    }
  });
}, sectionTreeOptions);
sectionTreeObserver.observe(sectionTree);