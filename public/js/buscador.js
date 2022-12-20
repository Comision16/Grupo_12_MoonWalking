const $buscador = (element) => document.getElementById(element);

$buscador('form-buscador').addEventListener('submit', (e) => {
    e.preventDefault();


    const elements = e.target.elements;
    const contenido = $buscador('input-buscador');

    console.log(contenido);
    console.log(contenido.value.length);

    if(contenido.value.length > 0){
        e.target.submit();
    }
})

