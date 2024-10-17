import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [propertyId, setPropertyId] = useState(''); // For the input field
  const [data, setData] = useState(null); // For storing property data
  const [loading, setLoading] = useState(false); // For showing loading state
  const navigation = useNavigation();
  const backgroundImage = require('../assets/images/om.jpeg'); // Adjust the path based on your structure
  const logoutIcon = require('../assets/images/logoutIcon.png'); // Path to your logout icon image

  // Function to fetch property data
  const fetchPropertyData = async () => {
    if (!propertyId) {
      alert('Please enter a property ID');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://www.letsrentz.com/getPropertyWithPID?pid=${propertyId}`);
      if (response.data.data.propertyListing.length === 0) {
        setLoading(false);
        Alert.alert(
          'No Property Found',
          'No property found for the given PID.',
          [{ text: 'Okay', onPress: () => console.log('Alert closed') }]
        );
      } else {
        setData(response.data); // Store data for later use
        setLoading(false);
        navigation.navigate('Cart', { data: response });
      }
    } catch (error) {
      console.error("Error fetching property data: ", error);
      setLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Navigate back to Login screen
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.heading}>Enter Property ID</Text>

        {/* Input field for Property ID */}
        <TextInput
          style={styles.input}
          placeholder="Enter Property ID"
          value={propertyId}
          onChangeText={setPropertyId}
          keyboardType="numeric"
        />

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={fetchPropertyData}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Show loader if data is being fetched */}
        {loading && <Text>Loading...</Text>}

        {/* Logout button with icon */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image source={logoutIcon} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: 390,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute', // Position it absolutely
    top: 40, // Adjust the top position
    right: 20, // Adjust the right position
    backgroundColor: 'transparent', // Optional: make the background transparent
    padding: 10, // Add some padding around the icon
  },
  logoutIcon: {
    width: 30, // Set the width of the icon
    height: 30, // Set the height of the icon
    resizeMode: 'contain', // Ensure the icon is contained within the specified dimensions
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(248, 248, 248, 0.7)', // Add some transparency to the overlay
  },
});

export default HomeScreen;
