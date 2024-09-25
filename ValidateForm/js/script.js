"use strict";
//Lista de eventos que se van a ejecutar al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nomApe').addEventListener('keyup', checkName);
    document.getElementById('anioNac').addEventListener('blur', checkYear);
    document.getElementById("usuario").addEventListener('keyup', checkUser);
    document.getElementById("contrasena").addEventListener('keyup', checkPassword);
    document.getElementById("RepContrasena").addEventListener('keyup', checkRepeatPassword);
    document.getElementById('resetear').addEventListener('click', buttonReset);
    document.getElementById('formulario').addEventListener('submit', logIn);
    document.getElementById('listar').addEventListener('click', buttonList);
    document.getElementById('limpiar').addEventListener('click', emptyLocalStorage);
    document.getElementById('crear').addEventListener('click', createObject);
});

//Función para comprobar que el usuario introduce un nombre que empieze con mayúscula y tenga entre 3 y 10 caracteres, mediante una expresión regular.
const checkName = () => {
    //Se almacena en una variable el elemento seleccionado.
    let inputName = document.getElementById('nomApe');
    let inputError = document.getElementById('errnombre');
    let expressionName = /^[A-ZÑ][a-zñ]{3,10}$/; //Ejemplo: Ricardo

    //Se comrpueba si el valor de dicho elemento está vacío o no.
    if (inputName.value.trim() != '') {
        //Se comprueba si la expresión regular se cumple o no, y dependiendo de ello pondrá un mensaje de error o de validez.
        if (expressionName.test(inputName.value.trim())) {
            inputName.style.border = 'solid green 3px';
            inputError.style.color = 'green';
            inputError.innerText = 'Valid Name';
        } else {
            inputName.style.border = 'solid red 3px';
            inputError.style.color = 'red';
            inputError.innerText = 'Invalid Name';
        }
    } else {
        inputName.style.border = '';
        inputError.style.color = '';
        inputError.innerText = '';
    }
};

//Función para validar el año de nacimiento, que sea un número y que sea entre 1957 y 2006.
const checkYear = () => {
    let inputYear = document.getElementById('anioNac');
    let inputErrorYear = document.getElementById('erranionac');

    if (inputYear.value.trim() != '') {
        if (!isNaN(inputYear.value) && inputYear.value <= 2006 && inputYear.value >= 1957) {
            inputYear.style.border = 'solid green 3px';
            inputErrorYear.style.color = 'green';
            inputErrorYear.innerText = 'Valid Year';
        } else {
            inputYear.style.border = 'solid red 3px';
            inputErrorYear.style.color = 'red';
            inputErrorYear.innerText = 'Invalid Year, enter a number between 1957 and 2006.';
        }
    } else {
        inputYear.style.border = '';
        inputErrorYear.style.color = '';
        inputErrorYear.innerText = '';
    }
};

//Función para comprobar que el nombre de usuario se introduce correctamente, mediante una expresión regular.
const checkUser = () => {
    //Se almacena en una variable el elemento seleccionado.
    let inputUser = document.getElementById("usuario");
    let inputErrorUser = document.getElementById('errusuario');
    let expressionUser = /^@[A-ZÑ][a-zñ]{2,10}/; //Ejemplo: @User-034

    if (inputUser.value.trim() != '') {
        //Se comprueba si la expresión regular se cumple.
        if (expressionUser.test(inputUser.value.trim())) {
            inputUser.style.border = 'solid green 3px';
            inputErrorUser.style.color = 'green';
            inputErrorUser.innerText = 'Valid User';
        } else {
            inputUser.style.border = 'solid red 3px';
            inputErrorUser.style.color = 'red';
            inputErrorUser.innerText = 'Invalid User';
        }

        inputUser.addEventListener('blur',fill);
    } else {
        inputUser.style.border = '';
        inputErrorUser.style.color = '';
        inputErrorUser.innerText = '';
    }
};

//Función para comprobar que el usuario introduce una contraseña válida.
const checkPassword = () => {
    let inputPass = document.getElementById('contrasena');
    let inputErrorPass = document.getElementById('errcontrasena');
    let expressionPass = /^[A-ZÑa-zñ0-9]{5,10}/; //Puede tener cualquier letra o número, y tiene que tener entre 5 y 10 caracteres.

    if (inputPass.value.trim() != '') {
        //Se comprueba si la expresión regular se cumple.
        if (expressionPass.test(inputPass.value.trim())) {
            inputPass.style.border = 'solid green 3px';
            inputErrorPass.style.color = 'green';
            inputErrorPass.innerText = 'Secure Password';
        } else {
            inputPass.style.border = 'solid red 3px';
            inputErrorPass.style.color = 'red';
            inputErrorPass.innerText = 'Invalid Password';
        }
        //Aquí llamo a la función que comprueba el input donde se repite la contraseña, para que se actualize si la casilla de la contraseña se modifica.
        checkRepeatPassword();
    } else {
        inputPass.style.border = '';
        inputErrorPass.color = '';
        inputErrorPass.innerText = '';
    }
};

