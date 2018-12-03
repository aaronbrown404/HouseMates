import React, { Component } from "react";
//import { StyleSheet, Button, View } from 'react-native';
import email from 'react-native-email';
import { getHouseId } from './DatabaseAPI';

export default class inviteHouseMate extends Component {

    static houseCode = getHouseId;

    static handleEmail = () => {
        const to = []; // string or array of email addresses
        email(to, {
            // Optional additional arguments
            //cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            //bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'Join HouseMates!',
            body: 'Download HouseMates and join my household with code:  + {this.houseCode}'
        }).catch(console.error);
    };
}

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});*/