import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5500/products", {
            headers: {
                "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5500/product/${id}`, {
            method: "delete",
            headers: {
                "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            toast.success("Deleted");
            getProducts();
        }
    }

    const handleSearch = async (e) => {
        const searchValue = e.target.value;
        if (searchValue) {
            let result = await fetch(`http://localhost:5500/search/${searchValue}`, {
                headers: {
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }
    return (
        <div className="product-list">
            <div className="innerProductList">
                <h1>Product List</h1>
                <input onChange={handleSearch} className="searchBox" type="text" placeholder="Search Products" />
                <ul style={{ fontWeight: 600 }}>
                    <li>Sr. No.</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Action</li>
                </ul>
                {
                    products.length > 0 ? products?.map((item, index) => (
                        <ul key={index}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>₹ {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button className="actionBtn deleteBtn" onClick={() => deleteProduct(item._id)}>Delete</button>
                                {/* <button className="actionBtn editBtn">Edit</button> */}
                                <Link to={"/update/" + item._id}><button className="actionBtn editBtn">Edit</button></Link>
                            </li>
                        </ul>
                    ))
                        :
                        <h1>No Result Found</h1>
                }
            </div>
        </div>
    )
}

export default ProductList;