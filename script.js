const encriptar = document.getElementById("encriptar"); //boton predeterminado
const txt_encriptar = document.getElementById("txt_encriptar"); //textarea predeterminado
const tbody = document.getElementById("mytbody"); //fila de la tabla predeterminado

encriptar.addEventListener("click", principal);   //evento

function principal()
{
    newRow();
    const firstRow = tbody.rows[0];
    const txt = firstRow.cells[0].querySelector("textarea");

    txt.value = MyEncryptor(txt_encriptar);
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

const encriptionDic = {
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "a" : "ai",
    "u" : "ufat"
}

const desencriptionDic = {
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ai": "a",
    "ufat": "u"
}

function MyEncryptor(txt_for_encript)
{
    let getvalue = txt_for_encript.value;
    for (const [key, value] of Object.entries(encriptionDic))
    {
        getvalue = getvalue.replaceAll(new RegExp(key, 'g'), value);
    }
    return getvalue;
}

function MyDescryptor(txt_for_desencript)
{
    let getvalue = txt_for_desencript.value;
    for (const [key, value] of Object.entries(desencriptionDic))
    {
        getvalue = getvalue.replaceAll(new RegExp(key, 'g'), value);
    }
    return getvalue;
}

function SwitchMode(event)
{
    const thisboton = event.target;
    const parentrow = (thisboton.parentNode).parentNode;
    const findtxt = parentrow.cells[0].querySelector("textarea");

    if(thisboton.innerHTML == "-")
    {
        thisboton.innerHTML = "o";
        findtxt.value = MyDescryptor(findtxt);
    }
    else if(thisboton.innerHTML == "o")
    {
        thisboton.innerHTML = "-";
        findtxt.value = MyEncryptor(findtxt);
    }
}

//hacer un boton para eliminar todas las filas de la tabla
//optmizar el cifrado y descrifrado usando diccionarios
//mejorar el estilo