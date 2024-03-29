import React, { useState } from 'react'
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        const payload = {
            name: name,
            price: price,
            category: category,
            company: company,
            userId: userId
        }

        let result = await fetch("http://localhost:5500/add-product", {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        console.log(result);
        toast.success("Added");

        setName("")
        setPrice("");
        setCategory("");
        setCompany("");
    }
    return (
        <div className='product'>
            <div className="innerProduct">
                <h1>Add Product</h1>
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <span className='invalid-input'>Enter product name</span>}
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price && <span className='invalid-input'>Enter product price</span>}
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {error && !category && <span className='invalid-input'>Enter product category</span>}
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                {error && !company && <span className='invalid-input'>Enter product company</span>}
                <button onClick={addProduct} className='appButton' type='button'>Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct