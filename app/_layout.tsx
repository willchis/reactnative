
import { StyleSheet, Text, View } from "react-native";

import Index from "@/app/index";

export default function RootLayout() {
  return (
    <View style={
      styles.container 
    }>
      <Text style={{color: 'white', fontSize: 30, marginBottom:5}}>FeatherNews</Text>
      <Index/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 40,
    backgroundColor: 'black',
  },
});
