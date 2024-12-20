/** VALIDA SI NO HAY UNA SESIÓN ACTIVA ENVIARLO AL LOGIN **/
if(!sessionStorage.getItem('session')){
	location.href = "/";
}
/*********************************************************************************/

/***** DECLARACIÓN DE FUNCIONALIDADES PARA EL CONSUMO DE LOS SERVICIOS USADOS *****/
import {
	getEmpleados,
	setEmpleados,
	getEmpleadosID,
	updateEmpleado,
	deleteEmpleado,
	deleteMultiEmpleados
} from '../api/empleados.api'
/*********************************************************************************/

/** CREACIÓN DE LA VISTA USADA PARA LOS EMPLEADOS **/
document.querySelector('#empleados').innerHTML = `
	<div class="col-span-12">
		<div class="grid place-items-center col-span-12">
			<div class="col-end-10 mt-5">
				<button title="Salir" id="btnSalir" type="button" class="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">
					<span class="inline-flex items-center justify-center w-6 h-6 text-xs">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
						</svg>
					</span>
				</button>
			</div>
			<div class="p-4 col-span-12">
				<h1 class="text-3xl text-wrap hover:text-balance text-white">
					Empleados
				</h1>
			</div>
			<div class="md:col-span-2 md:col-end-10 col-span-12">
				<button id="btnCreaModal" type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
					Crear empleados
					<span class="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
					</span>
				</button>
				<button id="btnElimEmple" style="display: none;" type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
					Eliminar empleados
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
					</svg>
				</button>
			</div>
			<div class="px-3 m-5 md:m-0 py-4 w-11/12 md:w-1/2 justify-center col-span-12 overflow-auto text-white">
				<table class="w-full text-md bg-white rounded mb-4 text-black" id="tblUsuarios">
					<thead>
						<tr class="border-b">
							<th class="text-left p-3 px-5 text-center">ID</th>
							<th class="text-left p-3 px-5 text-center">Nombre</th>
							<th class="text-left p-3 px-5 text-center">Apellido</th>
							<th class="text-left p-3 px-5 text-center">Año de nacimiento</th>
							<th class="text-left p-3 px-5 text-center">Correo</th>
							<th class="text-left p-3 px-5 text-center">Rol</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody id="dataUsuarios">
						
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
		<div class="relative p-4 w-full max-w-2xl max-h-full">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white" id="contTituloModal">
						
					</h3>
					<button type="button" class="btnCerrarModal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
						<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
						</svg>
						<span class="sr-only">Cerrar modal</span>
					</button>
				</div>
				<div class="grid gap-4 mb-4 grid-cols-12">
					<div class="col-span-12 md:col-span-6 pl-5 pr-5 py-1">
						<label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
						<input type="text" name="nombre" id="nombre" data-vali="el nombre"  class="formVali bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese su nombre" required="" maxlength="100">
					</div>
					<div class="col-span-12 md:col-span-6 pr-5 pl-5 md:pl-0 py-1">
						<label for="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
						<input type="text" name="apellido" id="apellido" data-apellido="1" data-vali="el apellido" class="formVali bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese su apellido" maxlength="100">
					</div>
					<div class="col-span-12 md:col-span-6 pl-5 pr-5 py-1">
						<label for="fecha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
						<input id="default-datepicker" name="fecha" id="fecha" data-vali="la fecha de nacimiento" type="text" class="formVali bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Seleccione su fecha de nacimiento">
					</div>
					<div class="col-span-12 md:col-span-6 pr-5 pl-5 md:pl-0 py-1">
						<label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
						<input type="text" name="correo" id="correo" data-vali="el correo" data-mail="1" class="formVali bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese su correo" required="" maxlength="100">
					</div>
					<div class="col-span-12 px-5 py-1">
						<label for="rol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
						<select id="rol" name="rol" data-vali="el rol" class="formVali bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
							<option selected value="">Seleccione una opción</option>
							<option value="1">Desarrollador</option>
							<option value="2">Team Leader</option>
							<option value="3">CTO</option>
						</select>
					</div>
				</div>
				<div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600" id="contBtnModal">
					
				</div>
			</div>
		</div>
	</div>
`
/*********************************************************************************/

/** LLAMADO DE FUNCIONES PARA EL CONSUMO DE LOS SERVICIOS CREADOS **/

/**
 * Función para realizar el llamado al consumo del servicio que obtiene los empleados existentes
 * @returns retorna el objeto de respuesta del consumo
 */
async function getDataEmple(){
	const resp = await getEmpleados();
    return resp
}

