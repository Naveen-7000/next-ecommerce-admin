export const Login = (signIn) => {
    return (
        <div className="bg-blue-900 w-screen h-screen flex items-center">
        {/* create a button and make it in center of screen */}
        <div className="w-full text-center">
         <button onClick={()=>signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with google</button>
        </div>
       </div>
    )
}