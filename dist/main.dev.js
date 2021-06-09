"use strict";

var playerContainer = document.querySelector('player__container');
var playBtn = document.querySelector('#play');
var prevBtn = document.querySelector('#prev');
var proxBtn = document.querySelector('#prox');
var audio = document.querySelector('.audio');
var progresso = document.querySelector('progresso');
var progressoContainer = document.querySelector('progresso-container');
var titulo = document.querySelector('titulo');
var Artista = document.querySelector('artista');
var album = document.querySelector('.track__imagem'); // titulo das musicas 

var musicas = ['hey', 'summer', 'ukulele']; //mantem o controle das musicas

var musicaIndex = 2; // carrega inicialmente detalhes das musicas no DOM

loadMusica(musicas[musicaIndex]); // atualiza detalhes das musicas

function loadMusica(musica) {
  titulo.innerText = musica;
  Artista.innerText = musica;
  audio.src = "music/".concat(musica, ".mp3");
  cover.src = "images/".concat(musica, ".jpg");
} // toca a musica


function musicaPlay() {
  musicaContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}