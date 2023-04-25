const app = document.getElementById('app');
const txt = 'Se convertirán las todas mayúsculas a minúsculas y se eliminarán las tildes.';
const txt2 = 'se convertiran las todas mayusculas a minusculas y se eliminaran las tildes.';

let typewriter = new Typewriter(app, {
    loop: true,
    delay: 60,
});

typewriter.typeString(txt)
    .pauseFor(2000)
    .deleteAll()
    .typeString(txt2)
    .pauseFor(2000)
    .deleteAll()
    .start();