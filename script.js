const encriptar = document.getElementById("encriptar"); //boton predeterminado
const desencriptar = document.getElementById("desencriptar"); //boton de la 3 celda de la primera fila de la tabla
const txt_encriptar = document.getElementById("txt_encriptar"); //textarea predeterminado
const txt_encriptado = document.getElementById("txt_encriptado"); //textarea de la 1 celda de la primera fila de la tabla
const tbody = document.getElementById("mytbody"); //fila de la tabla predeterminado

encriptar.addEventListener("click", MyEncryptor);   //evento
desencriptar.addEventListener("click", SwitchMode); //evento

let change1 = '', change2 = '';
let condition = false;

function newRow()
{
    //para insertar una fila en la tabla
    const row = tbody.insertRow(0);
    
    for (let i = 0; i < 3; i++)
    {
        row.insertCell();
    }
    
    const textarea = document.createElement("textarea");
    textarea.setAttribute("class", "EncryptedBox");

    const copyBt = document.createElement("button");
    copyBt.innerHTML = "Copy";

    const hidden = document.createElement("button");
    hidden.setAttribute("class", "hiddenBt");
    hidden.innerHTML = "-";
    hidden.addEventListener("click", SwitchMode)

    row.cells[0].appendChild(textarea);
    row.cells[1].appendChild(copyBt);
    row.cells[2].appendChild(hidden);
}

//tal vez no sea necesario crear una lista solo  usar un array para que encuentre la primera fila
//luego que encuentre y modifique la cell[0] o cell[1] o cell[2]

function MyEncryptor()
{
    newRow();
    const firstRow = tbody.rows[0];

    const mytxt = firstRow.cells[0].querySelector("textarea");
    const mycopy = firstRow.cells[1].querySelector("button");
    const mydesen = firstRow.cells[2].querySelector("button");
    // console.log(mytxt, mycopy, mydesen);

    let start = txt_encriptar.value;
    start = start.replaceAll(/e/g, "enter")
                 .replaceAll(/i/g, "imes")
                 .replaceAll(/o/g, "ober")
                 .replaceAll(/a/g, "ai")
                 .replaceAll(/u/g, "ufat");
    change1 = start;
    mytxt.value = start;
}

function MyDecryptor()
{
    const firstRow = tbody.rows[0];
    const mytxt = firstRow.cells[0].querySelector("textarea");

    let end = mytxt.value;
    end = end.replaceAll(/enter/g, "e")
             .replaceAll(/imes/g, "i")
             .replaceAll(/ober/g, "o")
             .replaceAll(/ai/g, "a")
             .replaceAll(/ufat/g, "u");
    change2 = end;
}

function SwitchMode(event)
{
    const firstRow = tbody.rows[0];
    const mytxt = firstRow.cells[0].querySelector("textarea");
    const mydesen = firstRow.cells[2].querySelector("button");

    MyDecryptor();
    if(condition)
    {
        mydesen.innerHTML = "-";
        mytxt.value = change1;
        condition = false;
    }
    else
    {
        mydesen.innerHTML = "o";
        mytxt.value = change2;
        condition = true;
    }

    let thisboton = event.target;
    let parentcell = thisboton.parentNode;
    let parentrow = parentcell.parentNode;
    let findtxt = parentrow.cells[0].querySelector("textarea");
    console.log(findtxt, thisboton);
}

//agregar una funcion para que cuando se presione el boton encriptador, se agrege una fila nueva en la tabla
//hacer un boton para eliminar todas las filas de la tabla
//