//diseño
let fondo;
let icon;

//canciones
let cancion;
let canciones = ["./canciones/Sono Bisque Doll.mp3", "./canciones/The_Rumbling.mp3", "./canciones/Lost in paradise.mp3", "./canciones/Zankyou Sanka.mp3", "./canciones/Kyokaisen.mp3"];

//botones
let playbutton;
let stopbutton;
let nextButton;
let prevButton;
let button;

//funcionalidad del slider
let input;
let greeting;

let playlists = [];

let cargarCanciones = [];
let reproducir = false;
let reproduciendo = false;
let data;
let nombre = false;

let status = 0;

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
  x: 1080,
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

  nextButton = new NextButton();
  prevButton = new PrevButton();

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

  button = createButton("COMENZAR");
  button.position(50, 10);
  button.mousePressed(suPlay);

  slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(150, 10);
  slider.style('width', '200px');
}

function pintarNombre(file) {
  fill(255);
  textSize(15);
  text(file, 170, 670);
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

  //nextButton.pintar();
  //prevButton.pintar();

  textAlign(CENTER);
  textSize(18);
  fill(237, 224, 245);
  text('Inserta el nombre', 95, 190);

  if (nombre) {
    pintarNombre(data);
  }

  playlists.forEach((element, index) => {
    text(element.nombre, 30, 250)
    console.log(element.nombre)
  })

  if (nextButton.isPressed) {
    next();
  }

  rectMode(CORNER);
  rect(this.rectangle.x,this.rectangle.y,this.rectangle.w,this.rectangle.h)
  ellipseMode(CENTER)
  ellipse(this.bola.x,this.bola.y,this.bola.r*2)

}

function mousePressed() {
  if (mouseX > 375 && mouseX < 506) {
    if (mouseY > 171 && mouseY < 334) {
      stopAll();
      cargarCanciones[0].play();
      let archivo = cargarCanciones[0].file;
      archivo = archivo.split('/');
      data = archivo[2];
      nombre = true;
      console.log("Se reproduce 1");
    }
  }

  if (mouseX > 535 && mouseX < 668) {
    if (mouseY > 171 && mouseY < 336) {
      stopAll();
      cargarCanciones[1].play();
      let archivo = cargarCanciones[1].file;
      archivo = archivo.split('/');
      data = archivo[2];
      nombre = true;
      console.log("Se reproduce 2");
      console.log(cargarCanciones);
    }
  }

  if (mouseX > 691 && mouseX < 823) {
    if (mouseY > 169 && mouseY < 336) {
      stopAll();
      cargarCanciones[2].play();
      let archivo = cargarCanciones[2].file;
      archivo = archivo.split('/');
      data = archivo[2];
      nombre = true;
      console.log("Se reproduce 3");
      console.log(cargarCanciones);
    }
  }

  if (mouseX > 375 && mouseX < 510) {
    if (mouseY > 360 && mouseY < 522) {
      stopAll();
      cargarCanciones[3].play();
      let archivo = cargarCanciones[3].file;
      archivo = archivo.split('/');
      data = archivo[2];
      nombre = true;
      console.log("Se reproduce 4");
      console.log(cargarCanciones);
    }
  }

  if (mouseX > 532 && mouseX < 668) {
    if (mouseY > 360 && mouseY < 522) {
      stopAll();
      cargarCanciones[4].play();
      let archivo = cargarCanciones[4].file;
      archivo = archivo.split('/');
      data = archivo[2];
      nombre = true;
      console.log("Se reproduce 5");
      console.log(cargarCanciones);
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
      
      if(OUTPUT === 'VOLUME') {
        const volume = map(mouseX, bonderies.x1,bonderies.x2, 0,100) / 100;
        this.song.setVolume(volume)
      } else if (OUTPUT === "HEAD") {
        const head = map(mouseX, bonderies.x1,bonderies.x2, 0,this.song.duration());
        this.song.jump(head)
      }

    }
  }
}

function playsound() 
{
  if(soundtrack.isPlaying() == false) 
  {
    soundtrack.play();
  } 
}
 
function stopsound() 
{
  if(soundtrack.isPlaying() == true) 
  {
    soundtrack.pause();
  } 
}