console.log("prueba");
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
  exRegMin: /.{6,}/,
  exRegMax: /.{8}/,
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

    console.log(result);

    return result.verified;
  } catch (error) {
    console.error;
  }
};

$("form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Usuario creado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  }) .then((result) => {
    if (result.isConfirmed) {
      this.submit();
    }
  }); // agregar swal.fire

$("#firstName").addEventListener("blur", function ({ target }) {});

$("#lastName").addEventListener("blur", function ({ target }) {});

$("#email").addEventListener("blur", function ({ target }) {});

$("#password").addEventListener("blur", function ({ target }) {});

$("#imageAvatar").addEventListener("blur", function ({ target }) {});
