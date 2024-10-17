import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';

export default function CartScreen({ route }) {
  const { data } = route.params || {};
  const propertyListing = data?.data?.data?.propertyListing || [];
  const logoutIcon = require('../assets/images/logoutIcon.png'); 
  const backIcon = require('../assets/images/left.png'); 

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation(); // Navigation hook

  const openImageModal = (images, index) => {
    setSelectedImages(images);
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImages([]);
    setCurrentIndex(0);
  };

  const goToPreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextImage = () => {
    if (currentIndex < selectedImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const openMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error("Failed to open maps", err));
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handlePhoneNumberClick = (phoneNumber) => {
    Alert.alert(
      "Contact Options",
      "Choose an option",
      [
        {
          text: "Call",
          onPress: () => Linking.openURL(`tel:${phoneNumber}`), // Initiates a call
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <ScrollView horizontal style={styles.imageScroll}>
        {item.property_images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => openImageModal(item.property_images, index)}>
            <Image source={{ uri: image.image_url }} style={styles.largeImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.description}</Text>
        <Text style={styles.itemDetail}>Rent: ₹{item.rent}</Text>
        <TouchableOpacity onPress={() => handlePhoneNumberClick(item.user_detail.phone_number)}>
          <Text style={styles.itemDetail}>Phone: {item.user_detail.phone_number}</Text>
        </TouchableOpacity>
        <Text style={styles.itemDetail}>User Type: {item.user_detail.user_type}</Text>
        <Text style={styles.itemDetail}>Bedrooms: {item.bedroom}</Text>
        <Text style={styles.itemDetail}>Washrooms: {item.washroom}</Text>
        <Text style={styles.itemDetail}>Furnished: {item.furnished_id === 1 ? 'Yes' : 'No'}</Text>
        <Text style={styles.itemDetail}>Parking: {item.car_parking === 1 ? 'Yes' : 'No'}</Text>
        <Text style={styles.itemDetail}>Floor: {item.floor}</Text>
        <Text style={styles.itemDetail}>Brokerage: ₹{item.brokerage} ({item.brokerage_fees_type})</Text>
        <Text style={styles.itemDetail}>Food Availability: {item.food_availability}</Text>
        <Text style={styles.itemDetail}>Address: {item.address}</Text>
        <Text style={styles.itemDetail}>Full Address: {item.full_address}</Text>

        <TouchableOpacity style={styles.mapButton} onPress={() => openMaps(item.lati, item.longi)}>
          <Text style={styles.mapButtonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={backIcon} style={styles.logoutIcon} />

      </TouchableOpacity>

      {propertyListing.length > 0 ? (
        <FlatList data={propertyListing} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
      ) : (
        <Text>No properties available.</Text>
      )}

      <View style={styles.modalContent}>
        {selectedImages.length > 0 && (
          <Image source={{ uri: selectedImages[currentIndex].image_url }} style={styles.fullScreenImage} />
        )}

        <View style={styles.navigationContainer}>
          {isModalVisible && <TouchableOpacity onPress={goToPreviousImage} style={styles.arrowButton} disabled={currentIndex === 0}>
            <Text style={styles.arrowText}>&lt;</Text>
          </TouchableOpacity>}
          {isModalVisible && <TouchableOpacity onPress={goToNextImage} style={styles.arrowButton} disabled={currentIndex === selectedImages.length - 1}>
            <Text style={styles.arrowText}>&gt;</Text>
          </TouchableOpacity>}
        </View>

        {isModalVisible && <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image source={logoutIcon} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    backgroundColor: '#f8f8f8',
    marginTop: 65,
  },
  backButton: {
    marginBottom: 1,
    padding: 10,
    borderRadius: 5,
    top : -40
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  imageScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  largeImage: {
    width: 300,
    height: 200,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  mapButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    opacity: 0.7,
  },
  arrowText: {
    color: '#fff',
    fontSize: 20,
  },
  logoutIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoutButton: {
    position: 'absolute',
    top: -700,
    right: -16,
    backgroundColor: 'transparent',
    padding: 10,
  },
});
