const span = document.getElementById('myspan');
const txt = 'Se convertirán las todas mayúsculas a minúsculas y se eliminarán las tildes.';
const txt2 = 'se convertiran las todas mayusculas a minusculas y se eliminaran las tildes.';

function typeWriter(str, i = 0)
{
    if(typeof str === 'string')
    {
        if(i < str.length)
        {
            span.innerHTML += str.charAt(i);
            i++;
            setTimeout(() => typeWriter(str, i), 60);
        }
        else
        {
            setTimeout(() => {
                span.innerHTML = '';
                typeWriter(str == txt ? txt2 : txt);
            }, 3000);
        }
    }
}

typeWriter(txt);