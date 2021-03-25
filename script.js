const loadProducts = () =>{
    fetch('/products')
    .then(res => res.json())
    .then(data => {
        const productContainer = document.getElementById('product-container');
        data.forEach(product => {
            const p = document.createElement('p');
            p.innerHTML = `<b>${product.name}</b> </br> 
                            Price: ${product.price} </br>
                            Quantity: ${product.quantity} </br>
                            <button onclick="deleteProduct('${product._id}')">Delete</button>`;
            productContainer.appendChild(p);
            
        });        

    });  
}

// const deleteProduct = (id) =>{
//     fr
// }

loadProducts();