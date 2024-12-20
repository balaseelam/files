import { Link, useLocation } from 'react-router-dom';

export default function SideNavBar() {
  const location = useLocation();

  const handleClick = (e) => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.remove('active');
    });
    e.target.classList.add('active');
  };

  return (
    <nav className="mt-1 bg-light h-screen border border-black">
      <div className="sidebar-sticky">
        <ul className="flex flex-col bg-purple-300 p-0">
          <li className={`py-1 my-0 border-b border-gray-200 ${location.pathname === '/form' ? 'bg-purple-400' : ''}`}>
            <Link to="/form" className="nav-link px-4 m-0 text-base" onClick={handleClick}>
              Task1
              <p className='text-sm m-0 '>Description: Form Using flex</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/formGrid' ? 'bg-purple-400' : ''}`}>
            <Link to="/formGrid" className="nav-link px-4" onClick={handleClick}>
              Task2
              <p className='text-sm m-0 '>Description: Form Using Grid</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/matrix' ? 'bg-purple-400' : ''}`}>
            <Link to="/matrix" className="nav-link px-4" onClick={handleClick}>
              Task3
              <p className='text-sm m-0 '>Description: Matrix</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/matrix-scroll' ? 'bg-purple-400' : ''}`}>
            <Link to="/matrix-scroll" className="nav-link px-4" onClick={handleClick}>
              Task4
              <p className='text-sm m-0 '>Description: Matrix X-Scroll Y-scroll using Google Api</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/sorting' ? 'bg-purple-400' : ''}`}>
            <Link to="/sorting" className="nav-link px-4" onClick={handleClick}>
              Task5
              <p className='text-sm m-0 '>Description: Sorting ang Filtering</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/map' ? 'bg-purple-400' : ''}`}>
            <Link to="/map" className="nav-link px-4" onClick={handleClick}>
              Task6
              <p className='text-sm m-0 '>Description: Google Map Api</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/rapid' ? 'bg-purple-400' : ''}`}>
            <Link to="/rapid" className="nav-link px-4" onClick={handleClick}>
              Task7
              <p className='text-sm m-0 '>Rapid Api</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/drag' ? 'bg-purple-400' : ''}`}>
            <Link to="/drag" className="nav-link px-4" onClick={handleClick}>
              Task8
              <p className='text-sm m-0'>Drag Drop with Animations</p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/excel' ? 'bg-purple-400' : ''}`}>
            <Link to="/excel" className="nav-link px-4" onClick={handleClick}>
              Task9
              <p className='text-sm m-0'>modal popup with dropdown and file upload </p>
            </Link>
          </li>
          <li className={`py-2 border-b border-gray-200 ${location.pathname === '/login' ? 'bg-purple-400' : ''}`}>
            <Link to="/login" className="nav-link px-4" onClick={handleClick}>
              Task10
              <p className='text-sm m-0'>clone of facebook </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
