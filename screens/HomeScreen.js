import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Feather,
  Ionicons,
  EvilIcons,
  Octicons,
  FontAwesome5,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import axios from "axios";

const HomeScreen = () => {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [like, setLike] = useState(false);
  const [viewImage, setViewImage] = useState("");

  const fetchData = async () => {
    const ImageData = await axios.get(
      "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s"
    );
    setImages(ImageData.data.photos.photo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {viewImage ? (
        <View style={styles.viewImageContainer}>
            <TouchableOpacity onPress={()=>setViewImage("")} >
            <Feather name="x-circle" size={46} color="black" />
            </TouchableOpacity>
          <Image source={{ uri: `${viewImage.url_s}` }} style={styles.viewImageStyle} />   
            <Text style={styles.viewImageText}>{viewImage.title}</Text>
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Ionicons name="image-outline" size={34} color="black" />
            <Text style={styles.headerText}>INSTA-GALLERY</Text>
            <Octicons name="diff-added" size={24} color="black" />
            <FontAwesome5 name="heart" size={24} color="black" />
            <AntDesign name="message1" size={24} color="black" />
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchContainerLeft}>
              <Feather name="search" size={24} color="black" />
              <TextInput
                style={styles.textInput}
                placeholder="search your favourite images"
                autoCapitalize="none"
                value={searchText}
                onChangeText={(e) => setSearchText(e)}
              />
            </View>
            <Ionicons name="send-outline" size={24} color="black" />
          </View>
          <ScrollView
            style={{ flex: 1, width: "100%", paddingTop: 10, marginTop: 10 }}
          >
            <View>
              {images
                .filter((i) =>
                  i.title.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((item, index) => {
                  return (
                    <View style={styles.imageContainer} key={index}>
                      <View style={styles.imageHeaderContainer}>
                        <EvilIcons name="user" size={55} color="black" />
                        <Text style={styles.imageName}>{item.owner}</Text>
                        <Entypo
                          name="dots-three-horizontal"
                          size={24}
                          color="black"
                        />
                      </View>
                      <TouchableOpacity onPress={() => setViewImage(item)}>
                        <Image
                          style={styles.image}
                          source={{ uri: item.url_s }}
                        />
                      </TouchableOpacity>
                      <View style={styles.imageDescriptionContainer}>
                        <Text style={styles.imageDescriptionText}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.imageBottomContainer}>
                        <View style={styles.imageBottomContainerLeft}>
                          <FontAwesome5 name="heart" size={24} color="black" />
                          <Feather
                            name="message-circle"
                            size={24}
                            color="black"
                          />
                          <Feather name="send" size={24} color="black" />
                        </View>
                        <Feather name="bookmark" size={24} color="black" />
                      </View>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  viewImageContainer:{
     flex:1,
     alignItems:"center",
     gap:10,
     backgroundColor:"transparent"
  },
  viewImageStyle:{
    marginTop:20,
     width:400,
     height:500,
     resizeMode:"contain"
  },
  viewImageText:{
     fontSize:20,
     fontWeight:"800",
     textAlign:"center",
     paddingTop:20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    // borderWidth: 0.7,
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchContainerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    fontSize: 16,
  },
  imageContainer: {
    borderWidth: 0.5,
    borderColor: "#000",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  imageHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    paddingRight: 20,
    alignItems: "center",
  },
  imageName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
  },
  imageBottomContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  imageBottomContainerLeft: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    gap: 10,
  },
  imageDescriptionContainer: {
    padding: 10,
  },
  imageDescriptionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
