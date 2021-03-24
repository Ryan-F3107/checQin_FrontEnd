import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    startContainer: {
        flex: 1,
        backgroundColor: '#e8efff',
        alignItems: 'center'
    },
    startContainer2: {
        backgroundColor: '#fafafa',
        alignItems: 'center'
    },
    signInBtn: {
        borderColor: '#0a0540',
        backgroundColor: '#0a0540',
        borderWidth: 1.5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
    },
    errorMessage: {
        fontSize: 11,
        paddingBottom: (Platform.OS === 'ios') ? 0 : 10,
        color: 'red'
    },
    createAccountBtn: {
        borderColor: '#0a0540',
        borderWidth: 1.5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
    },
    checkBusinessView: {
        flexDirection: "row",
        marginBottom: 20
    },
    container: {
        flex: 1,
        padding: 70,
        paddingBottom: 20,
        backgroundColor: '#fafafa'
    },
    checkInContainer: {
        flex: 1,
        paddingHorizontal: 50,
        backgroundColor: '#fafafa'
    },
    QRCodeContainer: {
        flex: 1,
        paddingHorizontal: 70,
        backgroundColor: '#fafafa',
        alignSelf: 'center'
    },
    EditQRCodeContainer: {
        flex: 1,
        height: 0,
        paddingHorizontal: 50,
        backgroundColor: '#fafafa',
        alignSelf: 'center'
    },
    homeContainer: {
        flex: 1, paddingBottom: 20,
        backgroundColor: '#fafafa'
    },
    title: {
        fontSize: 28,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 30
    },
    checkInTitle: {
        fontSize: 28,
        paddingTop: 50,
        paddingBottom: 20
    },
    titleTC: {
        fontSize: 26,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 30
    },
    titleBusiness: {
        fontSize: 30,
        paddingTop: 50,
    },
    subTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#002970',
        marginLeft: 5,
        paddingBottom: 20,
        marginBottom: 10
    },
    QRcodeTitle: {
        alignSelf: 'center',
        fontSize: 30,
        paddingBottom: 10
    },
    QRcodeQuestionTitle: {
        fontSize: 20,
        paddingTop: 30,
        paddingBottom: 15,
        fontWeight: 'bold'
    },
    QRcodeAnswer: {
        backgroundColor: '#ebf2ff',
        fontSize: 15,
        paddingBottom: 10,

    },
    businessLabels: {
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 20,
    },
    labelAddress: {
        fontSize: 12,
        paddingTop: 15,
        paddingBottom: 7,
    },
    provLabel: {
        fontSize: 15,
        paddingTop: 15,
        paddingBottom: 7,
    },
    TClabels: {
        fontSize: 15,
        paddingBottom: 7,
    },
    signUpTextInput: {
        paddingTop: (Platform.OS === 'ios') ? 6 : 0,
        backgroundColor: '#fafafa',
    },
    resetPasswordTextInput: {
        paddingTop: (Platform.OS === 'ios') ? 50 : 30,
        backgroundColor: '#fafafa',
    },
    labels: {
        fontSize: 15,
        paddingTop: 50,
        paddingBottom: 10,
    },
    textInputPassword: {
        paddingTop: 16,
        backgroundColor: '#fafafa'
    },
    TCtextInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    textInput: {
        paddingTop: 12,
        backgroundColor: '#fafafa'
    },
    textInputConfirmPassword: {
        paddingTop: 12,
        backgroundColor: '#fafafa'
    },
    checkInCustomerText: {
        paddingTop: 10,
        paddingBottom: 10
    },
    checkCheckInCustomer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#0a0540',
        padding: 15,
        width: 120,
        borderRadius: 25
    },
    NumIncButton: {
        alignSelf: 'center',
        backgroundColor: '#0a0540',
        padding: 10,
        width: 35,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 25
    },
    ViewQRCodebutton: {
        alignSelf: 'center',
        backgroundColor: '#0a0540',
        padding: 15,
        width: 150,
        marginBottom: 40,
        borderRadius: 25
    },
    BusinessNextButton: {
        alignSelf: 'center',
        backgroundColor: '#0a0540',
        padding: 15,
        width: 90,
        marginTop: 10,
        borderRadius: 25
    },
    isBusinessText: {
        paddingTop: 5,
        paddingBottom: 10
    },
    QRViewbutton: {
        flex: 1,
        marginBottom: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BusinessViewbutton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BusinessViewQR: {
        bottom: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BusinessCheckInBtn: {
        flexDirection: 'row',
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: 'grey',
        borderRadius: 30,
        marginBottom: 20
    },
    BusinessButton: {
        flexDirection: 'row',
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: 'grey',
        borderRadius: 30,
        marginBottom: 20
    },
    BusinessButtonText: {
        marginTop: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollview: {
        borderColor: '#e3e3e3',
        backgroundColor: '#f3f2f5',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10,
        padding: 5,
    },
    buttonTC: {
        backgroundColor: '#0a0540',
        padding: 15,
        marginRight: 35,
        marginLeft: 35,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 25
    },
    menuButton: {
        alignSelf: 'flex-end',
        marginTop: 40
    },
    helpButton: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 40
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 40
    },
    deleteAccount: {
        marginBottom: (Platform.OS === 'android') ? 400 : 430,
    }, qrCodeText: {
        fontSize: 15,
        alignSelf: 'center'
    },
    viewAndroidOnly: {
        borderWidth: (Platform.OS === 'android') ? 1 : 0,
        borderRadius: (Platform.OS === 'android') ? 4 : 0,
        borderColor: (Platform.OS === 'android') ? 'grey' : 'transparent'
    },
    editProfileLabels: {
        fontSize: 15,
        marginTop: 15,
        marginBottom: -8,
        color: '#0a0540'
    },
    pickerTitle: {
        marginTop: 5,
        marginBottom: (Platform.OS === 'android') ? 0 : -10,
        color: '#0a0540'
    }

})

export default styles;