/**
 * Función para realizar el llamado al consumo que crea los empleados
 * @param {JSON} arrEmple Recibe por parametro el array de datos para la creación de los empleados
 * @returns retorna el objeto de respuesta del consumo
 */
async function setNuevoEmple(arrEmple){
	const resp = await setEmpleados(arrEmple);
    return resp
}

/**
 * Función para realizar el llamado al consumo que consulta la información de un empleado especifico mediante su ID
 * @param {int} id Recibe por parametro el ID del empleado a consultar
 * @returns retorna el objeto de respuesta del consumo
 */
async function getDataEmpleados(id){
	const resp = await getEmpleadosID(id);
    return resp
}

/**
 * Función para realizar el llamado al consumo que actualiza la información del empleado mediante su ID
 * @param {JSON} arrEmple Recibe por parametro el array de datos para actualizar el empleado
 * @param {int} id Recibe por parametro el ID del empleado que se va a actualizar
 * @returns retorna el objeto de respuesta del consumo
 */
async function updateEmpleTabla(arrEmple, id){
	const resp = await updateEmpleado(arrEmple, id);
    return resp
}

/**
 * Función para realizar el llamado al consumo que elimina un empleado mediante su ID
 * @param {int} id Recibe por parametro el id del empleado que se va a eliminar
 * @returns retorna el objeto de respuesta del consumo
 */
async function deleteInfoEmpleado(id){
	const resp = await deleteEmpleado(id);
    return resp
}

/**
 * Función para realizar el llamado al consumo que elimina un grupo de empleados mediante sus ID's
 * @param {JSON} arrEmpleID Recibe por parametro el array de ID's de los empleados a eliminar
 * @returns retorna el objeto de respuesta del consumo
 */
async function deleteEmpleados(arrEmpleID) {
	const resp = await deleteMultiEmpleados(arrEmpleID);
    return resp
}
/*********************************************************************************/

/** CREACIÓN DE LAS FUNCIONALIDADES QUE SE REALIZARAN EN LA VISTA DE EMPLEADOS **/

/**
 * Funcionalidad para mostrar la tabla de los empleados y definir las interacciones que existiran dentro de las tablas
 */
const showTablaEmpleados = () => {
	/**
	 * Función que realiza la visualización de los usuarios y determinar sus funcionalidades
	 */
	getDataEmple()
		.then((data) => {
			if(data.status == 200){
				$("#tblUsuarios").DataTable().destroy();
    			$('#dataUsuarios').empty()

				let usua = '';
				$.each(data.data, function(key, value){
					let rol = '';

					switch (value.roleID) {
						case 1:
							rol = 'Desarrollador';
							break;

						case 2:
							rol = 'Team Leader';
							break;

						case 3:
							rol = 'CTO';
							break;
					
						default:
							rol = 'No definido';
							break;
					}

					usua += `
						<tr class="border-b hover:bg-orange-100">
							<td class="p-3 px-5 text-center grid place-items-center grid-cols-12">
								<div class="col-span-6">
									${++key}
								</div>
								<div class="col-span-6 pb-1">
									<div class="text-center">
										<input type="checkbox" value="" data-id="${value.id}" class="chkDeleEmple w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									</div>
								</div>
							</td>
							<td class="p-3 px-5 text-center">${value.name}</td>
							<td class="p-3 px-5 text-center">${(value.surname != null && value.surname != '') ? value.surname : 'No definido'}</td>
							<td class="p-3 px-5 text-center">${value.dateOfBird}</td>
							<td class="p-3 px-5 text-center">${value.email}</td>
							<td class="p-3 px-5 text-center">${rol}</td>
							<td class="p-3 px-5 text-center grid place-items-center grid-cols-12">
								<div class="col-span-6">
									<button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button" data-id="${value.id}" class="btnEdit mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" title="Editar">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
										<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
										</svg>
									</button>
								</div>
								<div class="col-span-6">
									<button type="button" data-id="${value.id}" class="btnDelete col-span-6 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" title="Borrar">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
											<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
										</svg>
									</button>
								</div>
							</td>
						</tr>
					`;
				})

				$("#dataUsuarios").html(usua).after(function(){

					$(".btnEdit").on('click', function(){
						setInfoEmpleado(parseInt($(this).data('id')));
					})

					$(".btnDelete").on('click', function(){
							Swal.fire({
								title: "¡UN MOMENTO!",
								text: `¿Está seguro de eliminar el usuario?.`,
								icon: "info",
								allowOutsideClick: false,
								confirmButtonText: "SI",
								confirmButtonColor: "#24c363",
								showCancelButton: true,
								cancelButtonText: "NO",
								cancelButtonColor: "#ca2627",
							}).then((result) => {
								if (result.isConfirmed) {
									deleteInfoEmpleado(parseInt($(this).data('id')))
										.then((data) => {
											if(data.status == 200){
												showAlerta("¡PERFECTO!", `Se borro el empleado con éxito.`, "success", 1)
											}else{
												showAlerta("¡UN MOMENTO!", `Ocurrió un problema al eliminar el empleado.`, "error", 0)
											}
										})
										.catch((error) => {
											validarError(error)
										})
										
								}
							});
					})

					$(".chkDeleEmple").on('change', function(){
						let countID = 0
						$(".chkDeleEmple").each(function(key, value){
							if($(this).is(':checked')){
								countID++;
							}
						})

						if(countID == 0){
							$("#btnElimEmple").hide();
						}else{
							$("#btnElimEmple").show();
						}
					});

					$("#tblUsuarios").DataTable({
						language: lengTable,
						responsive: true,
					})
				})
			}
		}).catch((error) => {
			validarError(error)
		});
}

