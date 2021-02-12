import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    startContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBusinessView: {
        flexDirection: "row",
        marginBottom: 20
    },
    container: {
        flex: 1,
        padding: 70,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    homeContainer: {
        flex: 1,
        //backgroundColor: 'white'
    }, title: {
        fontSize: 30,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 20
    },
    subTitle: {
        fontSize: 15,
        marginLeft: 5,
        paddingTop: 70,
        paddingBottom: 20,
        marginBottom: 20
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
    signUpTextInput: {
        paddingTop: (Platform.OS === 'ios') ? 3 : 0,
        backgroundColor: 'white',
    },
    labels: {
        fontSize: 15,
        paddingTop: 50,
        paddingBottom: 10,
    },
    textInputPassword: {
        paddingTop: 16,
    },
    TCtextInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    textInput: {
        paddingTop: 12,
    }, button: {
        alignSelf: 'center',
        backgroundColor: '#0a0540',
        padding: 15,
        width: 90,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 25,
        shadowColor: 'rgba(1, 1, 1, 0.25)',
        shadowOpacity: 0.9,
        shadowRadius: 13,
        shadowOffset: { width: 1, height: 10 }
    },
    isBusinessText: {
        paddingTop: 8,
        paddingBottom: 10
    }, QRViewbutton: {
        flex: 1,
        marginBottom: 150,
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
    buttonAccept: {
        backgroundColor: '#0a0540',
        padding: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 25,
        shadowColor: 'rgba(1, 1, 1, 0.25)',
        shadowOpacity: 0.9,
        shadowRadius: 13,
        shadowOffset: { width: 1, height: 10 }
    },
    buttonDecline: {
        backgroundColor: '#0a0540',
        padding: 15,
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 25,
        shadowColor: 'rgba(1, 1, 1, 0.25)',
        shadowOpacity: 0.9,
        shadowRadius: 13,
        shadowOffset: { width: 1, height: 10 }
    },
    menuButton: {
        alignSelf: 'flex-end',
        marginTop: 50
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 55
    },
    deleteAccount: {
        marginBottom: (Platform.OS === 'android') ? 370 : 400
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