import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import {
  ProfileUserIcon,
  WalletIcon,
  BankIcon,
  ShieldIcon,
  ShieldCheckIcon,
  QuestionIcon,
  LockIcon,
  ChevronRightIcon
} from '../../Icons/MoreScreenIcons';

const MoreScreen = () => {
  const navigation = useNavigation();

  const MenuItem = ({ icon: Icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon size={24} color="#1E1E1E" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <ChevronRightIcon size={20} color="#9E9E9E" />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.safeArea}>
      <CustomHeader variant="internal" title="" onLeftPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileIconContainer}>
            <Text style={styles.profileIconText}>TH</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>TONY'S HOUSE</Text>
            <Text style={styles.profileSubtitle}>@WadeWarren</Text>
          </View>
        </View>

        {/* Personal Info Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          <MenuItem icon={ProfileUserIcon} title="Profile" onPress={() => { }} />
          <MenuItem icon={WalletIcon} title="Payment History" onPress={() => { }} />
          <MenuItem icon={BankIcon} title="Bank Info" onPress={() => { }} />
        </View>

        {/* About Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <MenuItem icon={ShieldIcon} title="Legal and Policies" onPress={() => { }} />
          <MenuItem icon={QuestionIcon} title="Help & Support" onPress={() => { }} />
          <MenuItem icon={QuestionIcon} title="FAQ" onPress={() => { }} />
        </View>

        {/* Security Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Security</Text>
          <MenuItem icon={LockIcon} title="Change Password" onPress={() => { }} />
          <MenuItem icon={ShieldCheckIcon} title="Security" onPress={() => { }} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  container: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#AADAFF', // fallback, actually it seems white in the image with green icon
  },
  // the design is white
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  profileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E9A55',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileIconText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1E1E1E',
    marginLeft: 16,
    fontWeight: '500',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#FF5722',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: '#FF5722',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoreScreen;
