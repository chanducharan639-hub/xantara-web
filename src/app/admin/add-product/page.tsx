'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {

    const router = useRouter();

    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
    });

    const handleSubmit = () => {

        const existing =
            JSON.parse(
                localStorage.getItem('products') || '[]'
            );

        const newProduct = {
            id: Date.now().toString(),
            ...product,
        };

        localStorage.setItem(
            'products',
            JSON.stringify([
                ...existing,
                newProduct,
            ])
        );

        alert('Product Added 🚀');

        router.push('/collection');
    };

    return (
        <div className="admin-add">

            <h1>Add Product</h1>

            <input
                placeholder="Product Name"
                value={product.name}
                onChange={(e) =>
                    setProduct({
                        ...product,
                        name: e.target.value,
                    })
                }
            />

            <input
                placeholder="Category"
                value={product.category}
                onChange={(e) =>
                    setProduct({
                        ...product,
                        category: e.target.value,
                    })
                }
            />

            <input
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                    setProduct({
                        ...product,
                        price: e.target.value,
                    })
                }
            />

            <input
                placeholder="Image URL (/shirt.png)"
                value={product.image}
                onChange={(e) =>
                    setProduct({
                        ...product,
                        image: e.target.value,
                    })
                }
            />

            <button onClick={handleSubmit}>
                ADD PRODUCT
            </button>

            <style jsx>{`
        .admin-add {
          min-height: 100vh;
          padding: 120px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 500px;
          margin: auto;
        }

        input {
          height: 50px;
          padding: 0 15px;
          border: 1px solid #ddd;
          border-radius: 10px;
        }

        button {
          height: 50px;
          background: black;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}