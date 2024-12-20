# Instrucciones para montar el cliente de la prueba técnica

A continuación se describen los pasos para montar el cliente de la prueba técnica.

## Pasos

1. **Abrir la consola del sistema**  
   Abre una consola del sistema (CMD).

2. **Dirigirse al directorio de clonación**  
   Dirígete a un directorio donde desees clonar el repositorio.

3. **Clonar el repositorio**  
   Ejecuta el siguiente comando para clonar el repositorio del cliente:  
   `git clone https://github.com/Andresmto9/prueba_redarbor_frontend.git`

4. **Acceder al directorio del repositorio**  
   Ingresa al directorio clonado:  
   `cd prueba_redarbor_frontend`

5. **Instalar las dependencias**  
   Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:  
   `npm install`

6. **Iniciar el servidor de desarrollo**  
   Después de que se hayan instalado todas las dependencias, ejecuta el siguiente comando para montar el servidor de desarrollo:  
   `npm run dev`  
   Esto iniciará el servidor y podrás visualizar el proyecto correctamente.

7. **Verificar el servicio de consumo**  
   Valida que el servicio para el consumo de servicios esté activo y que el puerto de conexión sea:  
   `http://localhost:5115/`

8. **Ajustar el puerto si es necesario**  
   Si el puerto de conexión no es **5115**, verifica en qué puerto está montado el servicio y ajusta la variable `BASE_URL` en los archivos `empleados.api.js` y `login.api.js` que se encuentran en el directorio `src/api`.

9. **Verificar la visualización del proyecto**  
   Si todo está correcto, podrás visualizar la prueba técnica en el puerto asignado.

¡Listo! El cliente debería estar montado y funcionando correctamente.
