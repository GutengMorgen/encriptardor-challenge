const mybutton = document.getElementById("encriptar");
const myOtherButton = document.getElementById("desencriptar");
const txt_encriptar = document.getElementById("txt_encriptar");
const txt_encriptado = document.getElementById("txt_encriptado");
const table = document.getElementById("mytable");
const tbody = document.getElementById("mytbody");


mybutton.addEventListener("click", fefe);

myOtherButton.addEventListener("click", another);

/*function modific(text)
{
    let cadena = text.split('');
    let ecec = '';
    for (let i = cadena.length - 1; i >= 0; i--) 
    {
        console.log(cadena[i])
        ecec += cadena[i];
    }
    txt_encriptado.value = ecec;
}*/

let change1 = "";
let change2 = "";

function newRow()
{
    //para insertar una fila en la tabla
    const row = tbody.insertRow(0);

    const cell_box = row.insertCell();
    const cell_copy = row.insertCell();
    const cell_hidden = row.insertCell();

    cell_box.setAttribute("id", "2-1");
    cell_copy.setAttribute("id", "2-2");
    cell_hidden.setAttribute("id", "2-3");

    const textarea = document.createElement("textarea");
    const copyBt = document.createElement("button");
    const hidden = document.createElement("button");

    textarea.setAttribute("class", "EncryptedBox");
    copyBt.innerHTML = "Copy";
    hidden.setAttribute("class", "hiddenBt");
    hidden.innerHTML = "-";

    // document.getElementById("2-1").appendChild(textarea);
    // document.getElementById("2-2").appendChild(copyBt);
    // document.getElementById("2-3").appendChild(hidden);

    row.cells[0].appendChild(textarea);
    row.cells[1].appendChild(copyBt);
    row.cells[2].appendChild(hidden);
}

function fefe()
{
    newRow();
    let start = txt_encriptar.value;
    start = start.replaceAll(/e/g, "enter")
                 .replaceAll(/i/g, "imes")
                 .replaceAll(/o/g, "ober")
                 .replaceAll(/a/g, "ai")
                 .replaceAll(/u/g, "ufat");
    change1 = start;
    txt_encriptado.value = start;
}


function dede()
{
    let end = txt_encriptado.value;
    end = end.replaceAll(/enter/g, "e")
             .replaceAll(/imes/g, "i")
             .replaceAll(/ober/g, "o")
             .replaceAll(/ai/g, "a")
             .replaceAll(/ufat/g, "u");
    change2 = end;
    // txt_encriptar.value = end;
}

let condition = false;

function another()
{
    dede();
    if(condition)
    {
        myOtherButton.innerHTML = "-";
        txt_encriptado.value = change1;
        condition = false;
    }
    else
    {
        myOtherButton.innerHTML = "o";
        txt_encriptado.value = change2;
        condition = true;
    }
    /*myOtherButton.innerHTML = "o";
    let count = 0;
    if (myOtherButton.innerHTML === "-")
    {
        myOtherButton.innerHTML = "o";
        count++;
    }
    if (count == 1)
    {
        myOtherButton.innerHTML = "-";
        count = 0;
    }*/

}

//agregar una funcion para que cuando se presione el boton encriptador, se agrege una fila nueva en la tabla
//hacer un boton para eliminar todas las filas de la tabla
//