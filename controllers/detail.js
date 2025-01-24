// Almacén para los detalles del pedido
const detailData = [];

// Función para agregar o actualizar un producto en los detalles
export function addProductToDetail(product) {
  const existingProduct = detailData.find((item) => item.cod === product.cod);

  if (existingProduct) {
    // Si el producto ya existe, actualizar cantidad y subtotal
    existingProduct.quantity += product.quantity;
    existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
  } else {
    // Si no existe, agregar el nuevo producto
    detailData.push({
      ...product,
      subtotal: product.quantity * product.price,
    });
  }

  // Disparar un evento personalizado para actualizar la tabla
  const event = new CustomEvent("detailUpdated", { detail: detailData });
  document.dispatchEvent(event);
}

// Función para eliminar un producto de los detalles
export function removeProductFromDetail(cod) {
  const index = detailData.findIndex((item) => item.cod === cod);
  if (index !== -1) {
    detailData.splice(index, 1);

    // Disparar el evento personalizado para actualizar la tabla
    const event = new CustomEvent("detailUpdated", { detail: detailData });
    document.dispatchEvent(event);
  }
}

// Función para obtener los detalles del pedido
export function getInvoiceDetails() {
  return detailData;
}

// Función para limpiar los datos del detalle
export function clearDetails() {
  detailData.length = 0; // Vaciar el array
  document.dispatchEvent(new CustomEvent("detailUpdated", { detail: [] })); // Emitir evento para actualizar la tabla
}
