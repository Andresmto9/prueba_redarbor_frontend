import { getEmpleados, setEmpleados, getEmpleadosID, updateEmpleado, deleteEmpleado, deleteMultiEmpleados } from '../api/empleados.api'
import { Datepicker } from 'flowbite';

document.querySelector('#empleados').innerHTML = `
	<div class="col-span-12">
		<div class="grid place-items-center col-span-12">
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

/**
 * Función para realizar el llamado al consumo del servicio que obtiene los empleados existentes
 * @returns retorna el objeto de respuesta del consumo
 */
async function getDataEmple(){
	const resp = await getEmpleados();
    return resp
}

async function setNuevoEmple(arrEmple){
	const resp = await setEmpleados(arrEmple);
    return resp
}

async function getDataEmpleados(id){
	const resp = await getEmpleadosID(id);
    return resp
}

async function updateEmpleTabla(arrEmple, ID){
	const resp = await updateEmpleado(arrEmple, ID);
    return resp
}

async function deleteInfoEmpleado(id){
	const resp = await deleteEmpleado(id);
    return resp
}

async function deleteEmpleados(arrEmpleID) {
	const resp = await deleteMultiEmpleados(arrEmpleID);
    return resp
}

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
											console.log(error)
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
			console.log(error)
		});
}

showTablaEmpleados()

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
							const ID = $(this).data('id');
							arrEmple.id = ID;

							updateEmpleTabla(arrEmple, ID)
								.then((data) => {
									if(data.status == 200){
										showAlerta("¡PERFECTO!", `Se actualizo la información del empleado con éxito.`, "success", 1)
									}else{
										showAlerta("¡UN MOMENTO!", `Ocurrió un problema al actualizar la información del empleado.`, "error", 0)
									}
								})
								.catch((error) => {
									console.log(error)
								})
						}
					})
				})
				
				modal.show()
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

const validarCorreo = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

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

$(".btnCerrarModal").on('click', function(){
	modal.hide();
})

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
						if(data.status == 201){
							showAlerta("¡PERFECTO!", `Se creo el empleado con éxito.`, "success", 1)
						}else{
							showAlerta("¡UN MOMENTO!", `Ocurrió un problema al registrar el empleado.`, "error", 0)
						}
					})
					.catch((error) => {
						console.log(error);
					})
			}
		})
	})

	modal.show();
})

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
			console.log(error)
		})
})

const $datepickerEl = document.getElementById('default-datepicker');

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

const instanceOptions = {
  id: 'default-datepicker',
  override: true
};

const datepicker = new Datepicker($datepickerEl, options, instanceOptions);

const $targetEl = document.getElementById('default-modal');

const optionsModal = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true
};

const instanceOptionsModal = {
  id: 'default-modal',
  override: true
};

const modal = new Modal($targetEl, optionsModal, instanceOptionsModal);