import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
export default function Screen2() {

    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response1 = await axios.get('https://dummyjson.com/products?_skip=0&limit=12');
            const response2 = await axios.get('https://dummyjson.com/carts?limit=7');

            setProducts([...response1.data.products]);
            setCarts([...response2.data.carts]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    const fetchMoreProducts = async () => {
        const size = products.length
        setIsLoading(true);
        try {
            // Fetch more products based on x-scroll
            const response = await axios.get(`https://dummyjson.com/products?skip=${size}&limit=10`);
            setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
            console.log('products', products.length)
        } catch (error) {
            console.error('Error fetching more products:', error);
        }
        setIsLoading(false);
    };

    const fetchMoreCarts = async () => {
        setIsLoading(true);
        const size = carts.length;
        try {
            // Fetch more Carts based on y-scroll
            const response = await axios.get(
                `https://dummyjson.com/carts?_start=${size}&_limit=2`
            );
            setCarts((prevCarts) => [...prevCarts, ...response.data.carts]);
            console.log('carts', carts.length);
        } catch (error) {
            console.error('Error fetching more Carts:', error);
        }
        setIsLoading(false);
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
            // Fetch more Carts on y-scroll
            fetchMoreCarts();
        } else if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
            // Fetch more products on x-scroll
            fetchMoreProducts();
        }
    };

    return (
        <div className='m-1 overflow-auto max-h-[600px] max-w-[100%] border-2 border-black' ref={containerRef} onScroll={handleScroll} >
            {isLoading && <div className='text-end'>Loading...</div>}
            <div className='flex flex-row h-42'>
                <div className='bg-gray-300 min-w-44 m-1 border-2 border-gray-500'>
                    <div className='mr-2 pl-24 text-lg font-medium'>Products</div>
                    <div className='ml-2 pt-10 text-lg text-left font-medium'>carts</div>
                </div>
                {products.map((ele, index) =>
                    <div key={index} className='text-center bg-gray-300 min-w-16 m-1 pt-10 border-2 border-gray-500 '>
                        <p className='text-center -rotate-90'>{`ProId${ele.id}`}</p>
                    </div>
                )}
            </div>
            <div>
                {carts.map((ele, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row items-center">
                        <div className="min-w-44 h-16 m-1 bg-gray-300 pt-5 border-2 border-gray-500">cartsId{ele.id}</div>
                        {products.map((product, colIndex) => (
                            <div
                                key={colIndex}
                                className={`min-w-16 h-16 mr-1 ml-1 ${ele.products.map(product => product.id).includes(product.id) ? 'bg-orange-300' : 'bg-slate-300'}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            {isLoading && <div className='text-center'>Loading...</div>}
        </div>
    );
}


// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// export default function Screen2() {
//     const [products, setProducts] = useState([]);
//     const [carts, setCarts] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const containerRef = useRef(null);
//     const productsCountRef = useRef(0);
//     const cartsCountRef = useRef(0);
//     const allProductsFetchedRef = useRef(false);
//     const allCartsFetchedRef = useRef(false);

//     const fetchData = async () => {
//         setIsLoading(true);
//         try {
//             const response1 = await axios.get(`https://dummyjson.com/products?_limit=10`);
//             const response2 = await axios.get(`https://dummyjson.com/carts?_limit=7`);

//             setProducts([...response1.data.products]);
//             setCarts([...response2.data.carts]);

//             productsCountRef.current = response1.data.products.length;
//             cartsCountRef.current = response2.data.carts.length;

//             // if (response1.data.products.length < 100) {
//             //     allProductsFetchedRef.current = true;
//             // }
//             // if (response2.data.carts.length < 20) {
//             //     allCartsFetchedRef.current = true;
//             // }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         setIsLoading(false);
//     };

//     const fetchMoreProducts = async () => {
//         if (allProductsFetchedRef.current) return;
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`https://dummyjson.com/products?_start=${products.length}&_limit=5`);
//             const newProducts = response.data.products.filter((product) => !products.some((p) => p.id === product.id));
//             if (newProducts.length === 0 || productsCountRef.current + newProducts.length >= 100) {
//                 allProductsFetchedRef.current = true;
//                 setIsLoading(false);
//                 return;
//             }
//             setProducts((prevProducts) => [...prevProducts, ...newProducts]);
//             productsCountRef.current += newProducts.length;
//         } catch (error) {
//             console.error('Error fetching more products:', error);
//         }
//         setIsLoading(false);
//     };

//     const fetchMoreCarts = async () => {
//         if (allCartsFetchedRef.current) return;
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`https://dummyjson.com/carts?_start=${carts.length}&_limit=2`);
//             const newCarts = response.data.carts.filter((cart) => !carts.some((c) => c.id === cart.id));
//             if (newCarts.length === 0 || cartsCountRef.current + newCarts.length >= 20) {
//                 allCartsFetchedRef.current = true;
//                 setIsLoading(false);
//                 return;
//             }
//             setCarts((prevCarts) => [...prevCarts, ...newCarts]);
//             cartsCountRef.current += newCarts.length;
//         } catch (error) {
//             console.error('Error fetching more carts:', error);
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleScroll = () => {
//         const container = containerRef.current;
//         if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
//             fetchMoreCarts();
//         } else if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
//             fetchMoreProducts();
//         }
//     };

//     return (
//         <div className="m-2 overflow-auto max-h-[600px] max-w-[100%] border-2 border-black" ref={containerRef} onScroll={handleScroll}>
//             {isLoading && <div className="text-center">Loading...</div>}
//             <div className="flex flex-row h-42">
//                 <div className="bg-gray-300 min-w-44 m-1 border-2 border-gray-500">
//                     <div className="mr-2 pl-24 text-lg font-medium">Products</div>
//                     <div className="ml-2 pt-10 text-lg text-left font-medium">Carts</div>
//                 </div>
//                 {products.map((ele, index) => (
//                     <div key={index} className="bg-gray-300 min-w-16 m-1 pt-10 border-2 border-gray-500">
//                         <p className="justify-between -rotate-90">{ele.title.slice(0, 8)}</p>
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 {carts.map((ele, rowIndex) => (
//                     <div key={rowIndex} className="flex flex-row items-center">
//                         <div className="min-w-44 h-16 m-1 bg-gray-300 pt-5 border-2 border-gray-500">CartsId{ele.id}</div>
//                         {products.map((product, colIndex) => (
//                             <div
//                                 key={colIndex}
//                                 className={`min-w-16 h-16 mr-1 ml-1 ${
//                                     ele.products.map((product) => product.id).includes(product.id)
//                                         ? 'bg-orange-300'
//                                         : 'bg-slate-300'
//                                 }`}
//                             ></div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//             {isLoading && <div className="text-center">Loading...</div>}
//         </div>
//     );
// }
