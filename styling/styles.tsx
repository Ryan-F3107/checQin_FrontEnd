import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    startContainer: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center'
    },
    signInBtn: {
        borderColor: '#04074d',
        backgroundColor: '#04074d',
        borderWidth: 1.5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
    },
    createAccountBtn: {
        borderColor: '#04074d',
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
    homeContainer: {
        flex: 1,
        backgroundColor: '#fafafa'
    }, title: {
        fontSize: 28,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 30
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
    businessLabels: {
        fontSize: 15,
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
        paddingTop: (Platform.OS === 'ios') ? 3 : 0,
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
        paddingBottom: 76,
        backgroundColor: '#fafafa'
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#0a0540',
        padding: 15,
        width: 120,
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
    }

})

export default styles;