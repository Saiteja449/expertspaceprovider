import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // --- Original Styles ---
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 50,
    width: 240,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  supplierBadge: {
    backgroundColor: '#FF1744',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 2,
    alignSelf: 'flex-end',
    marginTop: -15,
    transform: [{ translateX: 10 }],
  },
  supplierText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tagline: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 28,
    maxWidth: width * 0.8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  // Login Screen Styles
  loginContainer: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  loginScrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 4,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#FF5722',
  },
  rememberText: {
    fontSize: 14,
    color: '#333333',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#FF4500',
    borderRadius: 30,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#FF4500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  createAccountText: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: '700',
    marginLeft: 5,
  },
  // Signup Screen Styles
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 20,
    width: '100%',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeStep: {
    backgroundColor: '#00C853',
  },
  inactiveStep: {
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  uploadContainer: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#FF7043',
    borderStyle: 'dashed',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  uploadIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadTextContainer: {
    alignItems: 'center',
  },
  uploadMainText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  uploadSelectText: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: '700',
  },
  uploadSubText: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // --- New Dashboard Styles ---

  // Main Layout
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },

  // Dashboard Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  statsCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statsContent: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  // Charts Section
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 20,
    padding: 16,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  timeFilter: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Tabs (Orders/Inventory)
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  pillTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activePillTab: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  pillText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activePillText: {
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  activeBadgeText: {
    color: '#000',
  },

  // List Items
  listItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#FFECB3',
  },
  statusText: {
    fontSize: 12,
    color: '#FF8F00',
    fontWeight: '600',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDetailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#00C853',
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF1744',
    marginLeft: 8,
  },
  acceptText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rejectText: {
    color: '#FF1744',
    fontWeight: '600',
  },

  // Inventory
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  productCardContent: {
    flex: 1,
  },
  viewProductBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  // --- Add Product Screen Styles ---
  dashBorderContainer: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FF5722',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  uploadCircleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dimensionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionInput: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF4500',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  outlineButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FF4500',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  outlineButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF4500',
  },
});
