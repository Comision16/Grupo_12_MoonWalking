import React from 'react'

export const User = (user) => {

  const img = user.image ? 'http://localhost:4000/api/users/img/' + user.image : 'http://localhost:4000/api/users/img/default.jpg';

  return (
    <div className='item'>
        <img src={img} alt={user.firstName}/>
        <p>{ user.firstName }</p>
    </div>
  )
}
