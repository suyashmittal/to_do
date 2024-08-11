import { useEffect, useState } from 'react';
import Content from './Content';
import AddItem from './AddItem';
import Search from './Search';
import apiReq from './apiReq';

function App() {
    const API_URL = "http://localhost:3500/items";

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Did not receive expected data!');
                const result = await response.json();
                setItems(result);
                setFetchError(null);
            }
            catch (err) {
                setFetchError(err.message);
            }
            finally {
                setLoad(false);
            }
        }

        setTimeout(fetchItems, 2000);
    }, [])

    const handleChange = async (id) => {
        const newItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
        setItems(newItems);

        const updatedItem = newItems.filter((item) => item.id === id);
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checked: updatedItem[0].checked })
        }

        const reqURL = `${API_URL}/${id}`
        const result = await apiReq(reqURL, updateOptions);
        if (result) setFetchError(result);
    }

    const handleDelete = async (id) => {
        const newItems = items.filter((item) => item.id !== id)
        setItems(newItems);

        const deleteOptions = {
            method: 'DELETE',
        }

        const reqURL = `${API_URL}/${id}`
        const result = await apiReq(reqURL, deleteOptions);
        if (result) setFetchError(result);
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newItem) return;
        const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;
        const tempItem = { id: id + '', checked: false, item: newItem };
        setItems([...items, tempItem]);
        setNewItem('');

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempItem)
        }

        const result = await apiReq(API_URL, postOptions);
        if (result) setFetchError(result);

    }

    return (
        <div className="app">
            <h1 className='heading'>To Do App</h1>
            <Search
                className='search'
                search={search}
                setSearch={setSearch}
            />
            <AddItem
                className='add'
                newItem={newItem}
                setNewItem={setNewItem}
                handleAdd={handleAdd}
            />
            <main>
                {load && <p>Loading...</p>}
                {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
                {!fetchError && !load && <Content
                    className='content'
                    items={items.filter((item) => ((item.item).toLowerCase().includes(search.toLowerCase())))}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                />}
            </main>

        </div>
    );
}

export default App;