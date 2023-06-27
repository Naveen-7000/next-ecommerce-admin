import Nav from "@/component/Nav";
import { useSession, signIn, signOut } from "next-auth/react"
import {useState} from "react";
import Logo from "./Logo";

const Layout = ({children})=>{
    const [showNav,setShowNav] = useState(false);
    const { data: session } = useSession();
    if (!session) {
      return (
        <div className="bg-gray-200 w-screen h-screen flex items-center justify-center">
          <div className="text-center w-30  bg-gray-100 rounded-md py-20 px-10 shadow-lg flex justify-between items-center flex-col">
            <Logo/>
            <button onClick={() => signIn('google')} className="border border-1 border-black p-2 px-4 rounded-lg shadow-lg mt-8">Sigin with Google</button>
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-bgGray min-h-screen ">
        <div className="block md:hidden flex items-center p-4">
          <button onClick={() => setShowNav(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex grow justify-center mr-6">
            <Logo />
          </div>
        </div>
        <div className="flex">
          <Nav show={showNav} />
          <div className="flex-grow p-4">
            {children}
          </div>
        </div>
      </div>
    );
}

export default Layout;