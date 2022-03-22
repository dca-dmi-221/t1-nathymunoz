let fondo;
let icon;

let cancion;
let canciones = ["./canciones/Sono_Bisque_Doll.mp3", "./canciones/The_Rumbling.mp3"];

let cargarCanciones = [];
let reproducir = false;
let reproduciendo = false;
let data;
let nombre = false;

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
  fondo = new loadImage("./images/Fondo.jpg");
  icon = new loadImage("./images/Icono.png");
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
  text(file, 560, 680);
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

function draw() {
  background(220);

  //fondo de la app
  imageMode(CENTER);
  image(fondo, 640, 360, 1280, 720);

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
