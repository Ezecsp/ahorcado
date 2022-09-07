var pantalla = document.querySelector('canvas');
var pincel = pantalla.getContext('2d');
var puedoDibujar = false;

function horca(){
    const img = new Image();
    img.src = "../ahorcado/assets/madera.jpg";
    img.onload = () =>{
        const prtn = pincel.createPattern(img,"repeat");
        pincel.fillStyle = prtn;
        pincel.fillRect(222,30,20,450);
        pincel.fillRect(222,30,150,20);
        pincel.fillRect(372,30,20,80);
        pincel.fillRect(160,480,150,20);
    }
}

horca();