let areaEncriptar = document.getElementById("areaEncriptar");

const btnEncriptar = document.querySelector(".btn__encriptar");
const btnDesencriptar = document.querySelector(".btn__desencriptar");

const elements = document.querySelectorAll(".elements");

const btnCopiar = document.querySelector(".boton__aside");
const txtcopiado = document.querySelector(".txtcopiado");

let textEncriptado = document.querySelector(".tex_encriptado");

// ocultamos los elementos no deseados del aside
const ocultarElementos = () => {
  elements.forEach((elemento) => elemento.classList.add("ocultar"));
  btnCopiar.classList.remove("ocultar");
  textEncriptado.classList.remove("ocultar");
};

// código para encriptar
const encriptar = () => {
  let texto = areaEncriptar.value;
  texto = texto
    .replaceAll(/e/g, "enter")
    .replaceAll(/i/g, "imes")
    .replaceAll(/o/g, "ober")
    .replaceAll(/a/g, "ai")
    .replaceAll(/u/g, "ufat");
  textEncriptado.value = texto;
  areaEncriptar.value = "";
};

// código para desencriptar
const desenCriptar = () => {
  let texto = areaEncriptar.value;
  texto = texto
    .replaceAll(/enter/gi, "e")
    .replaceAll(/imes/gi, "i")
    .replaceAll(/ober/gi, "o")
    .replaceAll(/ai/gi, "a")
    .replaceAll(/ufat/gi, "u");
  textEncriptado.value = texto;
  areaEncriptar.value = "";
};

//INNECESARIO
//comprobamos los campos vacíos, de ser true recargamos la pagina automáticamente
const comprobarVacios = () => {
  if (areaEncriptar.value.trim() == "") {
    alert("ingresa una palabra");
    location.reload();
  }
};

//INNECESARIO
// detectamos si tiene activado el Bloq Mayus para las letras mayúsculas
areaEncriptar.addEventListener("keyup", (event) => {
  if (event.getModifierState("CapsLock")) {
    alert("Solo se puede escribir en minúscula");
    location.reload();
  }
});

//CREO QUE SE PUEDE JUNTAR TODO EN UNA SOLA FUNCION
// encriptamos el texto
btnEncriptar.addEventListener("click", () => {
  comprobarVacios();
  ocultarElementos();
  encriptar();
});

//CREO QUE SE PUEDE JUNTAR TODO EN UNA SOLA FUNCION
// desencriptamos el texto
btnDesencriptar.addEventListener("click", () => {
  comprobarVacios();
  ocultarElementos();
  desenCriptar();
});

// boton de copiar
btnCopiar.addEventListener("click", () => {
  // accedemos a los valores
  textEncriptado.select();
  textEncriptado.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(textEncriptado.value);

  //agregamos y quitamos el anuncio de copiado
  txtcopiado.classList.remove("ocultar");
  setTimeout(() => {
    txtcopiado.classList.add("ocultar");
  }, 1000);
});
