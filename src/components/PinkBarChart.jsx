import { View, Text } from 'react-native';

const PinkBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
    // Have to make the bottom 
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", height: 200 }}>
      {data.map((item, index) => {
        // Normalize the height
        const height = (item.value / max) * 180;

        return (
          <View key={index} style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: 18,
                height,
                backgroundColor: "#ff6b7a",
                borderTopRightRadius: 6,
                borderTopLeftRadius: 6
              }}
            />
            <Text style={{ fontSize: 10, marginTop: 4, color: "#7a2a35" }}>
              {index}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default PinkBarChart;