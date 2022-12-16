console.log("Holis");
const $ = (element) => document.querySelector(element);
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
  $(element).style.color = 'red';
};

const validField = (element, target) => {
  $(element).innerText = null;
  $(element).style.color = 'red';
};

const validPass = (element, exReg, value) => {
  if (!exReg.test(value)) {
    $(element).style.color = 'red';
  } else {
    $(element).style.color = 'green';
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

/*     console.log(result); */

    return result.verified;
  } catch (error) {
    console.error;
  }
};

$("#form_register")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let error = false;

    const elements = this.elements;
    for (let i = 0; i < elements.length - 2; i++) {
        
        if(!elements[i].value.trim() || elements[i].classList.contains('is-invalid')){
            elements[i].classList.add('is-invalid'); 
           $('#msgErrors').style.display = 'block';
           error = true;
        }
    }

  !error && this.submit()
  })

$("#firstName").addEventListener("blur", function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("#errorFirstName", "El nombre es obligatorio", target);
      break;
    case this.value.trim().length < 2:
      msgError(
        "#errorFirstName",
        "El nombre tiene que tener dos caracteres mínimo",
        target
      );
      break;
    case !exRegs.exRegAlfa.test(this.value):
      msgError("#errorFirstName", "El nombre debe tener solo letras", target);
      break;
    default:
      validField("#errorFirstName", target);
      break;
  }
});

$("#lastName").addEventListener("blur", function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("#errorLastName", "El apellido es obligatorio", target);
      break;
    case this.value.trim().length < 2:
      msgError(
        "#errorLastName",
        "El apellido debe tener 2 caracteres como mínimo",
        target
      );
      break;
    case !exRegs.exRegAlfa.test(this.value):
      msgError("#errorLastName", "El apellido debe tener solo letras", target);
      break;
    default:
      validField("#errorLastName", target);
      break;
  }
});

$("#dni").addEventListener("blur", function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("#errorDNI", "El DNI es obligatorio", target);
      break;
    case this.value.trim().length != 8:
      msgError(
        "#errorDNI",
        "El DNI debe tener 8 caracteres",
        target
      );
      break;
    case !exRegs.exRegNum.test(this.value):
      msgError("#errorDNI", "El apellido debe tener solo numeros", target);
      break;
    default:
      validField("#errorDNI", target);
      break;
  }
});



$("#email").addEventListener("blur", async function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("#errorEmail", "El email es obligatorio", target);
      break;
    case !exRegs.exRegEmail.test(this.value):
      msgError("#errorEmail", "El email es inválido", target);
      break;
    case await verifyEmail(this.value):
      msgError("#errorEmail", "El email ya está registrado", target);
      break;
    default:
      validField("#errorEmail", target);
      break;
  }
});

$("#password").addEventListener("focus", () => {
  $("#msgPass").hidden = false;
});

$("#password").addEventListener("blur", function ({ target }) {
  $("#msgPass").hidden = true;
  switch (true) {
    case !this.value.trim():
      msgError("#errorPassword", "La contraseña es obligatoria", target);
      break;
    case !exRegs.exRegPass.test(this.value):
      msgError(
        "#errorPassword",
        "La contraseña debe tener un símbolo, una número, una mayúscula, una minúscula y entre 5 y 10 caracteres",
        target
      );
      break;
    default:
      validField("#errorPassword", target);
      break;
  }
});

$("#password").addEventListener("keyup", function ({ target }) {
  validPass("#mayu", exRegs.exRegMayu, target.value);
  validPass("#minu", exRegs.exRegMinu, target.value);
  validPass("#num", exRegs.exRegNum, target.value);
  validPass("#esp", exRegs.exRegEsp, target.value);
  validPass("#min", exRegs.exRegMin, target.value);
  validPass("#max", exRegs.exRegMax, target.value);
});

$("#password2").addEventListener("blur", function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("#errorPassword2", "Debes verificar la contraseña", target);
      break;
    case this.value.trim() !== $('#password').value.trim():
      msgError(
        "#errorPassword2",
        "Las contraseñas no coinciden",
        target
      );
      break;
    default:
      validField("#errorPassword2", target);
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
$("#imageAvatar").addEventListener("blur", function ({ target }) {
  switch(true)
  {
    case !target.files[0]:
      msgError("#errorAvatar", "Debes enviar un avatar para tu perfil.", target);
      break;
    case !checkExtension(target.files[0].name):
      msgError("#errorAvatar", "Solamente se aceptan las siguientes extensiones: " + imgExtensions.join(', '), target);
      break;
    default:
      validField("#errorAvatar", target);
      break;
  }
});

$("#btn-show-pass").addEventListener("click", ({ target }) => {
  if (target.localName === "i") {
    target.classList.toggle("fa-eye");
    $("#password").type = $("#password").type === "text" ? "password" : "text";
  } else {
    target.childNodes[0].classList.toggle("fa-eye");
    $("#password").type = $("#password").type === "text" ? "password" : "text";
  }
});
