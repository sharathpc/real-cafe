import { View, Image, StyleSheet } from "react-native";
import { memo, useMemo } from "react";
import { imageData } from "@/utilis";
import AutoScroll from "@homielab/react-native-auto-scroll";

export const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    console.log("results", result);
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        endPaddingWidth={0}
        duration={10000}
        style={styles.autoScroll}
      >
        <View className="justify-center items-center overflow-visible">
          {rows?.map((row: any, index: number) => {
            return <MemoizedRow key={index} row={row} rowIndex={index} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

interface RowProps {
  row: typeof imageData;
  rowIndex: number;
}

const Row = ({ row, rowIndex }: RowProps) => {
  return (
    <View key={Math.random()} className="flex-row mb-3">
      {row?.map((image: any, imageIndex: number) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            className="mb-3 mx-3 w-[26vw] h-[26vw] bg-[#e5f4ff] justify-center rounded-3xl items-center"
            style={{ transform: [{ translateX: horizontalShift }] }}
          >
            <Image
              source={image}
              key={imageIndex}
              className="w-full h-full object-contain"
            />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = memo(Row);

const styles = StyleSheet.create({
  autoScroll: {
    position: "absolute",
    zIndex: -2,
  },
});
