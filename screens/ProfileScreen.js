import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../redux/userSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { currentUser, purchaseHistory } = useSelector(state => state.user);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [name, setName] = useState(currentUser?.username || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  const handleSaveName = () => {
    dispatch(setUser({ ...currentUser, username: name }));
    setIsEditingName(false);
  };

  const handleSaveAddress = () => {
    dispatch(setUser({ ...currentUser, address: address }));
    setIsEditingAddress(false);
  };

  const handleSavePhone = () => {
    dispatch(setUser({ ...currentUser, phone: phone }));
    setIsEditingPhone(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  const renderPurchaseItem = ({ item }) => (
    <View style={styles.purchaseItem}>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>Total: ${item.total.toFixed(2)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.sname}> TAT </Text>
          <Text style={styles.restaurantName}> Restaurant</Text>
      </View>
      
      <Text style={styles.profileTitle}>Profile</Text>
      <Text style={styles.username}>Welcome, {currentUser?.username}</Text>
      
      <View style={styles.profileSection}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            editable={isEditingName}
          />
          <TouchableOpacity onPress={isEditingName ? handleSaveName : () => setIsEditingName(true)}>
            <Ionicons
              name={isEditingName ? "checkmark" : "pencil"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Address"
            value={address}
            onChangeText={setAddress}
            editable={isEditingAddress}
          />
          <TouchableOpacity onPress={isEditingAddress ? handleSaveAddress : () => setIsEditingAddress(true)}>
            <Ionicons
              name={isEditingAddress ? "checkmark" : "pencil"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Phone Number"
            value={phone}
            onChangeText={setPhone}
            editable={isEditingPhone}
          />
          <TouchableOpacity onPress={isEditingPhone ? handleSavePhone : () => setIsEditingPhone(true)}>
            <Ionicons
              name={isEditingPhone ? "checkmark" : "pencil"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Purchase History</Text>
      {purchaseHistory.length > 0 ? (
        <FlatList
          data={purchaseHistory}
          renderItem={renderPurchaseItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.purchaseList}
        />
      ) : (
        <Text style={styles.emptyHistory}>No purchase history</Text>
      )}

      <View style={styles.optionsSection}>
        <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.optionText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionRow, styles.logoutRow]} onPress={handleLogout}>
          <Text style={[styles.optionText, styles.logoutText]}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  profileTitle: {
    fontSize: 30,
    color: '#FFA500',
    marginTop: 10,
    textAlign: 'center',
  },
  profileSection: {
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 10,
    fontSize: 16,
    padding: 5,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  purchaseList: {
    maxHeight: 200, // Tùy chỉnh chiều cao để đảm bảo danh sách có thể cuộn
  },
  purchaseItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  emptyHistory: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  optionsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionRow: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutRow: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: 'red',
  },
});
