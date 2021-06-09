var musicaContainer = document.getElementById('musica-container');
var playBtn = document.getElementById('play');
var prevBtn = document.getElementById('prev');
var proxBtn = document.getElementById('prox');

var audio = document.querySelector('.audio');
var progresso = document.getElementById('progresso');
var progressoContainer = document.getElementById('progresso-container');
var titulo = document.getElementById('titulo');
var Artista = document.getElementById('artista');
var cover = document.getElementById('cover');

// titulo das musicas 
const musicas = ['hey', 'summer', 'ukulele'];

//mantem o controle das musicas
let musicaIndex = 2;

// carrega inicialmente detalhes das musicas no DOM
loadMusica(musicas[musicaIndex]);