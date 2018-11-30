// Added image.
import {Component} from "react";
import {Image, Text, StyleSheet, View} from "react-native";
import React from "react";
import tForm from 'tcomb-form-native';
import Button from 'react-native-button';
import { joinCreateHouse } from '../components/DatabaseAPI';

const Form = tForm.form.Form;
const User = tForm.struct({
    joinCode: tForm.maybe(tForm.String),
    newCode: tForm.maybe(tForm.String)
});

export default class HouseSetupScreen extends Component {
    // Constructor initializes joinCode to "".
    constructor(props) {
        super(props);
        this.state = {nameID: ""};
        this.onChange=this.onChange.bind(this);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    createHome = () => {
        const value = this._form.getValue();
        if (value.newCode) {
            joinCreateHouse(value.newCode);
            this.props.navigation.navigate("TabNavigation");
        }
    };
    joinHome = () => {
        const value = this._form.getValue(); 
        if (value.joinCode) {
            joinCreateHouse(value.joinCode);
            this.props.navigation.navigate("TabNavigation");
        }
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
                <View style={styles.box_Option1}>
                    <Form ref={c => this._form = c}
                          type={User}
                          value={this.state.value}
                          onChange={this.onChange}
                          options={optionsJ}/>

                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.joinHome}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                backgroundColor: '#283350'}}>
                        JOIN EXISTING HOUSEHOLD
                    </Button>
                </View>
                <View style={styles.box_Option2}>
                    <Form ref={c => this._form = c}
                          type={User}
                          value={this.state.value}
                          onChange={this.onChange}
                          options={optionsC}/>

                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.createHome}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                backgroundColor: '#283350' }}>
                        CREATE NEW HOUSEHOLD
                    </Button>
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
            color: 'black',
            borderWidth: 1,
            borderColor:'#283350',
            borderRadius: 4,
            height: 36,
            marginBottom: 5
        },
        error: {
            color: 'red',
            borderWidth: 1,
            borderColor:'red',
            height: 36,
            marginBottom: 5
        }
    },
};
// The following edits the fields of the form. This format is required for the API.
const optionsJ = {
    fields: {
        newCode: {
            hidden: true
        },
        joinCode: {
            label: ' ',
            placeholder: ' Join Code...',
            color: '#a9a9a9'
        }
    },
    stylesheet: formStyles,
};
const optionsC = {
    fields: {
        joinCode: {
            hidden: true
        },
        newCode: {
            label: ' ',
            placeholder: ' Enter new house name...',
            color: '#a9a9a9'
        }
    },
    stylesheet: formStyles,
}
// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
    },
    box_Option1: {
        flex: 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 10
    },
    box_Option2: {
        flex: 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10
    },
    box_Text: {
        alignItems: 'center'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },
    text_SubTitle: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
        padding: 0
    },
    text_SubTitle2: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
        marginBottom: 22
    },
});