import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToPayment = () => {
    navigation.navigate('Payment', { cartItems, totalAmount });
  };

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onRemove={() => dispatch(removeFromCart(item.id))}
      onUpdateQuantity={(quantity) => dispatch(updateQuantity({ id: item.id, quantity }))}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.sname}> TAT </Text>
          <Text style={styles.restaurantName}> Restaurant</Text>
        </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.cartTitle}>Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <Text style={styles.totalPrice}>Total price: ${totalAmount.toFixed(2)}</Text>
          <View style={styles.footer}>
            
            <TouchableOpacity style={styles.paymentButton} onPress={handleProceedToPayment}>
              <Text style={styles.paymentButtonText}>Payment</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: '#FAF1E6',
    width: '100%',
    height: 120,
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
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4A950',
    textAlign: 'center',
    marginVertical: 20,
  },
  cartList: {
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'right',
    marginRight: 10,
  },
  paymentButton: {
    backgroundColor: '#F4A950',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  paymentButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCart: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CartScreen;
