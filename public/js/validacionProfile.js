console.log("Se fuerte");

const inputVal = document.querySelectorAll('.validateInput');
const $ = (element) => document.getElementById(element);

const exRegs = {
  exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
  exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
  exRegPass:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
  exRegMayu: /[A-Z]/,
  exRegMinu: /[a-z]/,
  exRegNum: /[0-9]/,
  exRegEsp: /[$@$!%*?&]/,
  exRegMin: /.{5,}/,
  exRegMax: /^.{5,10}$/,
};

let userEmail

const msgError = (element, msg, target) => {
  $(element).innerText = msg;
  $(element).classList.add("invalid")
  target.classList.add("invalid");
};

const validField = (element, target) => {
  $(element).classList.remove("invalid");
  $(element).classList.add("valid");
  target.classList.remove("invalid");
  target.classList.add("valid");

};
/* nombre apellido email */

$("profileNombre").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorprofileNombre", "El nombre es obligatorio", target);
        break;
        case this.value.trim().length < 2:
      msgError(
        "#errorFirstName",
        "El nombre tiene que tener dos caracteres mínimo",
        target
      );
      case !exRegs.exRegAlfa.test(this.value):
        msgError("errorprofileNombre", "El nombre debe tener solo letras", target);
        break;
      default:
        validField("errorprofileNombre", target);
        break;
    }
  });
  
$("profileApellido").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorprofileApellido", "El apellido es obligatorio", target);
        break;
      case this.value.trim().length < 2:
        msgError(
          "errorprofileApellido",
          "El apellido debe tener 2 caracteres como mínimo",
          target
        );
        break;
      case !exRegs.exRegAlfa.test(this.value):
        msgError("errorprofileApellido", "El apellido debe tener solo letras", target);
        break;
      default:
        validField("errorprofileApellido", target);
        break;
    }
  });