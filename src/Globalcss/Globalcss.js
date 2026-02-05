import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    width: 240, // Match SVG width to allow precise badge alignment
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
    marginTop: -15, // Overlap slightly or position close to text
    transform: [{ translateX: 10 }], // Slight offset to the right if needed, or remove
  },
  supplierText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize', // "Supplier" is usually Title Case or Uppercase. Prompt says "Supplier".
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
    backgroundColor: '#F8F9FE', // Light background from image
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
    borderRadius: 30, // Rounded pill shape as seen in image
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
    borderColor: '#FF5722', // Match brand color
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
    backgroundColor: '#FF4500', // Vibrant Red/Orange
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
    backgroundColor: '#00C853', // Green color from image
  },
  inactiveStep: {
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800', // Very bold
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  uploadContainer: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#FF7043',
    borderStyle: 'dashed',
    borderRadius: 15, // Match rounded look
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
    backgroundColor: '#FFF3E0', // Light orange bg
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
});
