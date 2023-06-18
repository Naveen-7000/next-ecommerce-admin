import { useSession, signIn, signOut } from "next-auth/react"
import { Login } from "./Login";
import Nav from "@/component/Nav";


const Layout = ({children})=>{
//     const {data : session} = useSession();
//   if (!session) {
//     return (
//       <Login signIn={signIn} />
//     )
//   }
return (
    <div className="bg-blue-900 min-h-screen flex">
        <Nav />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 p-4 rounded-lg">
            {children}
     </div>
    </div>
);
}

export default Layout;