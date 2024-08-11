import React from 'react'

const List = ({ items, handleChange, handleDelete }) => {
    return (
        <ul className='list'>
            {items.map((item) => (
                <li className='item' key={item.id}>
                    <input type="checkbox" checked={item.checked} onChange={() => handleChange(item.id)} />
                    <p className='text' style={(item.checked) ? { textDecoration: 'line-through' } : null}>{item.item}</p>
                    <button id='deleteButton' onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
            ))}
        </ul >
    )
}

export default List