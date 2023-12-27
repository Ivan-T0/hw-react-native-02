import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import * as Location from "expo-location";

export default function CreatePostsScreen({ route, navigation }) {
  const cameraRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(null);

  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  const takePhoto = async () => {
    try {
      if (cameraRef.current) {
        const options = { quality: 0, base64: true };
        const photoData = await cameraRef.current.takePictureAsync(options);
        const base64Data = await FileSystem.readAsStringAsync(photoData.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setPhoto(`data:image/jpeg;base64,${base64Data}`);
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const [address] = await Location.reverseGeocodeAsync(location.coords);

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const { city, country, latitude, longitude } = address;
        setLocation(`${city}, ${country}`);
        setCoords(coords);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status: cameraPerm } =
          await Camera.requestCameraPermissionsAsync();
        let { status: locationPerm } =
          await Location.requestForegroundPermissionsAsync();
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    const existPosts = route.params?.posts ?? [];
    const newPost = { photo, coords: { ...coords }, location, name };
    setPhoto(null);
    setLocation(null);
    setName(null);

    navigation.navigate("PostsScreen", {
      ...route.params,
      posts: [...existPosts, newPost],
    });
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  const isDisabledSubmit = !photo || !location || !name;

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.cameraContainer}>
          {photo ? (
            <Image
              style={{ borderRadius: 10, width: "100%", height: 240 }}
              source={{ uri: photo }}
            />
          ) : (
            <Camera
              ref={cameraRef}
              type={Camera.Constants.Type.back}
              style={styles.camera}
            >
              <View style={styles.photo}>
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.cameraButton}
                >
                  <Icon name="camera" color={"#BDBDBD"} size={24} />
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>

        {photo ? (
          <Text style={[styles.text, { marginBottom: 33 }]}>
            Редагувати фото
          </Text>
        ) : (
          <Text style={[styles.text, { marginBottom: 33 }]}>
            Завантажте фото
          </Text>
        )}

        <TextInput
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          onChangeText={setName}
          value={name}
          style={styles.input}
        />

        <View style={{ position: "relative", marginTop: 16 }}>
          <TextInput
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            paddingLeft={28}
            onChangeText={setLocation}
            value={location}
            style={styles.input}
          />
          <Icon
            style={styles.mapPinPosition}
            name="map-pin"
            color={"#BDBDBD"}
            size={24}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSubmit}
          disabled={isDisabledSubmit}
          $isDisabled={isDisabledSubmit}
          style={[
            styles.button,
            {
              backgroundColor:
                photo && name && location ? "#FF6C00" : "#F6F6F6",
            },
          ]}
        >
          <Text style={[styles.text, { color: "#fff" }]}>Опублікувати</Text>
        </TouchableOpacity>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              setPhoto(false);
              setName("");
              setLocation("");
            }}
          >
            <Icon name="trash-2" color={"#DADADA"} size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
    backgroundColor: "white",
  },
  cameraContainer: {
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cameraButton: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 90,
  },
  photo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 170,
    borderColor: "#fff",
    alignItems: "center",
  },
  input: {
    color: "#0e0d0d",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  mapPinPosition: {
    position: "absolute",
    top: 12,
  },
  button: {
    color: "#FF6C00",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 120,
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  iconContainer: {
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
