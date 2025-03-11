import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryTabs } from "@/components";
const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f5f6fb]">
      <CategoryTabs />
    </SafeAreaView>
  );
};

export default Home;
