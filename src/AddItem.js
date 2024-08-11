import React from 'react'

const AddItem = ({ newItem, setNewItem, handleAdd }) => {
    return (
        <div className="add">
            <form onSubmit={handleAdd} className="add">
                <input
                    autoFocus
                    id='addItem'
                    type='text'
                    placeholder='Add Item'
                    required
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button type='submit' id='addButton'>Add</button>
            </form>
        </div>
    )
}

export default AddItem