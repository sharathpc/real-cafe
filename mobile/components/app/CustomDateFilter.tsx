import { View, Text, Pressable, StyleSheet } from "react-native";
import { DateTime } from "luxon";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";
import { Dispatch } from "react";

export const DATE_FILTERS = [
  {
    id: 1002,
    label: "Today",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  },
  {
    id: 1003,
    label: "This Week",
    startDate: DateTime.now().startOf("week"),
    endDate: DateTime.now(),
  },
  {
    id: 1004,
    label: "This Month",
    startDate: DateTime.now().startOf("month"),
    endDate: DateTime.now(),
  },
  {
    id: 1001,
    label: "Custom",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  },
];

interface Props {
  dateFilter: any;
  setDateFilter: Dispatch<any>;
}

export const CustomDateFilter = ({ dateFilter, setDateFilter }: Props) => {
  return (
    <View>
      <View className="flex-row justify-around">
        {DATE_FILTERS.map((filter) => (
          <Pressable
            key={filter.label}
            className="px-2 py-1 rounded-lg"
            style={{
              backgroundColor:
                dateFilter.id === filter.id ? "#475569" : "#e2e8f0",
            }}
            onPress={() => setDateFilter(filter)}
          >
            <Text className="text-xs font-semibold text-center">
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="my-2 items-center">
        {dateFilter.id !== 1001 ? (
          <View className="flex-row items-center">
            <Text className="text-sm ">
              {dateFilter.startDate.toFormat("LLL dd yyyy")}
            </Text>
            <Fontisto className="mx-4 my-2" name="arrow-right-l" size={24} />
            <Text className="text-sm ">
              {dateFilter.endDate.toFormat("LLL dd yyyy")}
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            <DateTimePicker
              testID="startDatePicker"
              value={dateFilter.startDate.toJSDate()}
              mode="date"
              maximumDate={new Date()}
              style={styles.picker}
              onChange={(_, selectedDate) => {
                if (selectedDate) {
                  setDateFilter({
                    ...dateFilter,
                    startDate: DateTime.fromJSDate(
                      selectedDate
                    ) as DateTime<true>,
                  });
                }
              }}
            />
            <Fontisto className="my-2" name="arrow-right-l" size={24} />
            <DateTimePicker
              testID="endDatePicker"
              value={dateFilter.endDate.toJSDate()}
              mode="date"
              maximumDate={new Date()}
              style={styles.picker}
              onChange={(_, selectedDate) => {
                if (selectedDate) {
                  setDateFilter({
                    ...dateFilter,
                    endDate: DateTime.fromJSDate(
                      selectedDate
                    ) as DateTime<true>,
                  });
                }
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    transform: [{ scale: 0.7 }],
  },
});
