import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [secureEntryCurrent, setSecureEntryCurrent] = useState(true);
  const [secureEntryNew, setSecureEntryNew] = useState(true);
  const [secureEntryReenter, setSecureEntryReenter] = useState(true);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.restaurantName}>TAT</Text>
        <Text style={styles.slogan}>Restaurant</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.profileText}>Profile</Text>

      {/* Password Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Password:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            secureTextEntry={secureEntryCurrent}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntryCurrent(!secureEntryCurrent)}>
            <FontAwesome name={secureEntryCurrent ? 'eye-slash' : 'eye'} size={20} color="grey" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>New password:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry={secureEntryNew}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntryNew(!secureEntryNew)}>
            <FontAwesome name={secureEntryNew ? 'eye-slash' : 'eye'} size={20} color="grey" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Re-enter password:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter new password"
            secureTextEntry={secureEntryReenter}
            value={reenterPassword}
            onChangeText={setReenterPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntryReenter(!secureEntryReenter)}>
            <FontAwesome name={secureEntryReenter ? 'eye-slash' : 'eye'} size={20} color="grey" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation (Mockup for visual reference) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FAF1E6',
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    height: 120,
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 60,
    position: 'absolute', // Đặt logo ở vị trí tuyệt đối
    top: 20,
    left: 20, 
  },
  restaurantName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#CC3300',
    fontFamily: 'Clicker-Script',
  },
  slogan: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: '#CC3300',
  },
  profileText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F4A950',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#F4A950',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
