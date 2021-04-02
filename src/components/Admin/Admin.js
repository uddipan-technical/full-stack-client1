
import React, { useEffect, useState } from 'react';
import './Admin.css';
import fakeData from '../../fakeData';

const Admin = () => {

        const [products, setProducts] = useState([]);
            useEffect( () => {
                fetch('http://localhost:5000/products')
                .then(res => res.json())
                .then(data => setProducts(data))
            }, [])

        const deleteProduct = (name) => {
        console.log(name)

        fetch('http://localhost:5000/deleteProduct', {
            // mode: 'cors',
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
         });
    }

    const handleAddProduct= () => {

        const data =fakeData.length > 0 && (fakeData[0]);
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    return (
        <div className="product-details">
                {
                    products.map(pd => (
                        <div className="editDelete">
                            <li className="productName">product:{pd.name}</li>
                            <button>Edit</button>
                            <button onClick={()=>deleteProduct(pd.key)}>delete</button>
                        </div>))
                }
                {fakeData.length >0 ? <button onClick={handleAddProduct}>Add Product</button>: <h1>now upload</h1>}
            
        </div>
    );
};

export default Admin;