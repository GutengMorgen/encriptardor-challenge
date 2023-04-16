const encriptar = document.getElementById("encriptar"); //boton predeterminado
const txt_encriptar = document.getElementById("txt_encriptar"); //textarea predeterminado
const tbody = document.getElementById("mytbody"); //fila de la tabla predeterminado
const cleanbt = document.getElementById("clean all");
const pastebt = document.getElementById("Paste");

const dictionary = {
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "a" : "ai",
    "u" : "ufat"
}

encriptar.addEventListener("click", principal);   //evento

cleanbt.addEventListener("click", () => {
    while (tbody.rows.length > 0) {
        tbody.deleteRow(0);
    }
});

pastebt.addEventListener("click", () => {
    navigator.clipboard.readText().then(pasteText => {txt_encriptar.value = pasteText; });
});

function principal()
{
    newRow();
    const firstRow = tbody.rows[0];
    const txt = firstRow.cells[0].querySelector("textarea");

    txt.value = MyChiper(txt_encriptar.value);
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
    copyBt.addEventListener("click", forCopy);

    const hidden = document.createElement("button");
    hidden.setAttribute("class", "hiddenBt");
    hidden.innerHTML = "-";
    hidden.addEventListener("click", SwitchMode)

    row.cells[0].appendChild(textarea);
    row.cells[1].appendChild(copyBt);
    row.cells[2].appendChild(hidden);
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
    
    this.innerHTML = this.innerHTML === "-" ? "o" : "-";
    findtxt.value = this.innerHTML === "-" ? MyChiper(findtxt.value) : MyChiper(findtxt.value, "decrypt");
}