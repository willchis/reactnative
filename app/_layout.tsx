
import { StyleSheet, View } from "react-native";

import Index from "@/app/index";

export default function RootLayout() {
  return (
    <View style={
      styles.container 
    }>
      <Index/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    backgroundColor: 'black',
  },
});
