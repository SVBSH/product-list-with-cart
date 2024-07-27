import { useEffect, useState } from 'react';
import DessertItem from "@components/dessertItem/DessertItem";
import axios from 'axios';

function DessertList() {
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        axios.get('/api/desserts')
            .then(response => {
                setDesserts(response.data);
            })
            .catch(error => {
                console.error('Error fetching desserts:', error);
            });
    }, []); 

    return (
        <ul className="desert-list">
            {desserts.map((dessert, index) => {
                return (
                    <DessertItem
                        key={index}
                        {...dessert}
                    />
                );
            })}
        </ul>
    );
}

export default DessertList;