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

// Mantem o controle da musica e dados como nome dos artistas o nome das musicas e capa dos albums 
let musicaIndex = 0;
musicas = ['./musicas/Higher.mp3', './musicas/Toddle.mp3', './musicas/Solstice.mp3', './musicas/Bliss.mp3', './musicas/Simplexity.mp3']; 
albums = ['./imagens/Higher.jpg', './imagens/Toddle.jpg', './imagens/Solstice.jpg', './imagens/Bliss.jpg', './imagens/Simplexity.jpg']; 
Artistas = ['Misha, jussi Halme', 'Oddfish', 'Middle School, Henry Gritton', 'Misha, jussi Halme', 'Evil Needle']; 
Titulos = ["Higher", "Toddle", 'Solstice', 'Bliss', 'Simplexity']; 


// Carrega inicialmente os detalhes da música no DOM
loadMusica(musicas[musicaIndex]);

// Atualiza detalhes da musicas
function loadMusica() {
  Artista.innerHTML = Artistas[musicaIndex];
  titulo.innerHTML = Titulos[musicaIndex];
  audio.src = musicas[musicaIndex];
  album.src = albums[musicaIndex];
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


// atualiza progresso.max da musica  duração, o mesmo para o progresso.value, atualiza o currentTime/duration no DOM
function updateProgressoValue() {
  progresso.max = audio.duration;
  progresso.value = audio.currentTime;
  document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
  if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
      document.querySelector('.durationTime').innerHTML = "0:00";
  } else {
      document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
  }
};

// converter musica.currentTime e musica.duration para formato MM:SS 
function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

// rodar updateProgressoValue function cada 1/2 secundos para mostrar mudanças no progresso e na musica.currentTime no DOM
setInterval(updateProgressoValue, 500);

// function onde o progresso.value é mudado quando slider a barra de progresso é adiantada sem audio auto-playing 
function mudarProgresso() {
  audio.currentTime = progresso.value;
};




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

/* SLIDER SECTION */

let slides = document.querySelectorAll('.slide__wrap div');
let slideSayisi = slides.length;


let prevSlider = document.querySelector('.sliderBtn__prev');
let nextSlider = document.querySelector('.sliderBtn__next');

for (let index = 0; index < slides.length; index++) {
    const element = slides[index];
    element.style.transform = "translateX("+100*(index)+"%)";
}
let loop = 0 + 1000*slideSayisi;

function proximo(){
    loop++;
            for (let index = 0; index < slides.length; index++) {
                const element = slides[index];
                element.style.transform = "translateX("+100*(index-loop%slideSayisi)+"%)";
            }
}

function anterior(){
    loop--;
            for (let index = 0; index < slides.length; index++) {
                const element = slides[index];
                element.style.transform = "translateX("+100*(index-loop%slideSayisi)+"%)";
            }
}

nextSlider.addEventListener('click',proximo);
prevSlider.addEventListener('click',anterior);
document.addEventListener('keydown',function(e){
    if(e.code === 'ArrowRight'){
        proximo();
    }else if(e.code === 'ArrowLeft'){
        anterior();
    }
});


/* PLAYER TOGGLE */

function toggleMenu(){
  const menuToggle = document.querySelector('#toggle');
  const navigation = document.querySelector('.player__container');
  navigation.classList.toggle('active');
};

// ADICIONAR INTERSECTION OBSERVER API PARA MUDAR A COR DA NAVBAR DEPENDENDO DA POSIÇÃO DO VIEWPORT.

const header = document.querySelector("header");
const sectionOne = document.querySelector(".realeses__songs");

const sectionOneOptions = {
  threShold: 0,
  rootMargin: "0px 0px -230px 0px"
};

sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.remove("nav__scroll");
    } else {
      header.classList.add("nav__scroll");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);




const navbar = document.querySelector("header");
const sectionTwo = document.querySelector(".chillhoop__setion");

const sectionTwoOptions = {
  threShold: 0,
  rootMargin: "0px 0px -590px 0px"
};

sectionTwoObserver = new IntersectionObserver(function(
  entries,
  sectionTwoObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.remove("nav__chill");
    } else {
      navbar.classList.add("nav__chill");
    }
  });
},
sectionTwoOptions);

sectionTwoObserver.observe(sectionTwo);




const navScroll = document.querySelector("header");
const sectionTree = document.querySelector(".all__rights");

const sectionTreeOptions = {
  threShold: 1,
  rootMargin: "0px 0px -20px 0px"
};

sectionTreeObserver = new IntersectionObserver(function(
  entries,
  sectionTreeObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navScroll.classList.remove("nav__scroll__change");
    } else {
      navScroll.classList.add("nav__scroll__change");
    }
  });
},
sectionTreeOptions);

sectionTreeObserver.observe(sectionTree);


