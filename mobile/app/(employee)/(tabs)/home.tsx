import { useEffect, useState } from 'react';

import { AntDesign } from '@expo/vector-icons';

import {
  CustomDateFilter,
  DATE_FILTERS,
} from '@/components/app/CustomDateFilter';
import { CustomHeaderFlatList } from '@/components/app/CustomHeaderFlatList';
import { IVendorOrder } from '@/models';
import { getDashboardRawData } from '@/services/Vendor';
import { useAuthStore } from '@/store/authStore';

const Home = () => {
  const { user } = useAuthStore();
  //const [orders, setOrders] = useState<IVendorOrder[]>([]);
  const [dateFilter, setDateFilter] = useState(DATE_FILTERS[0]);
  const [metrics, setMetrics] = useState({
    orders: 0,
  });

  const calculateMetrics = (orders: IVendorOrder[]) => {
    const totalOrders = orders.length;
    let placedOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;
    let totalRevenue = 0;
    let productsList = [];
    let productsCounts: {
      [key: string]: {
        name: string;
        price: number;
        total: number;
      };
    } = {};

    if (orders.length) {
      orders.forEach((order) => {
        if (order.order_status === 'Placed') {
          placedOrders += 1;
        } else if (order.order_status === 'Delivered') {
          deliveredOrders += 1;
        } else if (order.order_status === 'Cancelled') {
          cancelledOrders += 1;
        }

        order.items.forEach((item) => {
          if (productsCounts[item.product.documentId]) {
            productsCounts[item.product.documentId].total += item.quantity;
          } else {
            productsCounts[item.product.documentId] = {
              name: item.product.name,
              price: item.product.price,
              total: item.quantity,
            };
          }
        });
      });

      for (const [documentId, product] of Object.entries(productsCounts)) {
        const productRevenue = product.total * product.price;
        totalRevenue += productRevenue;
        productsList.push({
          documentId,
          name: product.name,
          total: product.total,
          revenue: productRevenue,
        });
      }
    }

    console.log({
      totalOrders,
      placedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      productsList,
    });
  };

  const getData = () => {
    getDashboardRawData(
      user.documentId,
      dateFilter.startDate.toISODate(),
      dateFilter.endDate.plus({ days: 1 }).toISODate()
    ).then((data) => {
      calculateMetrics(data.data);
    });
  };

  useEffect(() => {
    getData();
  }, [dateFilter]);

  return (
    <CustomHeaderFlatList
      title="Dashboard"
      data={[]}
      header={
        <CustomDateFilter
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      }
      noData={{
        icon: <AntDesign name="dashboard" size={80} />,
        text: 'No Metrics Found',
      }}
      //renderItem={() => ()}
    />
  );
};

export default Home;