/**
 * Funcionalidad para dar formato a los datos del formulario para registrar o actualizar el empleado
 * @returns Retorna el objeto del empleado para registrar o actualizar
 */
const formatObjectEmple = () => {
	const form = {
		"name": $("#nombre").val(),
		"surname": ($("#apellido").val() == '' ? '' : $("#apellido").val()),
		"dateOfBird": datepicker.getDate().toISOString().split('T')[0],
		"email": $("#correo").val(),
		"roleID": parseInt($("#rol").val()),
		"status": true
	}

	return form;
}

/**
 * Funcionalidad para validar que el formulario se valido para crear o actualizar el empleado
 * @returns Retorna si es valido el formulario para realizar la petición de crear o actualizar
 */
const valiRegiEmple = () => {
	let vali = 1;
	$('.formVali').each(function(){
		if($(this).val() == '' && !$(this).data('apellido')){
			showAlerta("¡UN MOMENTO!", `Debe registrar ${$(this).data('vali')} del empleado.`, "info", 0)

			vali = 0;
			return false;
		}else{
			if($(this).data('mail') && validarCorreo($(this).val()) == null){
				showAlerta("¡UN MOMENTO!", `Debe registrar un correo valido.`, "info", 0)

				vali = 0;
				return false;
			}
		}
	});

	return vali;
}

/**
 * Funcionalidad para mostrar los datos existentes del empleado seleccionado en la tabla
 * Adicional genera la funcionalidad para la actualización del empleado de manera dinamica
 * @param {int} id Recibe por parametro el ID del empleado que se va a actualizar
 */
const setInfoEmpleado = (id) => {
	getDataEmpleados(id)
		.then((data) => {
			if(data.status == 200){
				$("#nombre").val(data.data.name);
				$("#apellido").val(data.data.surname);
				datepicker.setDate(data.data.dateOfBird);
				$("#correo").val(data.data.email);
				$("#rol").val(data.data.roleID);

				$("#contTituloModal").html(`Editar empleado`)

				$("#contBtnModal").html(
					`<button id="btnActuUsua" data-id="${data.data.id}" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Editar
					</button>`
				).after(function(){
					$("#btnActuUsua").on('click', function(){
						if(valiRegiEmple() == 1){
							const arrEmple = formatObjectEmple();
							const id = $(this).data('id');
							arrEmple.id = id;

							updateEmpleTabla(arrEmple, id)
								.then((data) => {
									if(data.status == 200){
										showAlerta("¡PERFECTO!", `Se actualizo la información del empleado con éxito.`, "success", 1)
									}else if(data.status == 409){
										showAlerta("¡UN MOMENTO!", `Ya existe un empleado con el correo ingresado.`, "error", 0)
									}else{
										showAlerta("¡UN MOMENTO!", `Ocurrió un problema al actualizar la información del empleado.`, "error", 0)
									}
								})
								.catch((error) => {
									validarError(error)
								})
						}
					})
				})
				
				modal.show()
			}
		})
		.catch((error) => {
			validarError(error)
		})
}

/**
 * Funcionalidad para verificar que el correo electronico sea valido
 * @param {string} email Recibe por parametro el texto del correo que se va a registrar
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
 * @param {string} texto Recibe por paremtro el texto de información que va en la alerta
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
				showTablaEmpleados()
				modal.hide()
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
		showAlerta("¡ERROR!", `Error con la respuesta del servidor.`, "error", 0)
	} else if (error.request) {
		showAlerta("¡ERROR!", `Error en la solicitud.`, "error", 0)
	} else {
		showAlerta("¡ERROR!", `Error desconocido.`, "error", 0)
	}
}
/*********************************************************************************/

