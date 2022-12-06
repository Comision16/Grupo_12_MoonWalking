// const e = require("express");
console.log('pepe el grillo');
const $ = (element) => document.getElementById(element);

const exRegs = {
      exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,}

      const msgError = (element, msg, target) => {
        $(element).innerText =  msg; 

        };

const validField = (element, target) => {
              $(element).innerText = null;
              target.classList.remove("invalid");
            };
$('name').addEventListener('blur', function({target}) {
    switch (true) {
        case !this.value.trim():
            msgError('errorNombre', 'El nombre es obligatorio', target)
        break;
         case this.value.trim().length < 5 : 
         msgError('errorNombre', 'Debe contener al menos 5 caracteres', target)
         break;
         case !exRegs.exRegAlfa.test(this.value):
            msgError('errorNombre', 'El nombre debe tener solo letras', target)
            break;
        default:
            validField('errorNombre', target)
            break;
    } 
});
$('price').addEventListener('blur', function({target}) {
    switch (true) {
        case !this.value.trim():
            msgError('errorNumber', 'El precio es obligatorio', target)
        break;
         case this.value.trim().length  < 5 : 
         msgError('errorNumber', 'El precio no puede valer menos de $10.000', target)
         break;
        //  case !exRegs.exRegAlfa.test(this.value):
        //     msgError('errorNumber', 'El precio debe tener solo numeros', target)
        //     break;
        default:
            validField('errorNumber', target)
            break;
    } 
});



$('description').addEventListener('blur', function({target}) {
    switch (true) {
        case !this.value.trim():
            msgError('errorDescription', 'La descripción es obligatoria', target)
        break;
         case this.value.trim().length < 20 : 
         msgError('errorDescription', 'Debe contener al menos 20 caracteres', target)
         break;
         case !exRegs.exRegAlfa.test(this.value):
            msgError('errorDescription', 'El nombre debe tener solo letras', target)
            break;
        default:
            validField('errorDescription', target)
            break;
    } 
});

const imgExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const checkExtension = (filename) => 
{
  console.log(filename);
  for(let i=0; i<imgExtensions.length; i++)
  {
    if(filename.includes(imgExtensions[i]))
      return true;
  }

  return false;
}

$('image').addEventListener("blur", function ({ target }) {
    switch(true)
    {
      case !target.files[0]:
        msgError('errorImage', "La imagen de la zapatilla es obligatoria", target);
        break;
      case !checkExtension(target.files[0].name):
        msgError('errorImage', "Solamente se aceptan las siguientes extensiones: " + imgExtensions.join(', '), target);
        break;
      default:
        validField('errorImage', target);
        break;
    }
  });
