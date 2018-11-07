import {Component} from "react";
import {Button, Image, KeyboardAvoidingView, StyleSheet, View} from "react-native";
import React from "react";

/**
 * This WIP (work in progress) class is filled with temporary filler for testing purposes.
 * TODO: Set up UI according to UI document.
 * WARNING! Image path may need to be updated depending on directory hierarchy.
 */
export default class WIPScreen extends Component {
    go_to_welcome = () => {
        this.props.navigation.navigate("Welcome");
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={[styles.box_logo]}>
                    <Image style={{flex:1, height:undefined, width:undefined}}
                           source={require("../assets/HouseMatesPNGLogo_long_noBackground.png")}
                           resizeMode="contain"/>
                </View>
                <View style={[styles.box_form]}>
                    <Button title="!" onPress={this.go_to_welcome} color='red'/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#283350'
    },
    box_logo: {
        flex: 4,
        marginTop: 60,
        justifyContent: 'flex-end',
        backgroundColor: '#283350'
    },
    box_form: {
        flex: 10,
        backgroundColor: '#283350',
        padding: 20,
        justifyContent: 'flex-start'
    },
});
