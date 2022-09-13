let pantalla = document.getElementById('canvas');
let pincel = pantalla.getContext('2d');

const horca = () => {
    const img = new Image();
    img.src = "../ahorcado/assets/madera.jpg";
    img.onload = () => {
        const prtn = pincel.createPattern(img,"repeat");
        pincel.fillStyle = prtn;
        pincel.fillRect(222,30,20,450);
        pincel.fillRect(222,30,150,20);
        pincel.fillRect(372,30,20,80);
        pincel.fillRect(160,480,150,20);
    };
};

const cuerpo = [
    [350,110,60,60],

    [375,170,10,150],

    [385,220,50,5],

    [325,220,50,5],

    [365,310,10,80],

    [385,310,10,80]
];

const contenedorPalabra = document.getElementById("contenedorPalabra");
const btnNuevoJuego = document.getElementById("btnNuevoJuego");
const btnRenunciar = document.getElementById("btnRenunciar");
const letrasUsadasElementos = document.getElementById("letrasUsadas");

let palabraElegida;
let letrasUsada;
let errores;
let aciertos;

const añadirLetra = letra => {
    const elementoLetra = document.createElement("span");
    elementoLetra.innerHTML = letra.toUpperCase();
    letrasUsadasElementos.appendChild(elementoLetra);
}

const añadirCuerpo = cuerpo => {
    pincel.fillStyle = "black";
    pincel.fillRect(...cuerpo);
}

const letraCorrecta = letra => {
    const { children } = contenedorPalabra;
    for (let i = 0; i < children.length; i++){
        if(children[i].innerHTML === letra){
            children[i].classList.toggle("hidden");
            aciertos++;
        }
    }
    if(aciertos === palabraElegida.length) finDelJuego();
}

const letraIncorrecta = () => {
    añadirCuerpo(cuerpo[errores]); 
    errores++;
    if(errores === cuerpo.length) finDelJuego();
}

const letraIngresada = letra => {
    if(palabraElegida.includes(letra)){
        letraCorrecta(letra);
    }else{letraIncorrecta();}
    añadirLetra(letra);
    letrasUsada.push(letra);
};

const eventoLetra = event => {
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsada.includes(nuevaLetra)) {
        letraIngresada(nuevaLetra);
    };
};

const dibujarPalabra = () => {
    palabraElegida.forEach(letra => {
        const elementoLetra = document.createElement("span");
        elementoLetra.innerHTML = letra.toUpperCase();
        elementoLetra.classList.add("letra");
        elementoLetra.classList.add("hidden");
        contenedorPalabra.appendChild(elementoLetra);
    });
};

const palabraAlAzar = () => {
    let palabra = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    palabraElegida = palabra.split("  ");
}

const nuevoJuego = () => {
    letrasUsada = [];
    errores = 0;
    aciertos = 0;
    contenedorPalabra.innerHTML = " ";
    letrasUsadasElementos.innerHTML = " ";
    btnNuevoJuego.style.display = 'none';
    horca();
    palabraAlAzar();
    dibujarPalabra();
    document.addEventListener("keydown", eventoLetra);
};

const finDelJuego = () => {
    document.removeEventListener("keydown", eventoLetra);
    btnNuevoJuego.style.display= "block";
    document.getElementById("btnRenunciar");
}

btnNuevoJuego.addEventListener("click", nuevoJuego);
btnRenunciar.addEventListener("click", finDelJuego);