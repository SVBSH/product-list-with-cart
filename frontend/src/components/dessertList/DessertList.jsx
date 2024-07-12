import { useEffect, useState } from 'react';
import DessertItem from "@components/dessertItem/DessertItem";
import request from '@services/axiosConfig';

function DessertList() {
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        request.get('/desserts')
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