const encriptar = document.getElementById("encriptar"); //boton predeterminado
const desencriptar = document.getElementById("desencriptar"); //boton de la 3 celda de la primera fila de la tabla
const txt_encriptar = document.getElementById("txt_encriptar"); //textarea predeterminado
const txt_encriptado = document.getElementById("txt_encriptado"); //textarea de la 1 celda de la primera fila de la tabla
const tbody = document.getElementById("mytbody"); //fila de la tabla predeterminado

encriptar.addEventListener("click", principal);   //evento
desencriptar.addEventListener("click", end); //evento

let condition = false;

function principal()
{
    newRow();
    const firstRow = tbody.rows[0];
    const txt = firstRow.cells[0].querySelector("textarea");

    txt.value = MyEncryptor(txt_encriptar);
}

function end()
{
    SwitchMode();
}

function newRow()
{
    //para insertar una fila en la tabla
    const row = tbody.insertRow(0);
    
    for (let i = 0; i < 3; i++) {row.insertCell(); }
    
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

function MyEncryptor(txt_for_encriptar)
{
    let start = txt_for_encriptar.value;
    start = start.replaceAll(/e/g, "enter")
                 .replaceAll(/i/g, "imes")
                 .replaceAll(/o/g, "ober")
                 .replaceAll(/a/g, "ai")
                 .replaceAll(/u/g, "ufat");
        
    return start;
}

function MyDescryptor(txt_for_encripted)
{
    let end = txt_for_encripted.value;
    end = end.replaceAll(/enter/g, "e")
             .replaceAll(/imes/g, "i")
             .replaceAll(/ober/g, "o")
             .replaceAll(/ai/g, "a")
             .replaceAll(/ufat/g, "u");

    return end;
}

function SwitchMode(event)
{
    const thisboton = event.target;
    const parentrow = (thisboton.parentNode).parentNode;
    const findtxt = parentrow.cells[0].querySelector("textarea");

    if(condition) //se muestra el mensaje encriptado
    {
        thisboton.innerHTML = "-";
        findtxt.value = MyEncryptor(findtxt);
        condition = false;
    }
    else //se muestra el mensaje desencriptado
    {
        thisboton.innerHTML = "o";
        findtxt.value = MyDescryptor(findtxt);
        condition = true;
    }
}

//hacer un boton para eliminar todas las filas de la tabla