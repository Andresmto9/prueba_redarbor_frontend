document.querySelector('#app').innerHTML = `
  <div class="mx-auto my-36 flex h-[300px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
    <div class="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
      <div class="h-7 w-3 bg-[#0DE6AC]"></div>
      <div class="w-3 text-center font-sans text-xl font-bold"><h1>Ingreso</h1></div>
    </div>
    <div class="flex flex-col items-center">
      <input class="my-2 w-72 border p-2" type="email" placeholder="Usuario" />
      <input class="my-2 w-72 border p-2" type="password" placeholder="Contraseña" />
    </div>
    <div class="my-2 flex justify-center">
      <button id="btnCosa" class="w-72 border bg-[#0DE6AC] p-2 font-sans">Ingresar</button>
    </div>
  </div>
`

// Swal.fire({
//   title: "Good job!",
//   text: "You clicked the button!",
//   icon: "success"
// });

$("#btnCosa").on('click', function(){
  console.log("Cosaxd");
})

location.href = 'empleados'