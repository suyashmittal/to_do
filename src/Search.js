import React from 'react'

const Search = ({ search, setSearch }) => {
    return (
        <div className="search">
            <input
                autoFocus
                id='searchItem'
                type='text'
                placeholder='Search Items'
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

export default Search