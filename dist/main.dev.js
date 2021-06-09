"use strict";

var musicaContainer = document.getElementById('musica-container');
var playBtn = document.getElementById('play');
var prevBtn = document.getElementById('prev');
var proxBtn = document.getElementById('prox');
var audio = document.querySelector('.audio');
var progresso = document.getElementById('progresso');
var progressoContainer = document.getElementById('progresso-container');
var titulo = document.getElementById('titulo');
var Artista = document.getElementById('artista');
var cover = document.getElementById('cover'); // titulo das musicas 

var musicas = ['hey', 'summer', 'ukulele']; //mantem o controle das musicas

var musicaIndex = 2; // carrega inicialmente detalhes das musicas no DOM

loadMusica(musicas[musicaIndex]); // atualiza detalhes das musicas

function loadMusica(musica) {
  titulo.innerText = musica;
  Artista.innerText = musica;
  audio.src = "music/".concat(musica, ".mp3");
  cover.src = "images/".concat(musica, ".jpg");
}