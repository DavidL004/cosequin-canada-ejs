"use strict"

const radioButtons = document.querySelectorAll('.selectorForm input');
const animalTypes = document.querySelectorAll('.product');

function filterProducts(products, id) {
    products.forEach(product => {
        if (product.dataset.animal == id) {
            if (product.classList.contains('hidden')) {
                product.classList.remove('hidden');
            }
        }
        else {
            if (!product.classList.contains('hidden')) {
                product.classList.add('hidden');
            }
        }   
    });
}

radioButtons.forEach(element => {
    element.addEventListener('change', function (event) {
        filterProducts(animalTypes, this.id)
    });
});




