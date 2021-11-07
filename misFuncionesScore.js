//Funcion para el fondo de pantalla
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

//Funcion para traer el usuario de git
$.get("/user", function (data) {
    $("#user").html(data.name);
    $(".unauthenticated").hide();
    $(".authenticated").show();
});
$.get("/user", function (data) {
    $("#user").html(data.name);
});

//Funciones del <select> Reservacion
$(document).ready(function(){
    traerInformacionR();
});

// Rutina para taer las Reservacion a un <select>
function traerInformacionR(){
    $.ajax({
        url:"http://144.22.241.63:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaR){
            console.log(respuestaR);
            pintarRespuestaR(respuestaR);
        }
    });
}

// Rutina para pintar las Reservacion a un <select>
function pintarRespuestaR(respuestaR){
    var mylista=document.getElementById("resultadoR");
    for(i=0; i<respuestaR.length; i++){
        mylista.innerHTML+=`<option value="${respuestaR[i].idReservation}">${respuestaR[i].idReservation}</option>`;
    }
    console.log(mylista);
}

//Funciones de la tabla Score
$(document).ready(function(){
    traerInformacionScore();
});

// Rutina para taer las Calificaciones
function traerInformacionScore(){
    $.ajax({
        url:"http://144.22.241.63:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaScore){
            console.log(respuestaScore);
            pintarRespuestaScore(respuestaScore);
        }
    });
}

//Funcion que pinta la informacion de la tabla calificacion
function pintarRespuestaScore(respuestaScore){
    let myTableS= '<div class="container"><div class="row">';
    for(i=0; i<respuestaScore.length; i++){
        myTableS+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Id Reserva: ${respuestaScore[i].reservation.idReservation}</h5>
            <h5 class="card-subtitle">Fecha Inicio: ${respuestaScore[i].reservation.startDate.substring(0, 10)}</h5>
            <h5 class="card-subtitle">Fecha Final: ${respuestaScore[i].reservation.devolutionDate.substring(0, 10)}</h5>
            <h5 class="card-title">Juego: ${respuestaScore[i].reservation.game.name}</h5>
            <h5 class="card-subtitle">Developer: ${respuestaScore[i].reservation.game.developer}</h5>
            <h5 class="card-subtitle">Edad Minima:${respuestaScore[i].reservation.game.year}</h5>
            <h5 class="card-title">Id Cliente: ${respuestaScore[i].reservation.client.idClient}</h5>
            <h5 class="card-title">Nombre: ${respuestaScore[i].reservation.client.name}</h5>
            <h5 class="card-subtitle">Correo: ${respuestaScore[i].reservation.client.email}</h5>
            <h5 class="card-title">Estrellas: ${respuestaScore[i].stars}</h5>
            <p class="card-text">Comentario: ${respuestaScore[i].messageText}</p>
            </div>
        </div>`;
    }
    myTableS+='</div></div>';
    $("#resultadoScore").append(myTableS);
}

//Funcion que guarda una nueva Calificacion
function guardarElementoScore(){
    let myData={
        stars:$("#resultadoE").val(),
        messageText:$("#messageText").val(),
        reservation:{idReservation:document.getElementById("resultadoR").value}
   };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://144.22.241.63:8080/api/Score/save",
        success:function(response) {
            console.log(response);
            console.log("La Calificacion se Guardo Correctamente");
            alert("La Calificacion se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("La Calificacion no se Guardo Correctamente");
        }
    });
}
