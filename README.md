# Invoice Management System

Este proyecto es una aplicación web para la gestión de facturas, desarrollada con JavaScript, HTML, y CSS (usando Bootstrap). Su objetivo es proporcionar una interfaz fácil de usar para generar facturas, permitiendo al cliente agregar productos, ingresar sus datos personales, y visualizar el resumen de su compra, todo mientras se actualiza dinámicamente.

El sistema almacena los datos de la factura en el `localStorage` y permite consultar las facturas generadas mediante la consola del navegador.

## Requerimientos

### 1. Generación de número de factura aleatorio
- El sistema genera automáticamente un número único de factura que se actualiza cada vez que se recarga la página.
  
### 2. Ingreso de datos personales del cliente
- Se dejan campos para que el cliente ingrese sus datos personales, como número de identificación, nombres, apellidos, dirección y correo electrónico.
  
### 3. Selección de productos desde la base de datos
- El cliente puede seleccionar productos de una lista desplegable, con los datos cargados automáticamente desde una base de datos.

### 4. Autocompletar detalles del producto seleccionado
- Al seleccionar un producto, se carga automáticamente su código y precio unitario, de forma que el cliente solo debe ingresar la cantidad deseada.

### 5. Agregar productos al detalle de la factura
- Al hacer clic en el botón "Agregar", el producto seleccionado se añade al detalle de la factura. Si el producto ya está en la lista, solo se actualiza la cantidad en lugar de agregar una nueva fila.

### 6. Eliminar productos del detalle de la factura
- Se incluye un botón en cada fila de la tabla para eliminar productos del detalle de la factura según la necesidad del cliente.

### 7. Cálculo del subtotal, IVA y total
- En la sección "Summary", se calcula automáticamente el subtotal, el IVA correspondiente, y el total (suma de subtotal y IVA).

### 8. Almacenamiento de la factura en `localStorage`
- Al hacer clic en "Pagar", se almacena un array con el número de factura y los datos del cliente, productos y resumen. Este array se guarda en `localStorage` para que pueda ser consultado posteriormente desde la consola del navegador.

### 9. Recarga de página tras generación de factura
- Después de mostrar una alerta con el mensaje "Factura generada exitosamente", la página se recarga automáticamente usando `setTimeout`, lo que simula la consulta a un servidor para generar un nuevo código de factura y limpia los campos del formulario.

## Funcionalidades adicionales (Plus)

- **Validación de datos:** El sistema valida los datos ingresados por el cliente, como el número de identificación, correo electrónico, y otros campos, antes de permitir la creación de la factura.
- **Uso de Shadow DOM:** El diseño de los componentes se implementa utilizando el Shadow DOM para asegurar el aislamiento del estilo y la estructura del documento.
- **Uso de `localStorage`:** Los datos de la factura se almacenan localmente para poder consultarlos más tarde y verificar que la información se haya guardado correctamente.

## Estructura del Proyecto

- **index.html:** Archivo principal que carga los componentes de la página.
- **app.js:** Archivo JavaScript que importa los componentes y maneja la lógica de la aplicación.
- **components/**: Carpeta que contiene los componentes personalizados, como `headerComponent.js`, `productsComponent.js`, etc.

## Instrucciones de consulta de facturas

Para verificar el contenido del array facturas, sigue estos pasos:

1. Consulta facturas almacenadas:

   console.log(JSON.parse(localStorage.getItem("facturas")));
