export function getOrderCountByDay(orders) {
  const today = new Date(); // Current date
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const ordersOnDay = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfToday && orderDate < endOfToday;
  });
  return ordersOnDay.length;
}

export function getOrderCountByWeek(orders) {
  const today = new Date(); // Current date
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 7
  );
  const ordersInWeek = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfWeek && orderDate < endOfWeek;
  });
  return ordersInWeek.length;
}

export function getOrderCountByMonth(orders) {
  const today = new Date(); // Current date
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const ordersInMonth = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfMonth && orderDate <= endOfMonth;
  });
  return ordersInMonth.length;
}

const calculateRevenue = (orders, startDate, endDate) => {
  const formatRevenue = (revenue) => {
    if (revenue >= 10000000) {
      return (revenue / 10000000).toFixed(2) + " Cr";
    } else if (revenue >= 100000) {
      return (revenue / 100000).toFixed(2) + " L";
    } else if (revenue >= 1000) {
      return (revenue / 1000).toFixed(2) + "k";
    }
    return revenue;
  };

  const totalRevenue = orders.reduce((totalRevenue, order) => {
    const orderDate = new Date(order.createdAt);
    if (orderDate >= startDate && orderDate <= endDate) {
      const lineItems = order.line_items;
      const orderRevenue = lineItems.reduce(
        (total, item) => total + item.price_data.unit_amount * item.quantity,
        0
      );
      return totalRevenue + orderRevenue;
    }
    return totalRevenue;
  }, 0);

  return formatRevenue(totalRevenue);
};

export function dailyRevenue(orders) {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const dailyRevenue = calculateRevenue(orders, startOfToday, endOfToday);
  return dailyRevenue;
}

export function weeklyRevenue(orders) {
  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 7
  );
  const weeklyRevenue = calculateRevenue(orders, startOfWeek, endOfWeek);
  return weeklyRevenue;
}

export function monthlyRevenue(orders) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const monthlyRevenue = calculateRevenue(orders, startOfMonth, endOfMonth);
  return monthlyRevenue;
}
