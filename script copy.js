const encriptar = document.getElementById("Encrypt_Bt"); //boton predeterminado
const txt_encriptar = document.getElementById("element1"); //textarea predeterminado
const tbody = document.getElementById("mytbody"); //fila de la tabla predeterminado
const pastebt = document.getElementById("Paste");

const dictionary = {
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "a" : "ai",
    "u" : "ufat"
}

encriptar.addEventListener("click", principal);   //evento

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
    
    // this.innerHTML = this.innerHTML === "-" ? "o" : "-";
    // this.innerHTML = this.innerHTML === "&#xf653;" ? "&#xe8f4;" : "&#xf653;";
    this.innerHTML = this.innerHTML === "Lock" ? "Visibility" : "Lock";
    findtxt.value = this.innerHTML === "Lock" ? MyChiper(findtxt.value) : MyChiper(findtxt.value, "decrypt");
}