import Layout from "@/component/Layout";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import axios from "axios";
import { dailyRevenue,monthlyRevenue, weeklyRevenue, getOrderCountByDay, getOrderCountByMonth, getOrderCountByWeek } from "@/lib/utils";

export default function Home() {
  const {data: session} = useSession();
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

const orderByDay = getOrderCountByDay(orders);
const orderByMonth = getOrderCountByMonth(orders);
const orderByWeek = getOrderCountByWeek(orders);

const revenueByDay = dailyRevenue(orders);
const revenueByMonth = monthlyRevenue(orders);
const revenueByWeek = weeklyRevenue(orders);
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="logo" className="w-6 h-6"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
    {/* i want orders details cards like Today, This week, and This month */}
    <div className="mt-12">
    <h2 className="text-xl text-gray-800 font-semibold my-2">Orders</h2>
    <div className="grid grid-cols-3 gap-9">
      <div className="bg-white rounded-sm p-4 text-center shadow-lg">
        <h1 className="text-gray-800 text-xl font-semibold">TODAY</h1>
        <p className="text-blue-900 text-2xl font-semibold mb-4">{orderByDay}</p>
        <p className="text-gray-900 font-medium">{orderByDay} orders today</p>
      </div>
      <div className="bg-white rounded-sm p-4 text-center shadow-lg">
        <h1 className="text-gray-800 text-xl font-semibold">THIS WEEK</h1>
        <p className="text-blue-900 text-2xl font-semibold mb-4">{orderByWeek}</p>
        <p className="text-gray-900 font-medium">{orderByWeek} orders this week</p>
      </div>
      <div className="bg-white rounded-sm p-4 text-center shadow-lg">
        <h1 className="text-gray-800 text-xl font-semibold">THIS MONTH</h1>
        <p className="text-blue-900 text-2xl font-semibold mb-4">{orderByMonth}</p>
        <p className="text-gray-900 font-medium">{orderByMonth} orders this month</p>
      </div>
    </div>
    </div>
    {/* i want the same cards to be used for revenue */}
    <div className="mt-12">
    <h2 className="text-xl text-gray-800 font-semibold my-2">Revenue</h2>
    <div className="grid grid-cols-3 gap-9">
      <div className="bg-white rounded-sm p-4 text-center shadow-lg">
        <h1 className="text-gray-800 text-xl font-semibold">TODAY</h1>
        <p className="text-blue-900 text-2xl font-semibold mb-4">{revenueByDay}</p>
        <p className="text-gray-900 font-medium">{orderByDay} orders today</p>
      </div>
      <div className="bg-white rounded-sm p-4 text-center shadow-lg">
        <h1 className="text-gray-800 text-xl font-semibold">THIS WEEK</h1>
        <p className="text-blue-900 text-2xl font-semibold mb-4">{revenueByWeek}</p>
        <p className="text-gray-900 font-medium">{orderByWeek} orders this week</p>
      </div>
      <div className="bg-white rounded-sm p-4 text-center shadow-lg">
        <h1 className="text-gray-800 text-xl font-semibold">THIS MONTH</h1>
        <p className="text-blue-900 text-2xl font-semibold mb-4">{revenueByMonth}</p>
        <p className="text-gray-900 font-medium">{orderByMonth} orders this month</p>
      </div>
    </div>
    </div>
  </Layout>
}