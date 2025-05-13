import { Image } from "expo-image";
import { View, FlatList, StyleSheet } from "react-native";
import { ImagesDataList } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export const ProductImagesGrid = () => {
  return (
    <MaskedView
      style={styles.container}
      maskElement={
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 1)",
            "rgba(0, 0, 0, 1)",
            "rgba(0, 0, 0, 0)",
          ]}
          style={styles.gradient}
          locations={[0, 0.3, 0.7, 1]}
        />
      }
    >
      <View style={styles.content}>
        {ImagesDataList.map((items, index) => (
          <View key={index}>
            <FlatList
              style={{ height: "70%" }}
              numColumns={1}
              data={items}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              scrollToOverflowEnabled={true}
              renderItem={({ item }) => {
                if (item.source === null) {
                  return (
                    <View style={{ ...styles.card, height: 100 }}>
                      <View style={styles.image} />
                    </View>
                  );
                }
                return (
                  <View style={styles.card}>
                    <Image source={item.source} style={styles.image} />
                  </View>
                );
              }}
            />
          </View>
        ))}
      </View>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
  },
  gradient: {
    flex: 1,
    height: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    height: 160,
    justifyContent: "center",
  },
  image: { width: 100, height: 80 },
});
