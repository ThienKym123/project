import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { addPurchase } from '../redux/userSlice';
import { useNavigation } from '@react-navigation/native';
import OrderSummary from '../components/OrderSummary'; // Import the new component

export default function PaymentScreen() {
  const [showQR, setShowQR] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    const purchaseDetails = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalAmount,
      date: new Date().toISOString(),
      customerInfo: {
        name: name,
        address: address,
        phone: phone
      }
    };
    
    dispatch(addPurchase(purchaseDetails));
    dispatch(clearCart());
    setShowQR(true);
  };

  const handleDone = () => {
    setShowQR(false);
    navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.sname}> TAT </Text>
          <Text style={styles.restaurantName}> Restaurant</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.paymentText}>Payment</Text>

        <OrderSummary items={cartItems} totalAmount={totalAmount} />

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Address:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Your address" 
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.infoLabel}>Phone:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Your phone number" 
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={styles.infoLabel}>Name:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={showQR}
          animationType="fade"
          onRequestClose={() => setShowQR(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.qrContainer}>
              <Image source={require('../assets/qr.png')} style={styles.qrImage} />
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: '#FAF1E6',
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 60,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  sname: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: '900',
    color: '#CC3300',
    fontFamily: 'Clicker-Script',
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
  },
  backText: {
    fontSize: 18,
    color: '#F4A950',
  },
  paymentText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4A950',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  confirmButton: {
    backgroundColor: '#F4A950',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  confirmText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: 10,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#F4A950',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  doneText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
