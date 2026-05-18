import {View, Text, StyleSheet} from 'react-native';

const Header = (properties) =>{
    const {headerTitle} = properties;
    return (
        <View style={styles.customHeader}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  customHeader: {
    height: 60,
    backgroundColor: "#fffbf7",
    justifyContent: "center",
    alignItems:"center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0e6dc",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#333",
  },
});


export default Header; 
