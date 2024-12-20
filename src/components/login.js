/** VALIDA SI YA HAY UNA SESIÓN ACTIVA ENVIARLO A LA VISTA DE EMPLEADOS **/
if(sessionStorage.getItem('session')){
	location.href = "empleados";
}
/*********************************************************************************/

/***** DECLARACIÓN DE FUNCIONALIDADES PARA EL CONSUMO DE LOS SERVICIOS USADOS *****/
import { getEmpleado } from '../api/login.api'
/*********************************************************************************/

/** CREACIÓN DE LA VISTA USADA PARA EL LOGIN **/
document.querySelector('#app').innerHTML = `
    <div class="mx-auto my-36 flex w-[350px] flex-col border-2 bg-white text-black shadow-xl">
        <div class="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
            <div class="h-7 w-3 bg-[#0DE6AC]"></div>
            <div class="w-3 text-center font-sans text-xl font-bold"><h1>Ingreso</h1></div>
        </div>
        <div class="flex flex-col items-center">
            <input id="correo" class="my-2 w-72 border p-2" type="email" placeholder="Correo" />
        </div>
        <div class="my-2 flex justify-center">
            <button id="btnLogin" class="w-72 border bg-[#0DE6AC] p-2 font-sans">Ingresar</button>
        </div>
    </div>
`
/*********************************************************************************/

/** LLAMADO DE FUNCIONES PARA EL CONSUMO DE LOS SERVICIOS CREADOS **/
async function getLoginEmpleado(correo){
    const resp = await getEmpleado(correo);
    return resp
}
/*********************************************************************************/

/** CREACIÓN DE LAS FUNCIONALIDADES DE LOS ELEMENTOS FIJOS EN LA VISTA **/
$("#btnLogin").on('click', function(){
    let vali = 1;
    if($("#correo").val() == ''){
        showAlerta("¡UN MOMENTO!", `Debe ingresar un correo para ingresar.`, "info", 0)
        vali = 0;
        return false;
    }

    if(validarCorreo($("#correo").val()) == null){
        showAlerta("¡UN MOMENTO!", `Debe registrar un correo valido.`, "info", 0)
        vali = 0;
        return false;
    }

    if(vali == 1){
        getLoginEmpleado($("#correo").val())
            .then((data) => {
                if(data.status == 200){
                    showAlerta("¡PERFECTO!", `Correo valido para ingresar.`, "success", 1)
                    sessionStorage.setItem('session', 1);
                }else if(data.status == 404){
                    showAlerta("¡UN MOMENTO!", `El correo ingresado no se encuentra registrado.`, "error", 0)
                }else{
                    showAlerta("¡UN MOMENTO!", `Ocurrió un problema con el ingreso.`, "error", 0)
                }
            })
            .catch((error) => {
                validarError(error)
            })
    }
})
/*********************************************************************************/

/** CREACIÓN DE LAS FUNCIONALIDADES QUE SE REALIZARAN EN EL LOGIN **/
/**
 * Funcionalidad para verificar que el correo electronico sea valido
 * @param {string} email Recibe por parametro el texto del correo que se va a ingresar
 * @returns Retorna el valor del correo si este es valido
 */
const validarCorreo = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

/**
 * Funcionalidad para mostrar una alerta de manera dinamica
 * @param {string} titulo Recibe por parametro el titulo que va en la alerta
 * @param {string} texto Recibe por parametro el texto de información que va en la alerta
 * @param {string} icono Recibe por parametro del icono que va en la alerta
 * @param {int} confirmacion Recibe por parametro si la alerta debe ejecutar alguna funcionalidad adicional
 */
const showAlerta = (titulo, texto, icono, confirmacion) => {
	Swal.fire({
		title: titulo,
		text: texto,
		icon: icono,
		allowOutsideClick: false,
		confirmButtonText: "OK",
	}).then((result) => {
		if(confirmacion == 1){
			if (result.isConfirmed) {
				location.href = 'empleados'
			}
		}
	});
}

/**
 * Funcionalidad para verificar el tipo de error que genera las peticiones realizadas
 * @param {JSON} error Recibe por parametro el objeto con el detalle del error que genero la petición
 */
const validarError = (error) => {
	if (error.response) {
        console.log(error)
        if(error.status == 404){
            showAlerta("¡ERROR!", `${error.mensaje}.`, "error", 0)    
        }else{
            showAlerta("¡ERROR!", `${error.mensaje}.`, "error", 0)
        }
	} else if (error.request) {
		showAlerta("¡ERROR!", `Error en la solicitud.`, "error", 0)
	} else {
		showAlerta("¡ERROR!", `Error desconocido.`, "error", 0)
	}
}
/*********************************************************************************/