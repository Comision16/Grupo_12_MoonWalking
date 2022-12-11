import React from 'react'

export const Product = (product) => {

  const img = (product.images && product.images[0]) ? 'http://localhost:4000/api/products/img/' + product.images[0].file : 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'

  return (
    <div className='item'>
        <img src={img} alt={product.name}/>
        <p>{ product.name }</p>
    </div>
  )
}
