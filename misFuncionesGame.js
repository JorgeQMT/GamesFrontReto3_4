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

// Rutina para taer las categorias a un <select>
function traerInformacionC(){
    $.ajax({
        url:"http://144.22.241.63:8080/api/Category/all",
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

// Rutina para agregar opciones al <select> categoria 
function pintarRespuestaC(respuestaC){
    var mylista=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylista.innerHTML+=`<option value="${respuestaC[i].id}">${respuestaC[i].name}</option>`;
    }
    console.log(mylista);
}

//Funciones de la tabla Juego
$(document).ready(function (){
    traerInformacionGame();
});

//Funcione que trae la informacion de games
function traerInformacionGame(){
    $.ajax({
        url:"http://144.22.241.63:8080/api/Game/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaGame){
            console.log(respuestaGame);
            pintarRespuestaGame(respuestaGame);
        }
    });
}

//Funcione que pinta en cards la informacion de games
function pintarRespuestaGame(respuestaGame){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaGame.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
        <div class="card-body">
            <h4 class="card-title">Juego: ${respuestaGame[i].name}</h4>
            <h5 class="card-subtitle">Desarrollador: ${respuestaGame[i].developer}</h5>
            <p class="card-text">Descrpcion: ${respuestaGame[i].description}</p>
            <p class="card-text">Edad Minima: ${respuestaGame[i].year}</p>
            <button class="btn btn-danger" onclick="borrarElementoGame(${respuestaGame[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
            <button class="btn btn-success" onclick="actualizarElementoGame(${respuestaGame[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        </div>
        </div>`
    }
    myTable+='</div></div>';
    $("#resultadoGame").append(myTable);
}
//Funcion que guarda un nuevo juego
function guardarElementoGame(){
    let myData={
        category:{id:document.getElementById("resultadoC").value},
        name:$("#nameGame").val(),
        developer:$("#developer").val(),
        description:$("#description").val(),
        year:$("#year").val()
    };
    console.log(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://144.22.241.63:8080/api/Game/save",
        success:function(response) {
            console.log(response);
            console.log("El Juego se Guardo Correctamente");
            alert("El Juego se Guardo Correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("El Juego no se Guardo Correctamente");
        }
    });
}
//Funcion que actualiza un Juego
function actualizarElementoGame(idElemento){
    let myData={
        id:idElemento,
        category:{id:document.getElementById("resultadoC").value},
        name:$("#nameGame").val(),
        developer:$("#developer").val(),
        description:$("#description").val(),
        year:$("#year").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.241.63:8080/api/Game/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoGame").empty();
            $("#id").val("");
            $("#name").val("");
            $("#developer").val("");
            $("#description").val("");
            $("#year").val("");
            traerInformacionGame();
            alert("Juego Actualizado con Exito")            
        }
    });
}
//Funcion que borra un Juego
function borrarElementoGame(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.241.63:8080/api/Game/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoGame").empty();
            traerInformacionGame();
            alert("Juego Eliminado con Exito.")
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("El Juego no se Elimino Correctamente");
        }
    });
}

