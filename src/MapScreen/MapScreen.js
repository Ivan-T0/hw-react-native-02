import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Feather";

export default function MapScreen({ route }) {
  const { cords } = route.params;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View style={styles.buttonGoBack}>
        <TouchableOpacity onPress={goBack}>
          <Icon name={"arrow-left"} size={24} color={"#FF6C00"} />
        </TouchableOpacity>
      </View>
      <MapView
        style={{ flex: 1 }}
        region={{
          ...route,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <Marker coordinate={route} title="travel photo" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGoBack: {
    position: "absolute",
    top: 50,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    borderRadius: 10,
  },
});
