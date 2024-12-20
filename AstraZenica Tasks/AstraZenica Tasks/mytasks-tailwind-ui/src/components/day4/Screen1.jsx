import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Matrix from '../storybook/Matrix';
export default function Screen1() {

    const [products, setProducts] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response1 = await axios.get('http://localhost:8181/products?_limit=12');
            const response2 = await axios.get('http://localhost:8181/speciality?_limit=7');
            setProducts(response1.data);
            setSpeciality(response2.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    const fetchMoreProducts = async () => {
        setIsLoading(true);
        setTimeout(async () => {
            try {
                // Fetch more products based on x-scroll
                const response = await axios.get(`http://localhost:8181/products?_start=${products.length}&_limit=5`);
                setProducts((prevProducts) => [...prevProducts, ...response.data]);
                console.log('products', products.length)
            } catch (error) {
                console.error('Error fetching more products:', error);
            }
            setIsLoading(false);
        }, 500);

    };

    const fetchMoreSpecialities = async () => {
        setIsLoading(true);
        setTimeout(async () => {
            try {
                // Fetch more specialities based on y-scroll
                const response = await axios.get(
                    `http://localhost:8181/speciality?_start=${speciality.length}&_limit=5`
                );
                setSpeciality((prevSpeciality) => [...prevSpeciality, ...response.data]);
                console.log('speciality', speciality.length)
            } catch (error) {
                console.error('Error fetching more specialities:', error);
            }
        }, 500);
        setIsLoading(false);
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
            // Fetch more specialities on y-scroll
            fetchMoreSpecialities();
        } else if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
            // Fetch more products on x-scroll
            fetchMoreProducts();
        }
    };

    return (
        <>
            {isLoading && <div className='text-end'>Loading...</div>}
            <Matrix products={products} speciality={speciality} containerRef={containerRef} onScroll={handleScroll} />
            {isLoading && <div className='text-center'>Loading...</div>}
        </>
    );
}
