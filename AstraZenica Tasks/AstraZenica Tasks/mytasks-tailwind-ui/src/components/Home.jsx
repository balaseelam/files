import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TfiMenuAlt } from "react-icons/tfi";
import SideNavbar from '@Components/SideNavbar';
import NewForm from '@Components/day1/NewForm';
import Screen from '@Components/day3/Screen';
import NewFormGrid from '@Components/day2/NewFormGrid'
import Screen2 from '@Components/day4/Screen2';
import FilterSort from '@Components/day5/FilterSort';
import ReactMap from '@Components/day6/ReactMap';
import Screen1 from '@Components/day4/Screen1';
import RapidApi from '@Components/day7/RapidApi';
import Activity from './day8/Activity';
import ExcelComp from './day9/ExcelComp';
import Login from './day10/login';
import Register from './day10/Register';

export default function Home() {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <div className="flex bg-lime-300  py-1 w-100">
                <div>
                    <TfiMenuAlt className="cursor-pointer m-2 size-8" onClick={toggleSidebar} />
                </div>

                <div className='text-3xl font-serif m-1.5 text-center'>AstraZeneca Tasks</div>
            </div>
            <div className="container-fluid min-h-screen">
                <div className="flex">
                    <div className={sidebarVisible ? 'w-1/4 h-lvh overflow-auto' : 'hidden'}>
                        <SideNavbar />
                    </div>
                    <div className={`w-${sidebarVisible ? '3/4' : '[100%]'} ml-${sidebarVisible ? '1' : '0'} max-h-lvh`}>
                        <Routes>
                            <Route path='/form' element={<NewForm />} />
                            <Route path='/matrix' element={<Screen />} />
                            <Route path='/formGrid' element={<NewFormGrid />} />
                            <Route path='/matrix-scroll' element={<Screen2 />} />
                            <Route path='/sorting' element={<FilterSort />} />
                            <Route path='/map' element={<ReactMap />} />
                            <Route path='/rapid' element={<RapidApi />} />
                            <Route path='/drag' element={<Activity/>}/>
                            <Route path='/excel' element={<ExcelComp/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}


// import {} from 'react';
// import { Route, Routes } from 'react-router-dom';
// import SideNavbar from './SideNavbar';
// import NewForm from './day1/NewForm';
// import Screen from './day2/Screen';



// export default function Home() {

//     return (
//         <>
//             <div className="bg-lime-300 text-center text-2xl font-fantasy py-1 w-100">AstraZeneca Tasks</div>
//             <div className="container-fluid min-h-screen">
//                 <div className="flex">
//                     <SideNavbar />
//                     <div className='w-3/4 overflow-scroll'>
//                         <Routes>
//                             <Route path='/form' element={<NewForm />} />
//                             <Route path='/matrix' element={<Screen/>}/>
//                         </Routes>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }