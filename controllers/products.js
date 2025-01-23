import { dataBase } from "../js/data.js";

export function listProduct(productsComponent) {
    const item = productsComponent.shadowRoot.getElementById('productList');
    const productIdInput = productsComponent.shadowRoot.getElementById('productIdInput');
    const unitaryValueInput = productsComponent.shadowRoot.getElementById('unitaryValue'); // Cambiado de 'productPriceInput' para apuntar al campo correcto

    // Poblar el select con opciones
    dataBase.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id; // Se asegura que el value sea el ID del producto
        option.textContent = element.product;
        item.appendChild(option);
    });

    // Agregar un listener para actualizar los campos al seleccionar un producto
    item.addEventListener('change', (event) => {
        const selectedProductId = event.target.value; // ID seleccionado
        const selectedProduct = dataBase.find(product => product.id === selectedProductId); // Buscar producto

        if (selectedProduct) {
            productIdInput.value = selectedProduct.cod; // Actualizar el código
            unitaryValueInput.value = selectedProduct.price; // Actualizar el precio
        } else {
            // Limpiar los campos si no hay un producto válido seleccionado
            productIdInput.value = '';
            unitaryValueInput.value = '';
        }
    });
}
