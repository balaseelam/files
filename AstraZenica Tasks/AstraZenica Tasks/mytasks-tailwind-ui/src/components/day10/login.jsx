import React from 'react'

function Login() {
    return (
        <>
        <div className="h-[600px] w-[100%] flex bg-gray-100 m-auto justify-center items-center">
            <div className="left w-2/5 m-14">
                <img className="w-60" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="facebookimg"></img>
                <p className="text-4xl mx-3">Facebook helps you connect and share with the people in your life.</p>
            </div>
            <div className="right flex flex-col bg-white p-8 rounded-xl w-1/4">
                <input className="px-4 h-12 my-2 border border-1 border-gray-200 rounded-lg hover:border-blue-400" type="text" placeholder="Enter Address or Phone Number" />
                <input className="px-4 h-12 my-2 border border-1 border-gray-200 rounded-lg  hover:border-blue-400" type="password" placeholder="Password" />
                <button className="bg-blue-600 text-white my-2 py-3 rounded-lg " type="button">Login</button>
                <span className="text-blue-400 my-2 hover:underline cursor-pointer text-center">Forgotten Password?</span>
                <hr></hr>
                <button className="bg-green-600 text-white my-2 py-3 rounded-lg">Create Account</button>

            </div>

        </div>
        </>
    )
}

export default Login
