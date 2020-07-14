import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import { AsyncStorage } from 'react-native';
import { baseUrlNode } from '../../shared/baseUrl';

import { createBottomTabNavigator } from 'react-navigation-tabs';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../../shared/baseUrl';

class LoginTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false,
    };
  }

  // componentDidMount() {
  //   SecureStore.getItemAsync('userinfo').then((userdata) => {
  //     let userinfo = JSON.parse(userdata);
  //     if (userinfo) {
  //       this.setState({ username: userinfo.username });
  //       this.setState({ password: userinfo.password });
  //       this.setState({ remember: true });
  //     }
  //   });
  // }

  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='sign-in'
        type='font-awesome'
        size={24}
        iconStyle={{ color: tintColor }}
      />
    ),
  };

  handleLogin() {
    fetch(baseUrlNode + 'api/Customer/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (!data.errors) {
            await AsyncStorage.setItem('token', data.token);
            const token = await AsyncStorage.getItem('token');
            this.props.navigation.navigate('main1');
          } else {
            data.errors.forEach((error) => alert(error.msg));
          }
        } catch (e) {
          console.log('error hai', e);
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title=' Login'
            icon={
              <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                color='white'
              />
            }
            buttonStyle={{
              backgroundColor: '#512DA8',
            }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate('Register')}
            title=' Register'
            clear
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                color='blue'
              />
            }
            titleStyle={{
              color: 'blue',
            }}
            buttonStyle={{
              backgroundColor: null,
            }}
          />
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      cellPhone: '',
      address: '',
      email: '',
      password: '',
      city: '',
      remember: false,
      imageUrl: baseUrl + 'images/nobody.jpg',
    };
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === 'granted' &&
      cameraRollPermission.status === 'granted'
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        this.processImage(capturedImage.uri);
      }
    }
  };

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: 'png' }
    );
    console.log(processedImage);
    this.setState({ imageUrl: processedImage.uri });
  };

  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name='user-plus'
        type='font-awesome'
        size={24}
        iconStyle={{ color: tintColor }}
      />
    ),
  };

  handleRegister() {
    console.log('yahan a raha');
    fetch(baseUrlNode + 'api/customer/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        cellPhone: this.state.cellPhone,
        address: this.state.address,
        email: this.state.email,
        city: this.state.city,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (!data.errors) {
            await AsyncStorage.setItem('token', data.token);
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            this.props.navigation.navigate('Login');
          } else {
            data.errors.forEach((error) => alert(error.msg));
          }
        } catch (e) {
          console.log('error hai', e);
        }
      });
  }
  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.processImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ margin: 10, fontSize: 15 }}>
            Select your Profile Picture
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FSawariMobile-9b27cae7-5ccd-49d1-86ae-8bff4e2d5ccd/ImageManipulator/9d156135-6603-400d-8d97-140bc6ce7315.png',
              }}
              loadingIndicatorSource={require('../images/logo.png')}
              style={styles.image}
            />
            <Button
              title='Camera'
              onPress={this.getImageFromCamera}
              buttonStyle={{
                backgroundColor: null,
              }}
              titleStyle={{
                color: 'blue',
                textDecorationLine: 'underline',
              }}
            />
            <Button
              title='Gallary'
              onPress={this.pickImage}
              buttonStyle={{
                backgroundColor: null,
              }}
              titleStyle={{
                color: 'blue',
                textDecorationLine: 'underline',
              }}
            />
          </View>
          <Input
            placeholder=' Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder=' Cell Number'
            leftIcon={{ type: 'font-awesome', name: 'phone' }}
            onChangeText={(cellPhone) => this.setState({ cellPhone })}
            value={this.state.cellPhone}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder=' Address'
            leftIcon={{ type: 'font-awesome', name: 'address-book-o' }}
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder=' City'
            leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
            onChangeText={(city) => this.setState({ city })}
            value={this.state.city}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder=' Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder=' Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title='Remember Me'
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title=' Register'
              icon={
                <Icon
                  name='user-plus'
                  type='font-awesome'
                  size={24}
                  color='white'
                />
              }
              buttonStyle={{
                backgroundColor: '#512DA8',
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  camera: {
    backgroundColor: null,
    color: 'blue',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 20,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formInput: {
    margin: 10,
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
  },
  formButton: {
    margin: 30,
  },
});

const Login1 = createBottomTabNavigator(
  {
    Login: LoginTab,
    Register: RegisterTab,
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#9575CD',
      inactiveBackgroundColor: '#D1C4E9',
      activeTintColor: '#ffffff',
      inactiveTintColor: 'gray',
    },
  }
);

export default Login1;
