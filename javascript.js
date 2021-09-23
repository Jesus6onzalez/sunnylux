var database = firebase.database();


//database.ref('/invernadero').update({
//    humedad:0,temperaturac:0,temperaturaf:0,indicec:0,indicef:0,salida:0});

document.getElementById("boton").style.background="#0404B1"



// some HTML element on the page
var postElement1 = document.getElementById("postElement1");
var humedad= postElement1.innerHTML;
var postElement2 = document.getElementById("postElement2");
var temperatura= postElement2.innerHTML;
var fondo=document.getElementById("fondo")

var updateStarCount = function(element, value) {
    element.textContent = value+" Lux";
};
var Count = function(element, value) {
    element.textContent = value+"!";
};
var starCountRef = firebase.database().ref('sunnylux/' + '/lux');
starCountRef.on('value', function(snapshot) {
    var lux=snapshot.val();
    updateStarCount(postElement1, lux);
});
var starCountRef = firebase.database().ref('sunnylux/' + '/lux');
starCountRef.on('value', function(snapshot) {
    var lux=snapshot.val();
    if(lux>15){
        //document.body.style.backgroundImage=url("img/dia.jpg");
        document.getElementById("solyluna").src="img/bg1.png";
        fondo.style.backgroundImage="url('img/dia.jpg')";
        document.getElementById("titulo").style.color="#000000"
    }
    if(lux<=15){
        //document.body.style.backgroundImage=url("img/noche.jpg");
        document.getElementById("solyluna").src="img/bg2.png";
        fondo.style.backgroundImage="url('img/noche.jpg')";
        document.getElementById("titulo").style.color="#FFFFFF"
    }
});


var starCountRef = firebase.database().ref('sunnylux/' + '/luces_casa');
starCountRef.on('value', function(snapshot) {
    var onoff=snapshot.val();
    Count(postElement2, onoff);
});



var lamparain = false;
function lampara(){
if(lamparain==false){
    database.ref('/sunnylux').update({
        luces_casa:"Luces encendidas", on_off:1});
    lamparain=true;
    document.getElementById("boton").style.color="#59E939"
    
}else{
    database.ref('/sunnylux').update({
        luces_casa:"Luces apagadas", on_off:0});
        lamparain=false;
        document.getElementById("boton").style.color="#fff"
       
}
}

//*var starCountRef = firebase.database().ref('invernadero/' + '/color');
//starCountRef.on('value', function(snapshot) {
//    var color=snapshot.val();
//    if(color=="verde"){
//        document.body.style.background="#58C243";
//    }
//    if(color=="azul"){
//        document.body.style.background="#308C97";
//    }
//    if(color=="rojo"){
//        document.body.style.background="#E2512A";
//    }
//});

