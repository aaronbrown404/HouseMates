import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Icon} from 'native-base';

// WARNING! Image path may need to be updated depending on directory hierarchy.
import CardComponent from '../ToDoListCardComponent';

/**
 * class ToDoListScreen
 * Task completion screen. The main functionality of this screen allows the user to view tasks assigned to them and
 * mark them off when completed.
 */
export default class ToDoListScreen extends React.Component {

    static navigationOptions = {
        title: "My Tasks",
        tabBarIcon: ({tintColor})=>(
            <Icon name='ios-paper' style={{color: tintColor}} />
        )
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content padder>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="2"/>
                </Content>
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


