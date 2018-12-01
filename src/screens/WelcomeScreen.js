import {Component} from "react";
import { Image, ImageBackground, StyleSheet, View} from "react-native";
import Button from 'react-native-button';
import React from "react";


export default class WelcomeScreen extends Component {
    // Constructor initializes name, phoneNumber, joinCode, and houseName to "".
    constructor(props) {
        super(props);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit_LogIn()
     * When the "LOG IN" button is pressed, this function is called.
     * It simply proceeds to the log in screen.
     */
    handleSubmit_LogIn = () => {
        this.props.navigation.navigate("LogIn");
    };

    /**
     * handleSubmit_SignUp()
     * When the "Sign Up" button is pressed, this function is called.
     * It simply proceeds to the sign up screen.
     */
    handleSubmit_SignUp = () => {
        this.props.navigation.navigate("SignUp")
    };

    /**
     * render()
     * Layout for the sign up screen.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    //source={require("../assets/HouseMates_splashBackground_crop02.png")}>
    render() {
        const resizeMode = 'cover';
        return (
            <ImageBackground style={{flex: 1, resizeMode}}
                             source={require("../assets/back.png")}>
                <View style={[styles.box_Logo]}>
                    <Image style={{flex:1, height:undefined, width:undefined}}
                           source={require("../assets/HouseMatesPNGLogo_dirtySlogan_ovalBackground.png")}
                           resizeMode="contain"/>
                </View>
                <View style={{flex: 4}}>
                    <View style={[styles.box_Form01]}>
                        <Button style={{fontSize: 14, color: 'white', alignSelf: 'center', justifyContent: 'center'}}
                                onPress={this.handleSubmit_LogIn}
                                containerStyle={{ padding: 16, height: 50, width: 260, overflow: 'hidden', borderRadius: 20,
                                    backgroundColor: '#283350' }}>
                            LOG IN
                        </Button>
                    </View>
                    <View style={[styles.box_Form02]}>
                        <Button style={{fontSize: 14, color: 'white', alignSelf: 'center', justifyContent: 'center'}}
                                onPress={this.handleSubmit_SignUp}
                                containerStyle={{ padding: 16, height: 50, width: 260, overflow: 'hidden', borderRadius: 20,
                                    backgroundColor: '#283350' }}>
                            SIGN UP
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#283350'
    },
    box_Logo: {
        flex: 4,
        marginTop: 60,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'

    },
    box_Form01: {
        flex: 6,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10

    },
    box_Form02: {
        flex: 4,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    text_Welcome: {
        color: '#ffd344',
        fontSize: 25,
        letterSpacing: 4,
        alignSelf: 'center'
    },
});
