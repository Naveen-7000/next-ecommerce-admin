import Layout from "@/component/Layout";
import { images } from "@/next.config";
import { useSession } from "next-auth/react";
import Image from "next/image";


export default function Home() {
  const {data:session} = useSession();
  console.log(session);

  return (
    <Layout>
     <div className="text-blue-900 flex justify-between">
      <h2>
      Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className=" flex gap-1 p-2 rounded-md border border-2 border-blue-900 text-black font-medium">
      <Image src={session?.user?.image} alt="user image" width={30} height={30} className="rounded-lg" />
      {session?.user?.name}
      </div>
     </div>
    </Layout>
  )
}
