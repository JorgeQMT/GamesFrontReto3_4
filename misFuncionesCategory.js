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

//Funcione que pinta en cards la informacion de games
function pintarRespuestaG(respuestaG){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaG.length; i++){
        myTable+=`
        <div class="card text-white bg-primary mb-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${respuestaG[i].category.name}</h5>
            <h5 class="card-title">${respuestaG[i].name}</h5>
            <h6 class="card-subtitle">${respuestaG[i].developer}</h6>
            <p class="card-text">${respuestaG[i].description}</p>
            <p class="card-text">${respuestaG[i].year}</p>
        </div>
        </div>`;
    }
    myTable+='</div></div>';
    $("#resultadoG").append(myTable);
}

//Funciones de la tabla Category
$(document).ready(function (){
    traerInformacionCategory();
});

//Funcione que trae la informacion de Category
function traerInformacionCategory(){
    $.ajax({
        url:"http://144.22.241.63:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaCategory){
            console.log(respuestaCategory);
            pintarRespuestaCategory(respuestaCategory);
        }
    });
}

//Funcione que pinta en cards la informacion de Category
function pintarRespuestaCategory(respuestaCategory){
    let myTable="<table>";
    for(i=0; i<respuestaCategory.length; i++){
        myTable += `<tr>
        <td>${respuestaCategory[i].name}</td>
        <td>${respuestaCategory[i].description}</td>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="actualizarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="borrarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoCategory").html(myTable);
}
//Funcion que guarda una nueva Category
function guardarElementoCategory(){
    let myData={
        name:$("#nameCategory").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://144.22.241.63:8080/api/Category/save",
        success:function(response) {
            console.log(response);
            console.log("La Categoria se Guardo Correctamente");
            alert("La Categoria se Guardo Correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("La Categoria no se Guardo Correctamente");
        }
    });
}
//Funcion que actualiza una Category
function actualizarElementoCategory(idElemento){
    let myData={
        id:idElemento,
        name:$("#nameGame").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.241.63/api/Category/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            traerInformacionCategory();
            alert("Categoria Actualizada con Exito")            
        }
    });
}
//Funcion que borra una Category
function borrarElementoCategory(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.241.63:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            traerInformacionCategory();
            alert("Categoria Eliminada con Exito.")
        }
    });
}

