/* eslint-disable prettier/prettier */

import * as React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
const Stack = createNativeStackNavigator();

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isToken: '',
        };
    };
    tokenInstall = (str) => {
        this.setState({ isToken: str });
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" options={{ headerShown: false }} >
                        {
                            props => <Login {...props} setToken={(token) => this.tokenInstall(token)}></Login>
                        }
                    </Stack.Screen>
                    <Stack.Screen name="Home" options={{ headerShown: false }} >
                        {
                            props => <Home {...props} tokenApi={this.state.isToken} ></Home>
                        }
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

export default Navigation;