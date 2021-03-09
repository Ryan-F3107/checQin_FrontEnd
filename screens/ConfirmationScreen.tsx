import React from 'react';
import { Text, View } from 'react-native';

class ConfirmationScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.route.params.accountType == "customer") {
                this.props.navigation.replace('Home');

            } else if (this.props.route.params.accountType == "business") {
                this.props.navigation.replace('HomeBusiness');
            }
        }, 800);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fafafa'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#002970'
                }}> Saved Successfully! </Text>
            </View>
        )

    }
}

export default ConfirmationScreen;