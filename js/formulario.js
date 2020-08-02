const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,12}$/, // 6 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
	apellido: false,
	nombre: false,
	password: false,
	correo: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.nombre, e.target, 'apellido');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`div_${campo}`).classList.remove('validacion_incorrecto');
		document.getElementById(`div_${campo}`).classList.add('validacion_correcto');
		document.querySelector(`#div_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#div_${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#div_${campo} .txt_error`).classList.remove('txt_error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`div_${campo}`).classList.add('validacion_incorrecto');
		document.getElementById(`div_${campo}`).classList.remove('validacion_correcto');
		document.querySelector(`#div_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#div_${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#div_${campo} .txt_error`).classList.add('txt_error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`div_password2`).classList.add('validacion_incorrecto');
		document.getElementById(`div_password2`).classList.remove('validacion_correcto');
		document.querySelector(`#div_password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#div_password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#div_password2 .txt_error`).classList.add('txt_error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`div_password2`).classList.remove('validacion_incorrecto');
		document.getElementById(`div_password2`).classList.add('validacion_correcto');
		document.querySelector(`#div_password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#div_password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#div_password2 .txt_error`).classList.remove('txt_error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.apellido && campos.nombre && campos.password && campos.correo  && terminos.checked ){
		/***** Reemplazar por codigo Validacion Front End****/ 
		Swal.fire({
			title:"Exito:",
			text:"El formulario se valido correctamente.",
			icon:"success",
			timer:5000,
			confirmButtonText:"cerrar",
			timerProgressBar:"yes",
			showCloseButton:"true"
		});
		form.reset();
		document.querySelectorAll('.validacion_correcto').forEach((icono) => {
			icono.classList.remove('validacion_correcto');
		});
       /*****Reemplazar por codigo Validacion Front End ****/ 
	} else {
		Swal.fire({
			title:"Error:",
			text:"Por favor rellena el formulario correctamente.",
			icon:"error",
			timer:5000,
			confirmButtonText:"cerrar",
			timerProgressBar:"yes",
			showCloseButton:"true"
		});
	}
});