/** CREACIÓN DE LAS FUNCIONALIDADES DE LOS ELEMENTOS FIJOS EN LA VISTA **/

/**
 * Funcionalidad para cerrar el modal de la creación o edición del empelado
 */
$(".btnCerrarModal").on('click', function(){
	modal.hide();
})

/**
 * Funcionalidad para mostrar el modal de creación del empleado y incializa los inputs usados en el formulario
 * Adicional genera el llamado del servicio para la creación del empleado
 */
$("#btnCreaModal").on('click', function(){
	$("#contTituloModal").html(`Crear empleado`)

	$("#contBtnModal").html(
		`<button id="btnRegiUsua" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			Registrar
		</button>`
	).after(function(){
		$("#nombre").val('');
		$("#apellido").val('');
		datepicker.setDate('');
		$("#correo").val('');
		$("#rol").val('');

		$("#btnRegiUsua").on('click', function(){
			if(valiRegiEmple() == 1){
				const arrEmple = formatObjectEmple();
		
				setNuevoEmple(arrEmple)
					.then((data) => {
						console.log(data);
						if(data.status == 201){
							showAlerta("¡PERFECTO!", `Se creo el empleado con éxito.`, "success", 1)
						}else if(data.status == 409){
							showAlerta("¡UN MOMENTO!", `El correo ingresado ya esta registrado, por favor verifique.`, "error", 0)
						}else{
							showAlerta("¡UN MOMENTO!", `Ocurrió un problema al registrar el empleado.`, "error", 0)
						}
					})
					.catch((error) => {
						validarError(error)
					})
			}
		})
	})

	modal.show();
})

/**
 * Funciónalidad para validar si hay empleados seleccionado para su eliminación
 * Adicional a ello genera el llamado para la elimincación multiple de los empleados
 */
$("#btnElimEmple").on('click', function(){
	let arrEmpleID = [];
	$(".chkDeleEmple").each(function(key, value){
		if($(this).is(':checked')){
			arrEmpleID.push(parseInt($(this).data('id')));
		}
	})

	deleteEmpleados(arrEmpleID)
		.then((data) => {
			if(data.status == 200){
				showAlerta("¡PERFECTO!", `Se borro con éxito los empleados seleccionados.`, "success", 1)
			}else{
				showAlerta("¡UN MOMENTO!", `Ocurrió un problema al borrar los empleados seleccionados.`, "success", 0)
			}
		})
		.catch((error) => {
			validarError(error)
		})
})

/**
 * Funcionalidad para mostrar la vista del login
 */
$("#btnSalir").on('click', function(){
	location.href = '/';
	sessionStorage.removeItem('session');
})
/*********************************************************************************/

/** CREACIÓN DE LOS ELEMENTOS DATEPICKER Y MODAL USADO EN LA VISTA **/

/**
 * Instacia de datepicker usado en la vista
 */
const $datepickerEl = document.getElementById('default-datepicker');

/**
 * Instacia de las opciones usadas en el datepicker
 * Adicional valida que solo pueda ingresar valores con rangos de edad entre 18 a 65 años
 */
const options = {
    defaultDatepickerId: null,
    autohide: true,
    format: 'yyyy/mm/dd',
    maxDate: '2006/12/31',
    minDate: '1959/01/01',
    orientation: 'bottom',
    buttons: false,
    autoSelectToday: false,
    title: null,
    rangePicker: false,
    onShow: () => {},
    onHide: () => {},
};

/**
 * Instacia de opciones adicionales usadas en el datepicker
 */
const instanceOptions = {
  id: 'default-datepicker',
  override: true
};

/**
 * Inicializa el datepicker usado en el formulario
 */
const datepicker = new Datepicker($datepickerEl, options, instanceOptions);

/**
 * Instacia del modal usado en la vista
 */
const $targetEl = document.getElementById('default-modal');

/**
 * Instacia de las opciones usadas en el modal
 */
const optionsModal = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true
};

/**
 * Instacia de opciones adicionales usadas en el modal
 */
const instanceOptionsModal = {
  id: 'default-modal',
  override: true
};

/**
 * Inicializa el modal usado para el formulario
 */
const modal = new Modal($targetEl, optionsModal, instanceOptionsModal);
/*********************************************************************************/

/** LLAMADO DE FUNCIONES YA INSTANCIADAS **/

showTablaEmpleados()
/*********************************************************************************/