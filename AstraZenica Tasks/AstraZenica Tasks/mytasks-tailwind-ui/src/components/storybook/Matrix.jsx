function Matrix({ products, speciality, containerRef, onScroll }) {
    if (products.length <= 0 || speciality.length <= 0) {
        return <div>No Data Found</div>
    }
    return (
        <div className='m-1 overflow-auto max-h-[100vh] max-w-[100%] border-2 border-black' ref={containerRef} onScroll={onScroll}>
            <div className='flex flex-row h-42'>
                <div className='bg-gray-300 min-w-44 m-1 border-2 border-gray-500'>
                    <div className='mr-2 pl-24 text-lg font-medium'>Products</div>
                    <div className='ml-2 pt-10 text-lg text-left font-medium'>Speciality</div>
                </div>
                {products.map((ele, index) =>
                    <div key={index} className=' bg-gray-300 min-w-16 m-1 pt-10 border-2 border-gray-500 '>
                        <p className='justify-between -rotate-90'>{ele.name}</p>
                    </div>
                )}
            </div>
            <div>
                {speciality.map((ele, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row items-center">
                        <div className="min-w-44 h-16 m-1 bg-gray-300 pt-5 border-2 border-gray-500">{ele.name}</div>
                        {products.map((product, colIndex) => (
                            <div
                                key={colIndex}
                                className={`min-w-16 h-16 mr-1 ml-1 ${ele.productsId.toString().includes(product.id) ? 'bg-orange-300' : 'bg-slate-300'}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Matrix;
