console.log('Brishito Pasión');
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

    if (!result.verified) userEmail = email
    return !result.verified;
  } catch (error) {
    console.error;
  }
};

$('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  let error = false;

  inputVal.forEach(field => {
    if (!field.value.trim() || field.classList.contains('invalid')) {
      field.classList.add('invalid')
      error = true
      document.getElementById('error').innerText = 'Complete los campos correctamente'
    }
    console.log(inputVal, error);
    !error && $('formLogin').submit()
  });

})

$("emailLogin").addEventListener("blur", async function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("errorEmail", "Ingrese un email", target);
      break;
    default:
      validField("errorEmail", target);
      break;
  }
});

$("passwordLogin").addEventListener("blur", async function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("errorPassword", "La contraseña es obligatoria", target);
      break;
    default:
      validField("errorPassword", target);
      break;
  }
});