//Esta función comprueba que el valor del elemento donde se repite la contraseña sea igual al valor del elemento donde se ha escrito la contraseña.
const checkRepeatPassword = () => {
    let inputPass = document.getElementById('contrasena');
    let inputRepeatPass = document.getElementById('RepContrasena');
    let inputErrorRepeatPass = document.getElementById('errRepContrasena');

    if (inputRepeatPass.value.trim() != '') {
        //Si ambos valores son iguales lo pondrá en verde, sino en rojo, ya que no coincide.
        if (inputRepeatPass.value.trim() === inputPass.value.trim()) {
            inputRepeatPass.style.border = 'solid green 3px';
            inputErrorRepeatPass.style.color = 'green';
            inputErrorRepeatPass.innerText = "Password matches";
        } else {
            inputRepeatPass.style.border = 'solid red 3px';
            inputErrorRepeatPass.style.color = 'red';
            inputErrorRepeatPass.innerText = "Password doesn't match";
        }
    } else {
        inputRepeatPass.style.border = '';
        inputErrorRepeatPass.style.color = '';
        inputErrorRepeatPass.innerText = "";
    }

};

//Función para resetear el formulario y que se quede en blanco. Se ejecutará al presionar el botón 'Resetear'.
//Además también se borra la consola.
const buttonReset = () => {

    for (const element of document.getElementsByTagName('input')) {
        element.style = '';
        element.value = '';
    }

    for (const error of document.getElementsByTagName('span')) {
        error.innerText = '';
        error.style = '';
    }
    console.clear();
};

//Esta función envia el formulario una vez se hayan comprobado que todos los campos son correctos.
//Dicha función se ejecuta al presionar el botón 'Ingresar'.
const logIn = (e) => {
    e.preventDefault();
    let name = document.getElementById('nomApe');
    let year = document.getElementById('anioNac');
    let user = document.getElementById("usuario");
    let pass = document.getElementById('contrasena');
    let repeatPass = document.getElementById('RepContrasena');
    let expressionName = /^[A-ZÑ][a-zñ]{3,10}$/;
    let expressionUser = /^@[A-ZÑ][a-zñ]{2,10}/;
    let expressionPass = /^[A-ZÑa-zñ0-9]{5,10}/;

    if (expressionName.test(name.value.trim()) && !isNaN(year.value) && year.value <= 2006 && year.value >= 1957 && expressionUser.test(user.value.trim()) && expressionPass.test(pass.value.trim()) && pass.value.trim() === repeatPass.value.trim()) {

        //Una vez se valida que todos los datos son correctos, se comprueba si se ha marcado la casilla de 'recordar contraseña', 
        //para guardar algunos datos en el LocalStorage, que es una cookie.
        if (document.getElementById('check').checked) {
            localStorage.setItem(document.getElementById('usuario').value, document.getElementById('contrasena').value);
            localStorage.setItem(document.getElementById('usuario').value + 'N', document.getElementById('nomApe').value);
            localStorage.setItem(document.getElementById('usuario').value + 'Y', document.getElementById('anioNac').value);
        }
        alert('Formulario enviado');
        buttonReset();
    } else {
        alert('No se ha podido enviar el formulario, introduce los datos correctamente.');
    }
};

//Función para listar en la consola los objetos creados y almacenados en el localStorage, que se ejecuta al presionar el botón 'Listar'.
const buttonList = () => {

    if (localStorage.length != 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let ls = localStorage.getItem(localStorage.key(i));
            console.log('Guardado: ' + ls);
        }
    } else {
        console.log('No hay nada guardado');
    }
};

//Esta función sirve para rellenar el nombre, el año de nacimiento y la contraseña una vez se haya puesto el nombre de usuario correspondiente, con el que se le haya dado a recordar contraseña.
const fill = () => {
    if (localStorage.getItem(document.getElementById('usuario').value) != undefined && localStorage.getItem(document.getElementById('usuario').value + 'N') != undefined && localStorage.getItem(document.getElementById('usuario').value + 'Y') != undefined) {
        document.getElementById('contrasena').value = localStorage.getItem(document.getElementById('usuario').value);
        document.getElementById('nomApe').value = localStorage.getItem(document.getElementById('usuario').value + 'N');
        document.getElementById('anioNac').value = localStorage.getItem(document.getElementById('usuario').value + 'Y');
    };
}

//Esta función borra el contenido almacenado en la cookie.
const emptyLocalStorage = () => {
    localStorage.clear();
    console.log('LocalStorage borrado');
}

//Esta función crea un objeto con todos los datos recogidos del formulario, pero antes se comprobará que todos los datos son correctos. Esta se ejecutará 
//al presionar el botón 'Crear'.
const createObject = () => {
    let name = document.getElementById('nomApe');
    let year = document.getElementById('anioNac');
    let user = document.getElementById("usuario");
    let pass = document.getElementById('contrasena');
    let repeatPass = document.getElementById('RepContrasena');
    let expressionName = /^[A-ZÑ][a-zñ]{3,10}$/;
    let expressionUser = /^@[A-ZÑ][a-zñ]{2,10}/;
    let expressionPass = /^[A-ZÑa-zñ0-9]{5,10}/;

    //Si todos los datos son correctos, se creará el objeto, el cual se introducirá en una cookie.
    if (expressionName.test(name.value.trim()) && !isNaN(year.value) && year.value <= 2006 && year.value >= 1957 && expressionUser.test(user.value.trim()) && expressionPass.test(pass.value.trim()) && pass.value.trim() === repeatPass.value.trim()) {
        let object = {
            name: name.value,
            year: year.value,
            user: user.value,
            pass: pass.value
        };
        object = JSON.stringify(object);
        localStorage.setItem('Persona' + localStorage.length + 1, object);
        alert('Objeto creado correctamente.');
        buttonReset();
    } else {
        alert('Antes de crear un objeto debes introducir todos los datos correctamente.');
    }
};