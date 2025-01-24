import { dataBase } from "../js/data.js";

export function listProduct (productsComponent) {
    const item = productsComponent.shadowRoot.getElementById('productList');
    const productIdInput = productsComponent.shadowRoot.getElementById('productIdInput');
    const unitaryValueInput = productsComponent.shadowRoot.getElementById('unitaryValue');

    // Agregar los productos al select de opciones
    dataBase.forEach (element => {
        const option = document.createElement("option");
        option.value = element.id; // Verificar que el value sea el id del producto
        option.textContent = element.product;
        item.appendChild(option);
    });

    // Agregar evento para actualizar los campos al seleccionar un producto
    item.addEventListener('change', (event) => {
        const selectedProductId = event.target.value; // id seleccionado
        const selectedProduct = dataBase.find(product => product.id === selectedProductId); // Buscar producto

        if (selectedProduct) {
            productIdInput.value = selectedProduct.cod; // Actualizar el código
            unitaryValueInput.value = `$ ${selectedProduct.price}`; // Actualizar el precio
        } else {
            // Limpiar los campos si no hay un producto válido seleccionado
            productIdInput.value = '';
            unitaryValueInput.value = '';
        }
    });
}
