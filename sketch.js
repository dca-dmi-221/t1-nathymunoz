//diseño
let fondo;
let icon;

//canciones
let cancion;
let canciones = ["./canciones/Sono Bisque Doll.mp3", "./canciones/The Rumbling.mp3", "./canciones/Lost in paradise.mp3", "./canciones/Zankyou Sanka.mp3", "./canciones/Kyokaisen.mp3"];

//botones
let playbutton;
let stopbutton;
let button;
let bar;

//funcionalidad del slider
let input;
let greeting;

// index
let r;

// largo reproduccion
let bl=0;

let playlists = [];

let cargarCanciones = [];
let reproducir = false;
let reproduciendo = false;
let data;
let nombre = false;

let status = 0;
let volume = 0.5;

let vol;

const OUTPUT = "HEAD"; // VOLUME | HEAD

const WIDTH = 180;
const HEIGH = 700;

this.song;

this.rectangle = {
  x: 1080,
  y: 672,
  w: WIDTH/13 * 10,
  h: 10

}

this.bola = {
  x: 1218,
  y: 678,
  r: 10
}


function preload() {
  soundFormats("mp3", "ogg");
  canciones.forEach(cancion => {
    cargarCanciones.push(loadSound(cancion));
  });
}

function setup() {
  createCanvas(1280, 720);
  dropZone = select("#cargarCancion");
  dropZone.dragOver(resaltado);
  dropZone.dragLeave(noResaltado);
  dropZone.drop(cargarArchivo, noResaltado);
  
  fondo = new loadImage("./images/Pantalla.jpg");
  icon = new loadImage("./images/Icono.png");

  input = createInput();
  input.position(25, 200);

  button = createButton('submit');
  button.position(input.x + input.width, 200);
  button.mousePressed(greet);

  bar = new Bar();

    // play button
  playbutton = createButton('Play');
  playbutton.position(600, 660);
  playbutton.mousePressed(playsound);
  
  // stop button
  stopbutton = createButton('Stop');
  stopbutton.position(640, 660);
  stopbutton.mousePressed(stopsound);
    

}

function stopAll() {
  cargarCanciones.forEach(elemento => {
    elemento.stop();
  });
  nombre = false;
}

function pintarNombre(file) {
  fill(255);
  textSize(15);
  text(file, 170, 670);
}
function pintarTiempo(segundos) {

  let minutos = Math.floor((segundos / 60) % 60);
  minutos = (minutos < 10)? '0' + minutos : minutos;
  let segundo = Math.floor(segundos % 60);
  segundo = (segundo < 10)? '0' + segundo : segundo;
  let tiempo = minutos + ':' + segundo;
  
  fill(255);
  textSize(15);
  text(tiempo, 170, 690);
}

function cargarArchivo(file) {
  data = file.name;
  createP(file.type);
  createP(file.size);
  soundFormats("mp3", "ogg");
  cancion = loadSound(file, loaded);
  cargarCanciones.push(cancion);
}

function loaded() {
  cancion.play();
  nombre = true;
}

function resaltado() {
  dropZone.style("background-color", "#ccc");
}

function noResaltado() {
  dropZone.style("background-color", "#fff");
}

function greet() {
  const name = input.value();
  playlists.push(new Playlist(name, []))
  input.value('');
  
}
function draw() {
  background(220);

  //fondo de la app
  imageMode(CENTER);
  image(fondo, 640, 360, 1280, 720);

  bar.pintar(bl);

  textAlign(CENTER);
  textSize(18);
  fill(237, 224, 245);
  text('Inserta el nombre', 95, 190);

  if (nombre) {
    pintarNombre(data);
    pintarTiempo(round(cargarCanciones[r].currentTime()))
  }

  playlists.forEach((element, index) => {
    text(element.nombre, 30, 250)
    console.log(element.nombre)
  }) 

  rectMode(CORNER);
  rect(this.rectangle.x,this.rectangle.y,this.rectangle.w,this.rectangle.h)
  ellipseMode(CENTER)
  ellipse(this.bola.x,this.bola.y,this.bola.r*2)

  if(r>=0){
    bl= cargarCanciones[r].currentTime()*(1280/cargarCanciones[r].duration());
  }

}

function mousePressed() {
  if (mouseX > 375 && mouseX < 506) {
    if (mouseY > 171 && mouseY < 334) {
      reproduccion(0);
    }
  }

  if (mouseX > 535 && mouseX < 668) {
    if (mouseY > 171 && mouseY < 336) {
      reproduccion(1);
    }
  }

  if (mouseX > 691 && mouseX < 823) {
    if (mouseY > 169 && mouseY < 336) {
      reproduccion(2);
    }
  }

  if (mouseX > 375 && mouseX < 510) {
    if (mouseY > 360 && mouseY < 522) {
      reproduccion(3);
    }
  }

  if (mouseX > 532 && mouseX < 668) {
    if (mouseY > 360 && mouseY < 522) {
      reproduccion(4);
    }
  }

  if (mouseX > 690 && mouseX < 719) {
    if (mouseY > 663 && mouseY < 683) { 
      next();
    }
  }

  if (mouseX > 559 && mouseX < 589) { 
    if (mouseY > 663 && mouseY < 683) { 
      back();
    }
  }

  if (mouseX >  505 && mouseX < 529) { 
    if (mouseY > 664 && mouseY < 683) { 
      timemenos();
    }
  }

  if (mouseX >  749 && mouseX < 771) { 
    if (mouseY > 664 && mouseY < 683) { 
      timemas();
    }
  }

  console.log(mouseX, mouseY);
}

function mouseDragged(){
  //Slider volumen
  if(dist(mouseX,mouseY, this.bola.x,this.bola.y) < this.bola.r){
    const bonderies = {
      x1: this.rectangle.x,
      x2: this.rectangle.x + this.rectangle.w,
    }
    const isInRange = mouseX > bonderies.x1 && mouseX < bonderies.x2;
    if(isInRange){
      this.bola.x = mouseX;
      
      if(OUTPUT === 'HEAD') {
        const volume = map(mouseX, bonderies.x1,bonderies.x2, 0,100) / 100;
        for (let i = 0; i < cargarCanciones.length; i++) {
          cargarCanciones[i].setVolume(volume)
        }
        
      }

    }
  }
}


function reproduccion(num){
  stopAll();
  cargarCanciones[num].play();
  let archivo = cargarCanciones[num].file;
  archivo = archivo.split('/');
  data = archivo[2];
  nombre = true;
  r=num;
}

function playsound() 
{
  console.log(cargarCanciones[r]);
  if(r>=0) 
  {
    if(cargarCanciones[r].isPlaying() == false)
    {
      cargarCanciones[r].play();  
      console.log(cargarCanciones[r]);
    }
  }else{
    reproduccion(0)
  }
}
 
function stopsound() 
{
  if(cargarCanciones[r].isPlaying() == true) 
  {
    cargarCanciones[r].pause();
  } 
}

function next() 
{
  if(r<cargarCanciones.length-1) 
  {
    r=r+1;
    reproduccion(r);
  } 
}

function back() 
{
  if(r>0) 
  {
    r=r-1;
    reproduccion(r);
  } 
}

function timemas() 
{
    cargarCanciones[r].jump(cargarCanciones[r].currentTime()+10); 
}

function timemenos() 
{
    cargarCanciones[r].jump(cargarCanciones[r].currentTime()-10); 
}