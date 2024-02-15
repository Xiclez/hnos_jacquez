import React, { useState } from 'react';

function ProductDetails({ product }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Product Details</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product Name</td>
            <td>
              <input
                type="text"
                name="productName"
                value={editedProduct.productName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>
              <input
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Weight (kg)</td>
            <td>
              <input
                type="number"
                name="weightKg"
                value={editedProduct.weightKg}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Weight (lb)</td>
            <td>
              <input
                type="number"
                name="weightLb"
                value={editedProduct.weightLb}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Serial Number</td>
            <td>
              <input
                type="text"
                name="serialNumber"
                value={editedProduct.serialNumber}
                onChange={handleChange}
              />
            </td>
          </tr>
          {/* Add more fields as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetails;
