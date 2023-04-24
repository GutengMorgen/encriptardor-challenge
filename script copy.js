const encriptar = document.getElementById("Encrypt_Bt");    //boton predeterminado
const txt_input = document.getElementById("element1");      //textarea predeterminado
const txt_output = document.getElementById("element2");
const tbody = document.getElementById("mytbody");           //fila de la tabla predeterminado
const pastebt = document.getElementById("Paste");
const copybt = document.getElementById("Copy");
const mySelect = document.getElementById("lang");

const dictionary = {
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "a" : "ai",
    "u" : "ufat"
}

encriptar.addEventListener("click", testing);   //evento
copybt.addEventListener("click", () => {
    navigator.clipboard.writeText(txt_output.value).then(() => {});
});

pastebt.addEventListener("click", () => {
    navigator.clipboard.readText().then(pasteText => {txt_input.value = pasteText; });
});




mySelect.onchange = function()
{
    if (mySelect.value == "encrypt")
    {
        txt_input.setAttribute("placeholder", "encriptar texto");
        txt_output.setAttribute("placeholder", "enterncrimesptair tenterxtober");
        encriptar.innerHTML = "Encriptar";
    }
    else if (mySelect.value == "decrypt")
    {
        txt_input.setAttribute("placeholder", "tenterxtober enterncrimesptaidober");
        txt_output.setAttribute("placeholder", "texto encriptado");
        encriptar.innerHTML = "Desencriptar";
    }
}

function testing()
{
    //para comprobar si el valor del txt_input esta vacio o nulo
    if (txt_input.value.trim() === "" || txt_input.value === null)
    {
        return alert("The text input is empty!");
    }

    //comprueba si el valor del txt_output no esta vacio, de ser asi agrega un row a la tabla con ese valor
    else if (txt_output.value !== "")
    {
        console.log("the textOutput is not empty, here is the text: ", txt_output.value);
        newRow();
        const firstRow = tbody.rows[0];
        const txt = firstRow.cells[0].querySelector("textarea");
        txt.value = txt_output.value;
    }

    //comprueba que texto tiene el boton para encriptar o desencriptar
    if (encriptar.innerHTML == "Encriptar")
    {
        txt_output.value = MyChiper(txt_input.value);
    }
    else if (encriptar.innerHTML == "Desencriptar")
    {
        txt_output.value = MyChiper(txt_input.value, "decrypt");
    }

    //para eliminar el row predeterminado de la tabla
    if (tbody.rows.length > 1 && document.getElementById("emptyMessage") !== null)
    {
        document.getElementById("emptyMessage").remove();
    }
}



function newRow()
{
    //para insertar una fila en la tabla
    const row = tbody.insertRow(0);
    
    for (let i = 0; i < 2; i++) {row.insertCell(); }
    
    const textarea = document.createElement("textarea");
    textarea.disabled = true;

    const hidden = document.createElement("button");
    hidden.classList.add("material-symbols-rounded", "danes");
    hidden.innerHTML = "Lock";
    hidden.addEventListener("click", SwitchMode);

    const copyBt = document.createElement("button");
    copyBt.classList.add("material-symbols-rounded", "danes");
    copyBt.innerHTML = "Content_Copy";
    copyBt.addEventListener("click", forCopy);

    row.cells[0].appendChild(textarea);
    row.cells[1].appendChild(hidden);
    row.cells[1].appendChild(copyBt);
}

function forCopy() {
    navigator.clipboard.writeText(this.parentNode.parentNode.cells[0].querySelector("textarea").value).then(() => {});
}

function MyChiper(text, mode = "encrypt")
{
    const dict = mode === "encrypt" ? dictionary : Object.entries(dictionary).reduce((acc, [key, value]) => 
    {
        acc[value] = key;
        return acc;
    }, {});

    const regex = new RegExp(Object.keys(dict).join("|"), "g");
    return text.replace(regex, match => dict[match]);
}

function SwitchMode()
{
    const findtxt = this.parentNode.parentNode.cells[0].querySelector("textarea");
    
    this.innerHTML = this.innerHTML === "Lock" ? "Visibility" : "Lock";
    findtxt.value = this.innerHTML === "Lock" ? MyChiper(findtxt.value) : MyChiper(findtxt.value, "decrypt");
}