import React from 'react'
import List from './List'

const Content = ({ items, handleChange, handleDelete }) => {
    return (
        <div className='content'>
            {items.length
                ? (<List
                    items={items}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                />)
                : (<p className='empty'>List is empty.</p>)
            }
        </div>

    )
}

export default Content