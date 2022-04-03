//diseño
let fondo;
let icon;

//canciones
let cancion;
let canciones = ["./canciones/Sono Bisque Doll.mp3", "./canciones/The_Rumbling.mp3"];

//botones
let play;
let nextButtom;
let prevButtom;
let button;

let input;
let greeting;

let playlists = [];

let cargarCanciones = [];
let reproducir = false;
let reproduciendo = false;
let data;
let nombre = false;

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

  textAlign(CENTER);
  textSize(18);
  text('Inserta el nombre', 95, 190);
  fill(237, 224, 245);

  


  if (nombre) {
    pintarNombre(data);
  }

  if (reproduciendo) {
    noStroke();
    

  } else {
    rect(620, 670, 8, 20, 2);
    rect(630, 670, 8, 20, 2);
    triangle(620, 675, 600, 665, 600, 685);
  }

  playlists.forEach((element, index) => {
    fill(255);
    text(element.name, 10, 20)
    console.log(element.name)
  })

  rectMode(CORNER);
  rect(this.rectangle.x,this.rectangle.y,this.rectangle.w,this.rectangle.h)
  ellipseMode(CENTER)
  ellipse(this.bola.x,this.bola.y,this.bola.r*2)


}

function mousePressed() {
  if (mouseX > 288 && mouseX < 480) {
    if (mouseY > 265 && mouseY < 441) {
      stopAll();
      cargarCanciones[0].play();
      let archivo = cargarCanciones[0].file;
      archivo = archivo.split('/');
      data = archivo[2];
      nombre = true;
    }
  }

  if (mouseX > 520 && mouseX < 709) {
    if (mouseY > 267 && mouseY < 442) {
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

  console.log(mouseX, mouseY);
}

function mouseDragged(){
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
