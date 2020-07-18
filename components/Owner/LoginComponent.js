import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Platform,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import { AsyncStorage } from 'react-native';
import { baseUrlNode } from '../../shared/baseUrl';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import { baseUrl } from '../../shared/baseUrl';

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageBrowser from '../ImagePicker/ImageBrowser';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const MyServerIP = baseUrl;
class LoginTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false,
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo').then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

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
    fetch(baseUrlNode + 'api/owner/auth/login', {
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
            this.props.navigation.navigate('main');
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
          secureTextEntry={true}
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

const MainColor = '#085f63';
var cPhotos = [];
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
      imageUrl: './assets/advisory.jpg',
      ImageSelected: {},
      showGallery: false,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      HeaderGallery: 'Select Images To Upload',
      submitFunction: null,
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
        aspect: [4, 4],
      });
      if (!capturedImage.cancelled) {
        console.log('_______________________________________');
        console.log(capturedImage);
        this.setState({
          ImageSelected: capturedImage,
        });

        this.processImage(capturedImage.uri);
      }
    }
  };

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: 'jpeg' }
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
  saveImage() {
    const Image = this.state.ImageSelected[0];
    if (Image) {
      const API = baseUrlNode + 'api/owner/uploadPhoto';
      console.log(API);
      const fd = new FormData();
      fd.append('photo', Image);
      let data = {
        body: fd,
        method: 'POST',
      };
      fetch(API, data)
        .then((res) => res.json())
        .then((result) => {
          if (result.read) {
            console.log(result.url);
            this.setState({ imageUrl: result.url });
            this.handleRegister();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  handleRegister() {
    console.log('yahan a raha');
    // localhost means your mobile cannot access this
    fetch(baseUrlNode + 'api/owner/register', {
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
        imageURI: this.state.imageUrl,
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
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        // console.log("_____________________________________________________");
        // console.log(result);
        // this.setState({
        //   imageUrl:result.uri
        // });
        this.processImage(result.uri);
      }

      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  // Custom Image Picker Items

  componentDidMount() {
    cPhotos = [];
  }
  imagesCallback = (callback) => {
    // console.log('Called OnSubmit');
    callback
      .then((photos) => {
        for (let photo of photos) {
          cPhotos.push({
            uri:
              Platform.OS === 'android'
                ? photo.uri
                : photo.uri.replace('file://', ''),
            name: photo.filename,
            type: 'image/jpg',
          });
        }
        // this.setState({capturedImages:cPhotos});
        if (cPhotos.length > 0) {
          this.setState({
            showGallery: false,
            HeaderGallery: 'Select Images To Upload',
            ImageSelected: cPhotos,
            imageUrl: cPhotos[0].uri,
          });
          cPhotos = [];
        }
      })
      .catch((e) => console.log(e));
  };
  updateHandler = (count, onSubmit) => {
    if (count == 0) {
      this.setState({ HeaderGallery: 'Select Images To Upload' });
    } else {
      this.setState({ submitFunction: onSubmit });
      this.setState({ HeaderGallery: count + ' Images Selected' });
    }
  };
  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
    const noCameraPermissionComponent = (
      <Text style={styles.emptyStay}>No access to camera</Text>
    );
    return (
      <ScrollView>
        <Modal
          visible={this.state.showGallery}
          onRequestClose={() =>
            this.setState({
              showGallery: false,
            })
          }
          onDismiss={() =>
            this.setState({
              showGallery: false,
            })
          }
        >
          <View style={[styles.flex, styles.container]}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                marginBottom: 10,
                height: 60,
                borderWidth: 0.5,
                borderColor: '#512DA8',
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: 'black',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 6,
                }}
              >
                Select Profile Image
              </Text>
              <TouchableOpacity
                style={{ padding: 5, marginTop: 8, marginRight: 7 }}
                onPress={() => {
                  if (this.state.submitFunction == null) {
                  } else {
                    this.state.submitFunction();
                  }
                }}
              >
                <MaterialCommunityIcons
                  name='done-all'
                  size={32}
                  color='#512DA8'
                />
              </TouchableOpacity>
            </View>
            <ImageBrowser
              max={1}
              onChange={this.updateHandler}
              callback={this.imagesCallback}
              renderSelectedComponent={this.renderSelectedComponent}
              emptyStayComponent={emptyStayComponent}
              noCameraPermissionComponent={noCameraPermissionComponent}
            />
          </View>
        </Modal>
        <View style={styles.container}>
          <Text style={{ margin: 10, fontSize: 15 }}>
            Select your Profile Picture
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require('../images/nobody.jpg')}
              style={styles.image}
            />
            {/* <Button
              title='Camera'
              onPress={this.getImageFromCamera}
              buttonStyle={{
                backgroundColor: null,
              }}
              titleStyle={{
                color: 'blue',
                textDecorationLine: 'underline',
              }}
            /> */}
            <Button
              title='Gallary'
              onPress={() => {
                this.setState({
                  showGallery: true,
                });
                this.pickImage;
              }}
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
              onPress={() => this.saveImage()}
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
  flex: {
    flex: 1,
    width: '98%',
    marginLeft: '1%',
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: MainColor,
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff',
  },
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

// export default function MainLogin() {
//   const Login = createBottomTabNavigator();
//   return (
//     <Login.Navigator>
//       <Login.Screen name='Login' component={LoginTab} />
//       <Login.Screen name='Register' component={RegisterTab} />
//     </Login.Navigator>
//   );
// }
const Login = createBottomTabNavigator(
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

export default Login;
