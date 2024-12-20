// import React, { useEffect, useState } from 'react';

// export default function RapidApi() {
//     const [moviesData, setMoviesData] = useState([]);
//     const [selectedMovie, setSelectedMovie] = useState([]);

//     useEffect(() => {
//         fetchMovies();
//     }, []);

//     const fetchMovies = async () => {
//         const url = 'https://movies-api14.p.rapidapi.com/movies';
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '30faf15b43msh2ae403bbb662e01p15eb01jsn8dc7d6142fce',
//                 'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
//             }
//         };
//         try {
//             const response = await fetch(url, options);
//             const result = await response.json();
//             setMoviesData(result.movies);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSelectMovie = (movie) => {
//         setSelectedMovie([...selectedMovie,movie]);
//     };

//     return (
//         <div className="container mx-auto relative overflow-auto h-[600px] w-[100%] shadow-md sm:rounded-lg border-2 border-black">
//             <h1 className="text-3xl font-bold text-center my-8">Movie List</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {moviesData.map((movie) => (
//                     <div key={movie._id} className="border rounded m-2 p-4 shadow-md">
//                         <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
//                         <img
//                             src={movie.poster_path}
//                             alt={movie.title}
//                             className="mx-auto mb-4"
//                             style={{ maxWidth: '100px' }}
//                         />
//                         <p className="mb-2 items-start"><span className="font-bold">Genres:</span> {movie.genres.join(', ')}</p>
//                         <p className="mb-2 items-start"><span className="font-bold">Release Date:</span> {movie.release_date}</p>
//                         <button
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                             onClick={() => handleSelectMovie(movie)}
//                         >
//                             Add to Cart
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             {selectedMovie.length > 0 && (
//                 <div className="mt-8 p-4 border rounded">
//                     <h2 className="text-xl font-bold mb-2">Selected Movies</h2>
//                     {selectedMovie.map((movie, index) => (
//                         <div key={index} className="flex items-center mb-4">
//                             <img src={movie.poster_path} alt={movie.title} style={{ maxWidth: '100px' }} className="mr-4" />
//                             <div>
//                                 <p className="font-bold">{movie.title}</p>
//                                 <p><span className="font-bold">Genres:</span> {movie.genres.join(', ')}</p>
//                                 <p><span className="font-bold">Release Date:</span> {movie.release_date}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import { BsFillCartFill } from 'react-icons/bs';

export default function RapidApi() {
    const [moviesData, setMoviesData] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const url = 'https://movies-api14.p.rapidapi.com/movies';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '30faf15b43msh2ae403bbb662e01p15eb01jsn8dc7d6142fce',
                'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setMoviesData(result.movies);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToCart = (movie) => {
        setSelectedMovies([...selectedMovies, movie]);
        setCartCount(cartCount + 1);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="container mx-auto relative overflow-auto h-[600px] w-[100%] shadow-md sm:rounded-lg border-2 border-black">
            <h1 className="text-3xl font-bold text-center my-8">Movie List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {moviesData.map((movie) => (
                    <div key={movie._id} className="border rounded m-2 p-4 shadow-md">
                        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                        <img
                            src={movie.poster_path}
                            alt={movie.title}
                            className="mx-auto mb-4"
                            style={{ maxWidth: '100px' }}
                        />
                        <p className="mb-2 items-start"><span className="font-bold">Genres:</span> {movie.genres.join(', ')}</p>
                        <p className="mb-2 items-start"><span className="font-bold">Release Date:</span> {movie.release_date}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAddToCart(movie)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            {cartCount > 0 && (
                <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>
                    <BsFillCartFill className="mr-2" />
                    Cart ({cartCount})
                </button>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Selected Movies</h2>
                        {selectedMovies.map((movie, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-bold">{movie.title}</p>
                                <img src={movie.poster_path} alt={movie.title} style={{ maxWidth: '100px' }} className="mr-4 content-center" />
                                <p><span className="font-bold">Genres:</span> {movie.genres.join(', ')}</p>
                                <p><span className="font-bold">Release Date:</span> {movie.release_date}</p>
                            </div>
                        ))}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}



