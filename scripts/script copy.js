const h1 = document.getElementById("myH1");
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

//envento para encriptar el texto
encriptar.addEventListener("click", testing);

//evento para el boton de copiar texto
copybt.addEventListener("click", () => {
    navigator.clipboard.writeText(txt_output.value).then(() => {});
    changeIcon(copybt, "Content_Copy");
});

//evento para el boton de pegar texto
pastebt.addEventListener("click", () => {
    navigator.clipboard.readText().then(pasteText => {txt_input.value = pasteText; });
    changeIcon(pastebt, "Content_Paste");
});

mySelect.onchange = function()
{
    if (mySelect.value == "encrypt")
    {
        forTable();
        txt_output.value = "";
        h1.innerHTML = "ENCRIPTADOR";
        txt_input.setAttribute("placeholder", "challenge one");
        txt_output.setAttribute("placeholder", "chaillenterngenter obernenter");
        encriptar.innerHTML = "Encriptar";
    }
    else if (mySelect.value == "decrypt")
    {
        forTable();
        txt_output.value = "";
        h1.innerHTML = "DESENCRIPTADOR";
        txt_input.setAttribute("placeholder", "chaillenterngenter obernenter");
        txt_output.setAttribute("placeholder", "challenge one");
        encriptar.innerHTML = "Desencriptar";
    }
}

function testing()
{
    //para comprobar si el valor del txt_input esta vacio o nuloS
    if (txt_input.value.trim() === "" || txt_input.value === null)
        return alert("The text input is empty!");
    
    forTable();

    //agrega y elimina una clase css que modifica el box-shaSdow del txt_output
    txt_output.classList.add("highlight");
    setTimeout(() => txt_output.classList.remove("highlight"), 1000);

    //convierte el texto del txt_input a minusculas y quita los acentos
    let newtext = txt_input.value.toLowerCase();
    newtext = newtext.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    //comprueba que texto tiene el boton para encriptar o desencriptar
    if (encriptar.innerHTML == "Encriptar")
        txt_output.value = MyChiper(newtext);
    else
        txt_output.value = MyChiper(newtext, "decrypt");
}

function forTable()
{
    //comprueba si el valor del txt_output no esta vacio, de ser asi agrega un row a la tabla con ese valor
    if (txt_output.value !== "")
    {
        newRow();
        const txt = tbody.rows[0].cells[0].querySelector("textarea");
        txt.value = txt_output.value;
    }

    //para eliminar el row predeterminado de la tabla
    if (tbody.rows.length > 1 && document.getElementById("message") !== null)
        document.getElementById("message").remove();
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
    hidden.addEventListener("click", SwitchMode);
    if (encriptar.innerHTML == "Encriptar")
        hidden.innerHTML = "Lock";
    else
        hidden.innerHTML = "Visibility";

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
    changeIcon(this, "Content_Copy");
}

function changeIcon(bt, icon)
{
    bt.innerHTML = '';
    bt.classList.add("done");
    
    setTimeout(() => {
        bt.classList.remove("done");
        bt.innerHTML = icon;
    }, 2000);
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