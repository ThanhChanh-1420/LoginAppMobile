/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    TouchableOpacity,
    Text,
    Alert,
    View,
    Button,
    TextInput,
    StyleSheet,
    Image,
} from 'react-native';

const Stack = createNativeStackNavigator();
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValidUsername: true,
            isValidPassword: true,
            isToken: '',
        };
    }

    onLogin() {
        const { username, password } = this.state;

        Alert.alert('Credentials', `${username} + ${password}`);
    }
    handleValidUser = (str) => {
        if (str.length >= 4) {
            this.setState({ isValidUsername: true });
        } else {
            this.setState({ isValidUsername: false });
        }
        this.setState({
            username: str,
        });
    };

    handleValidPass = (str) => {
        if (str.length >= 4) {
            this.setState({ isValidPassword: true });
        } else {
            this.setState({ isValidPassword: false });
        }
        this.setState({
            password: str,
        });
    };

    login = (str) => {
        axios.post('https://qlsc.maysoft.io/server/api/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            //console.log(response.data.data.token_type + ' ' + response.data.data.access_token);
            this.setState({ isToken: response.data.data.token_type + ' ' + response.data.data.access_token });
            // Code Test
            this.props.setToken(response.data.data.token_type + ' ' + response.data.data.access_token);
            // Code Test
            //console.log(this.state.isToken);
            this.props.navigation.navigate('Home');
        }).catch(error => {
            console.log(error);
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Image style={styles.logo} source={require('../../assets/logo_01.png')} />
                </View>

                <View style={styles.containerUserName}>
                    <Text style={styles.Text}>Tên đăng nhập</Text>
                    <TextInput
                        value={this.state.username}
                        //onChangeText={username => this.setState({ username })}
                        placeholder={'Tên đăng nhập'}
                        style={styles.input}
                        onChange={(e) => this.handleValidUser(e.nativeEvent.text)}
                    />
                </View>
                {this.state.isValidUsername ? null :
                    <Text style={styles.errorMsg}>Tên đăng nhập phải lớn hơn 4 ký tự</Text>
                }
                <Text style={styles.Textpass}>Mật khẩu</Text>
                <View style={styles.containerPass}>
                    <TextInput
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder={'Mật khẩu'}
                        secureTextEntry={true}
                        style={styles.inputPass}
                        onChange={(e) => this.handleValidPass(e.nativeEvent.text)}
                    />
                    {/* <TouchableOpacity
                        style={styles.iconEye}
                        onPress={this.onPress}
                    >
                        <Icon name="eye"></Icon>
                    </TouchableOpacity> */}
                </View>
                {this.state.isValidPassword ? null :
                    <Text style={styles.errorMsg}>Mật khẩu phải lớn hơn 4 ký tự</Text>
                }
                <View style={styles.containerButton}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.login.bind(this)}
                    >
                        <Text>Đăng nhập</Text>
                    </TouchableOpacity>
                    {/* <Button
                        title={'Đăng nhập'}
                        style={styles.button}
                        onPress={this.login.bind(this)}
                    /> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    containerTop: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    containerUserName: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPass: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        //textAlign: 'center',
        color: '#34495e',
    },
    logo: {
        backgroundColor: '#056ecf',
        height: 128,
        width: 128,
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 10,
    },
    inputPass: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 10,
        marginLeft: 105
    },
    Text: {
        marginRight: 105,
        fontWeight: 'bold',
        color: 'black',
    },
    Textpass: {
        marginLeft: 105,
        fontWeight: 'bold',
        color: 'black',
    },
    errorMsg: {
        marginLeft: 105,
        fontWeight: 'bold',
        color: 'red',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#5ca6ff",
        padding: 10,
        width: 200,
        borderRadius: 10,
    },
});
