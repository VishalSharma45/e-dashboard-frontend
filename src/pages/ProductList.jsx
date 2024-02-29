import React, { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5500/products");
        result = await result.json();
        setProducts(result);
    }
    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5500/product/${id}`, {
            method: "delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <div className="innerProductList">
                <h3>Product List</h3>
                <ul style={{ fontWeight: 600 }}>
                    <li>Sr. No.</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Action</li>
                </ul>
                {
                    products.length > 0 && products?.map((item, index) => (
                        <ul key={index}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>₹ {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button className="actionBtn deleteBtn" onClick={() => deleteProduct(item._id)}>Delete</button>
                                <button className="actionBtn editBtn">Edit</button>
                            </li>
                        </ul>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList;