import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateProduct = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const getProduct = async () => {
        let result = await fetch(`http://localhost:5500/product/${id}`, {
            headers: {
                "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();

        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    useEffect(() => {
        getProduct();
    }, [])

    const updateProduct = async () => {

        const payload = {
            name: name,
            price: price,
            category: category,
            company: company
        }

        let result = await fetch(`http://localhost:5500/update/${id}`, {
            method: "put",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            toast.success("Updated");
            navigate("/");
        }
    }
    return (
        <div className='product'>
            <div className="innerProduct">
                <h1>Update Product</h1>
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {/* {error && !name && <span className='invalid-input'>Enter product name</span>} */}
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {/* {error && !price && <span className='invalid-input'>Enter product price</span>} */}
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {/* {error && !category && <span className='invalid-input'>Enter product category</span>} */}
                <input
                    style={{ "marginBottom": "2px" }}
                    className="inputBox"
                    type='text'
                    placeholder='Enter product company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                {/* {error && !company && <span className='invalid-input'>Enter product company</span>} */}
                <button onClick={updateProduct} className='appButton' type='button'>Update Product</button>
            </div>
        </div>
    )
}

export default UpdateProduct