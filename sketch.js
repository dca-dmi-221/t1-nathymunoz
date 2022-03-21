let fondo;
let icon;

let cargarCanciones = [];
let cancion;
let reproducir = false;

function setup() {
  createCanvas(1280, 720);
  dropZone = select("#cargarCancion");
  dropZone.dragOver(resaltado);
  dropZone.dragLeave(noResaltado);
  dropZone.drop(cargarArchivo,noResaltado);
  fondo = new loadImage("./images/Fondo.jpg");
  icon = new loadImage("./images/Icono.png");
}

function cargarArchivo(file) {
  createP(file.name);
  createP(file.type);
  createP(file.size);
  soundFormats("mp3","ogg");
  //cargarCanciones.push(loadSound(file));
  cancion = loadSound(file, loaded);
}

function loaded() {
  cancion.play();
}

function resaltado() {
  dropZone.style("background-color","#ccc");
}

function noResaltado() {
  dropZone.style("background-color","#fff");
}

function draw() {
  background(220);
  

  //fondo de la app
  imageMode(CENTER);
  image(fondo, 640, 360, 1280, 720);

  /*barra izquierda
  fill(15);
  noStroke();
  rect(0, 0, 250, 720);

  //barra inferior
  fill(30);
  rect(0, 620, 1280, 100);

  fill(200);
  stroke(90);
  textSize(16);
  text('Jamoncada', 78, 55);
  text('Crear Playlist', 78, 150);

  //icono izquierda
  imageMode(CORNER);
  image(icon, 25, 30, 35, 35);*/

}
