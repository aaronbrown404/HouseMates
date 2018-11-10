import React from "react";
import {StyleSheet, View} from "react-native";
import {Container, Content, Icon} from "native-base";
import Button from 'react-native-button';
import { Searchbar } from 'react-native-paper';

// WARNING! Image path may need to be updated depending on directory hierarchy.
import CardComponent from "../HouseholdCardComponent";

/**
 * class HouseholdScreen
 * Task management screen. The main functionality of this screen allows the user to add/edit/remove tasks,
 * send anonymous notifications, and search through existing tasks.
 */
export default class HouseholdScreen extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            firstQuery: ''
        }
    }

    static navigationOptions = {
        title: "My Household",
        tabBarIcon: ({tintColor})=>(
            <Icon name='ios-home' style={{color: tintColor}} />
        )
    };

    render() {
        return (
            <Container style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={this.state.firstQuery}
                />
                <Content padder>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="3"/>
                    <CardComponent imageSource="1"/>
                    <CardComponent imageSource="4"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="3"/>
                    <CardComponent imageSource="1"/>
                    <CardComponent imageSource="4"/>
                    <CardComponent imageSource="4"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="3"/>
                </Content>
                <View style={{padding: 10}}>
                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: '#6171A0' }}>
                        ADD A TASK
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#415180'
    }
});
