import { CustomHeaderFlatList } from "@/components/app/CustomHeaderFlatList";
import { AntDesign } from "@expo/vector-icons";

const Dashboard = () => {
  return (
    <CustomHeaderFlatList
      title="Dashboard"
      data={[]}
      noData={{
        icon: <AntDesign name="dashboard" size={80} />,
        text: "No Metrics Found",
      }}
      //renderItem={() => ()}
    />
  );
};

export default Dashboard;
