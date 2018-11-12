import {Component} from "react";
import {Image, Text, StyleSheet, View} from "react-native";
import React from "react";
import tForm from 'tcomb-form-native';
import Button from 'react-native-button';
const Form = tForm.form.Form;
const User = tForm.struct({
    houseID: tForm.String,
});

export default class HouseSetupScreen extends Component {
    // Constructor initializes houseID to "".
    constructor(props) {
        super(props);
        this.state = {nameID: ""};
        this.onChange=this.onChange.bind(this);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit_JoinHome()
     * When the join button is pressed, this function is called.
     * It grabs the values in the input box and prints them to the console.
     * Then proceeds to the next screen if no values were null.
     * TODO: add memeber to the household with the given houseID
     */
    handleSubmit_JoinHome = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
        if (value) {
            this.props.navigation.navigate("TabNavigation");
        }
    };

    /**
     * handleSubmit_CreateHome()
     * When the create button is pressed, this function is called.
     * It simply proceeds to the next screen.
     * TODO: add houseID generation here
     */
    handleSubmit_CreateHome = () => {
            this.props.navigation.navigate("TabNavigation");
    };

    onChange(value) {
        this.setState({value});
    };

    /**
     * render()
     * Layout for the sign up screen.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box_Spacer}>
                    <Text></Text>
                </View>
                <View style={styles.box_Option}>
                    <View style={styles.box_Fitter} >
                        <Image style={{flex:1, height:undefined, width:undefined}}
                               source={require("../assets/HouseMates_joinHouse_outlinedTEST_noBackground.png")}
                               resizeMode="contain"/>
                        <Text style={styles.text_SubTitle}>
                            If you have received a house code from someone, enter it below.
                        </Text>
                        <Form ref={c => this._form = c}
                              type={User}
                              value={this.state.value}
                              onChange={this.onChange}
                              options={options}/>
                        <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                onPress={this.handleSubmit_JoinHome}
                                containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                    backgroundColor: '#415180' }}>
                            JOIN EXISTING HOME
                        </Button>
                    </View>
                </View>
                <View style={styles.box_Spacer}>
                    <Text></Text>
                </View>
                <View style={styles.box_Option}>
                    <View style={styles.box_Fitter}>
                        <Image style={{flex:1, height:undefined, width:undefined}}
                               source={require("../assets/HouseMates_newHouse_outlinedTEST_noBackground.png")}
                               resizeMode="contain"/>
                        <Text style={[styles.text_SubTitle2]}>
                            Or start off on your own by creating a new home!
                        </Text>
                        <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                onPress={this.handleSubmit_CreateHome}
                                containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                    backgroundColor: '#415180' }}>
                            CREATE NEW HOME
                        </Button>
                    </View>
                </View>

            </View>
        );
    }
}
// The following edits the style of the form. This format is required for the API.
const formStyles = {
    ...Form.stylesheet,
    //
    controlLabel: {
        normal: {
            color: 'white',
            fontSize: 14
        },
        error: {
            color: 'red',
            fontSize: 14
        }
    },
    textbox: {
        normal: {
            color: '#415180',
            borderWidth: 1,
            borderColor:'#415180',
            borderRadius: 4,
            height: 36,
            marginBottom: 5
        },
        error: {
            color: '#415180',
            borderWidth: 1,
            borderColor:'#415180',
            height: 36,
            marginBottom: 5
        }
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        backgroundColor: '#ffd344',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
};

// The following edits the fields of the form. This format is required for the API.
const options = {
    fields: {
        houseID: {
            label: 'Enter House Code:'
        }
    },
    stylesheet: formStyles,
};

// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#283350',
        padding: 22,
    },
    box_Option: {
        flex: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    box_Spacer: {
        flex: 0.5,
        backgroundColor: 'transparent'
    },
    box_Fitter: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 10,
        justifyContent: 'flex-end'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#415180'
    },
    text_SubTitle: {
        color: '#415180',
        fontSize: 16,
        alignItems: 'center',
        padding: 0
    },
    text_SubTitle2: {
        color: '#415180',
        fontSize: 16,
        alignItems: 'center',
        marginBottom: 22
    },
});
