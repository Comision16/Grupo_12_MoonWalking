console.log('Brishito Pasión');
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

const msgError = (element, msg, target) => {
  $(element).innerText = msg;
  $(element).classList.add("invalid");
};

const validField = (element, target) => {
  $(element).innerText = null;
  $(element).classList.add("invalid");
};

let validPass = (element, exReg, value) => {
  if (!exReg.test(value)) {
      $(element).classList.add("invalid");
      $(element).classList.remove("valid");
  } else {
      $(element).classList.add("valid");
      $(element).classList.remove("invalid");
  }
};


const verifyEmail = async (email) => {
  try {
    let response = await fetch("/api/users/verify-email", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await response.json();

    return result.verified;
  } catch (error) {
    console.error;
  }
};

$("formLogin").addEventListener("submit", function (e) {
  console.log([e])
    e.preventDefault();
    let error = false;

    const elements = this.elements;
    for (let i = 0; i < elements.length - 2; i++) {
        
        if(!elements[i].value.trim() || elements[i].classList.contains('invalid')){
          elements[i].classList.add('invalid'); 
           error = true;
        }
    }

  !error && this.submit()
  })

$("emailLogin").addEventListener("blur", async function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorEmail", "Ingrese un email", target);
        break;
      case !exRegs.exRegEmail.test(this.value):
        msgError("errorEmail", "El email es inválido", target);
        break;
      case await !verifyEmail(this.value):
        msgError("errorEmail", "El email no está registrado", target);
        break;
      default:
        validField("errorEmail", target);
        break;
    }
  });
  
  $("passwordLogin").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorPassword", "La contraseña es obligatoria", target);
        break;
      default:
        validField("errorPassword", target);
        break;
    }
  });
  