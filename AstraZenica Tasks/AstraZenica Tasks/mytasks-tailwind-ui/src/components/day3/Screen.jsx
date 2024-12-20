import { products, speciality } from '@Database/db.json';
import Matrix from '@Components/storybook/Matrix';

function Screen() {
    if(products.length <=0 || speciality.length<=0){
        return <div>No Data Found</div>
    }
    return ( 
       <Matrix products={products} speciality={speciality}/>
    );
}

export default Screen;




// import {useState ,useEffect} from 'react'
// import axios from 'axios';

// function Screen() {
//   const [products, setProducts] = useState([]);
//   const [speciality, setSpeciality] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response1 = await axios.get('http://localhost:8181/products');
//         const response2 = await axios.get('http://localhost:8181/speciality');
//         setProducts(response1.data);
//         console.log(response1.data);
//         setSpeciality(response2.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//     return (
//         <div className=''>
//         <div className='flex flex-row h-42 '>
//             <div className='bg-gray-300 min-w-44 m-1 border-2 border-gray-500'>
//                 <div className='mr-2 pl-24 text-lg font-medium'>Products</div>
//                 <div className='ml-2 pt-10 text-lg text-left font-medium'>Speciality</div>
//             </div>
//             {products.map((ele,index)=>
//                             <div key={index} className=' bg-gray-300 min-w-16 m-1 pt-10 border-2 border-gray-500 '>
//                                 <p className='justify-between -rotate-90'>{ele.name}</p>
//                             </div>
//             )}
//         </div>
//         <div>
//             {speciality.map((ele, rowIndex) => (
//                 <div key={rowIndex} className="flex flex-row items-center">
//                     <div className="min-w-44 h-16 m-1 bg-gray-300 pt-5 border-2 border-gray-500">{ele.name}</div>
//                     {products.map((product, colIndex) => (
//                         <div
//                         key={colIndex}
//                         className={`min-w-16 h-16 mr-1 ml-1 ${ele.productsId.toString().includes(product.id)?'bg-orange-300':'bg-slate-300'}`}
//                         ></div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     </div>

//     );
// }

// export default Screen;

// function Screen() {
//     return (
//         <div>
//             <div className='flex m-1'>
//                 <div className='mr-1 mb-1 flex-initial bg-gray-400 h-24 w-72 text-center'>
//                     <div className='mt-3 mr-3 text-right'>Product</div>
//                     <div className='mt-3 text-left ml-2'>Speciality</div>
//                 </div>
//                 {products.map((item) => (
//                     <div key={item.id} className='bg-gray-400  h-20 w-64 text-center rotate -rotate-90'>{item.name}</div>
//                 ))}

//             </div>
//             <div className=' flex flex-col float-left mr-4 m-1 '>
//                 {speciality.map((item) => (
//                     <div key={item.id} className='mt-2 bg-gray-400 h-12 w-28 text-center'>{item.name}</div>
//                 ))}

//             </div>

//             <div className={`grid  grid-flow-row grid-cols-11 grid-rows-10 gap-2 mt-2`}>
//                 {speciality.map((specialityItem, rowIndex) => (
//                     products.map((productItem, colIndex) => (
//                         <div
//                             key={`${rowIndex}-${colIndex}`}
//                             className={`ml-1 p-2 h-12 w-20 ${specialityItem.productsId.includes(productItem.id)
//                                     ? "bg-orange-300"
//                                     : "bg-gray-50"
//                                 }`}
//                         >
//                             {productItem.id}
//                         </div>
//                     ))
//                 ))}
//             </div>
//         </div>

//     );
// }

// export default Screen;


