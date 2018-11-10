import React, { Component } from "react";
import {Text, View, StyleSheet} from "react-native";
import { Card, CardItem, Thumbnail, Body, Left} from 'native-base';

/**
 * class CardComponent
 * Sets the layout for the cards utilized in ToDoListScreen.js
 */
export default class CardComponent extends Component {

    // Sets up the state of the CardComponent.
    // TODO: More fields will be needed.
    constructor (props) {
        super(props);
        this.state = {
            textValue: 'COMPLETE TASK',
            clicked: false
        }
    }

    // Allows for a test implementation of the chore completion toggle.
    // TODO: Needs to update the database of task completion.
    onButtonPress = () => {
        if (this.state.clicked) {
            this.setState({
                textValue: 'COMPLETE TASK',
                clicked: false
            })

        }
        else {
            this.setState({
                textValue: 'TASK COMPLETED',
                clicked: true
            })
        }
    };


    render() {
        // TODO: images will need to change to the database list of thumbnails for user (if this feature is desired).
        // WARNING! Image path may need to be updated depending on directory hierarchy.
        const images = {
            "1": require('./assets/temp_thumbnail_1.png'),
            "2": require('./assets/temp_thumbnail_2.png'),
            "3": require('./assets/temp_thumbnail_3.png'),
            "4": require('./assets/temp_thumbnail_4.png')
        };

        var buttonColor;
        if (this.state.clicked) {
            buttonColor = { backgroundColor: '#729b79' }
        }
        else {
            buttonColor = { backgroundColor: '#a03e47'}
        }

        return (
            <Card>
                <CardItem button bordered onPress={()=>alert("Detailed task description.")}>
                    <Left>
                        <Thumbnail source={images[this.props.imageSource]}/>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: 'bold'}}>TASK TITLE</Text>
                            <Text>Short task description.</Text>
                            <Text>11:59am, December 31</Text>
                        </View>
                    </Left>
                </CardItem>
                <CardItem style={buttonColor} footer button onPress={this.onButtonPress}>
                    <Body>
                    <Text style={styles.text_Button}>{this.state.textValue}</Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    text_Button: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white'
    }
});
