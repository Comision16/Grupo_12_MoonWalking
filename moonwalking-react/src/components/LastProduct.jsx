import React, { useState, useEffect } from 'react'
import { fetchThis } from '../hooks/fetchThis';

export const LastProduct = () => {

    const [product, setProduct] = useState(
        {
            loading: true,
            error: null,
            data: {}
        }
    );

    useEffect(() => {
        fetchThis('ext/getLatest')
            .then((response) => {
                if(!response.ok)
                {
                    setProduct({ ...product, error: response.msg});
                }
                else
                {
                    setProduct({ ...product, loading: false, data: response.data.product[0]});
                }
                console.log(response.data.product[0]);
            })
    }, []);

    return (
        
        <div className="col-lg-6 mb-4">
            {
                    (product.loading) ? <p>Cargando...</p>
                    : (
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h5 className="m-0 font-weight-bold text-gray-800">Último producto agregado</h5>
                            </div>
                            <div className="card-body">
                                <div className="text-center">
                                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" src={(product.data.images && product.data.images[0]) ? 'http://localhost:4000/api/products/img/' + product.data.images[0].file : 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'} style={{width: '40rem'}} alt={ product.data.name }/>
                                </div>
                                <h1> { product.data.name } </h1>
                                <p> { product.data.description } </p>
                                <a className="btn btn-danger" target="_blank" href={`http://localhost:4000/products/detalle/${product.data.id}`}>Ir a detalle</a>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
