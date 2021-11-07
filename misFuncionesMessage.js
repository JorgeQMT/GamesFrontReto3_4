const main = () =>{
    let
    canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    w = window.innerWidth,
    h = window.innerHeight,
    fontSize = 16,
    columns = Math.floor(w / fontSize),
    drops =[],
    str = 'JavaScript Matrix Effect',
    matrix = () => {
        context.fillStyle = 'rgba(0,0,5,.05)';
        context.fillRect(0,0,w,h);
        context.fontSize =`650 ${fontSize}px`;
        context.fillStyle = '#31d2f2';
        for (let i=0; i< columns; i++){
            let
              j = Math.floor(Math.random()*str.length),
              x = i*fontSize,
              y = drops[i]*fontSize;
            context.fillText(str[j],x,y);
            y >= canvas.height && Math.random() > 0.99
            ? drops[i]=0
            : drops[i]++;  
        };
    };
    canvas.width = w;
    canvas.height =h;
    for (let i=0; i< columns; i++){
        drops.push(0);
    };
    matrix(); setInterval(matrix, 15);
}; document.addEventListener('DOMContentLoaded', main);

// Rutina para taer las Clientes a un <select>
function traerInformacionC(){
    $.ajax({
        url:"http:/181.56.103.249:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaC){
            console.log(respuestaC);
            pintarRespuestaC(respuestaC);
        }
    });
}
$(document).ready(function (){
    traerInformacionC();
});

// Rutina para agregar opciones al <select> Cliente 
function pintarRespuestaC(respuestaC){
    var mylistaC=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylistaC.innerHTML+=`<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(mylistaC);
}

// Rutina para taer los Juegos a un <select>
function traerInformacionG(){
    $.ajax({
        url:"http://144.22.241.63:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaG){
            console.log(respuestaG);
            pintarRespuestaG(respuestaG);
        }
    });
}
$(document).ready(function (){
    traerInformacionG();
});

// Rutina para agregar opciones al <select> Juego 
function pintarRespuestaG(respuestaG){
    var mylistaG=document.getElementById("resultadoG");
    for(i=0; i<respuestaG.length; i++){
        mylistaG.innerHTML+=`<option value="${respuestaG[i].id}">${respuestaG[i].name}</option>`;
    }
    console.log(mylistaG);
}

//Funciones de la tabla Mensajes
$(document).ready(function (){
    traerInformacionMessage();
});

//Funcione que trae la informacion de Mensajes
function traerInformacionMessage(){
    $.ajax({
        url:"http://144.22.241.63:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaMessage){
            console.log(respuestaMessage);
            pintarRespuestaMessage(respuestaMessage);
        }
    });
}
//
function pintarRespuestaMessage(respuestaMessage){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaMessage.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
        <div class="card-body">
            <h4 class="card-title">Cliente: ${respuestaMessage[i].client.name}</h4>
            <h4 class="card-title">Juego: ${respuestaMessage[i].game.name}</h4>
            <p class="card-text">Mensaje: ${respuestaMessage[i].messageText}</p>
            <button class="btn btn-danger" onclick="borrarElementoMessage(${respuestaMessage[i].idMessage})">Borrar</button>
            <button class="btn btn-success"  onclick="actualizarElementoMessage(${respuestaMessage[i].idMessage})">Actualizar</button>
        </div>        
        </div>`
    }
    myTable+='</div></div>';
    $("#resultadoMessage").append(myTable);
}
//Funcion que guarda un nuevo Mensaje
function guardarElementoMessage(){
    let myData={
        client:{idClient:document.getElementById("resultadoC").value},
        game:{id:document.getElementById("resultadoG").value},
        messageText:$("#messageText").val(),
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://144.22.241.63:8080/api/Message/save",
        success:function(response) {
            console.log(response);
            console.log("El Mensaje se Guardo Correctamente");
            alert("El Mensaje se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("El Mensaje no se Guardo Correctamente");
        }
    });
}
//Funcion que actualiza un Mensaje
function actualizarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento,
        client:{idClient:document.getElementById("resultadoC").value},
        game:{id:document.getElementById("resultadoG").value},
        messageText:$("#messageText").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.241.63:8080/api/Message/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            $("#idMessage").val("");
            $("#resultadoC").val("");
            $("#resultadoG").val("");
            traerInformacionMessage();
            alert("Mensaje Actualizado con Exito")            
        }
    });
}
//Funcion que borra un Menesaje
function borrarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.241.63:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Mensaje Eliminado con Exito.")
        }
    });
}

