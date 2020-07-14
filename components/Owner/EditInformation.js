import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Modal,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { baseUrlNode } from '../../shared/baseUrl';

import { Input, CheckBox, Icon, Card, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class handleEditInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Car',
      manufacturer: '',
      model: '',
      year: 2012,
      seatingCapacity: 1,
      transmission: 'Manual',
      fare: 1,
      showModal: false,
      token: null,
    };
  }

  componentDidMount = async () => {
    const token1 = await AsyncStorage.getItem('token');
    this.setState({ token: token1 });
  };

  static navigationOptions = {
    title: 'Add New Vehicle',
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handlehandleEditInfo() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      type: 'Car',
      manufacturer: 'Honda',
      model: 'City',
      year: 2012,
      seatingCapacity: 1,
      transmission: 'automatic',
      fare: 1,
    });
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
      <Card>
        <ScrollView>
          <Animatable.View animation='zoomIn' duration={3000}>
            {/* <View style={styles.imageContainer}>
              <Image
                source={{ uri: this.state.imageUrl }}
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
            </View> */}

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Name</Text>

              <Input
                style={styles.formItem}
                placeholder=''
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Email</Text>

              <Input
                style={styles.formItem}
                placeholder='City, Civic etc'
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>City</Text>

              <Input
                style={styles.formItem}
                placeholder='2013 etc'
                onChangeText={(city) => this.setState({ city })}
                value={this.state.city}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Contact</Text>

              <Input
                style={styles.formItem}
                placeholder='300 etc'
                onChangeText={(cellPhone) => this.setState({ cellPhone })}
                value={this.state.cellPhone}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Address</Text>

              <Input
                style={styles.formItem}
                placeholder='300 etc'
                onChangeText={(address) => this.setState({ address })}
                value={this.state.address}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Password</Text>

              <Input
                style={styles.formItem}
                placeholder='300 etc'
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              />
            </View>

            <View style={styles.formRow}>
              <Button
                onPress={
                  () =>
                    fetch(baseUrlNode + 'api/vehicle/add', {
                      method: 'POST',
                      headers: {
                        'x-auth-token': this.state.token,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        type: this.state.type,
                        manufacturer: this.state.manufacturer,
                        model: this.state.model,
                        year: this.state.year,
                        seatingCapacity: this.state.seatingCapacity,
                        transmission: this.state.transmission,
                        fare: this.state.fare,
                      }),
                    })
                      .then((res) => res.json())
                      .then(async (data) => {
                        try {
                          if (!data.errors) {
                            Alert.alert(
                              'Vehicle Added successfully',
                              'Type:' +
                                this.state.type +
                                '\n' +
                                'manufacturer:' +
                                this.state.manufacturer +
                                '\n' +
                                'model' +
                                this.state.model +
                                '\n' +
                                'Year' +
                                this.state.year +
                                '\n' +
                                'Fare' +
                                this.state.fare +
                                '\n' +
                                'Seating Capacity' +
                                this.state.seatingCapacity +
                                '\n' +
                                'Transmition' +
                                this.state.transmission
                            );
                          } else {
                            data.errors.forEach((error) => alert(error.msg));
                          }
                        } catch (e) {
                          console.log('error hai', e);
                        }
                      })
                  //  {
                  //   Alert.alert(
                  //     'Your handleEditInfo OK?',
                  //     'Number of Guests:' +
                  //       this.state.guests +
                  //       '\n' +
                  //       'Smoking:' +
                  //       this.state.smoking +
                  //       '\n' +
                  //       'Date & Time:' +
                  //       this.state.date +
                  //       '\n',
                  //     [
                  //       {
                  //         text: 'Cancel',
                  //         onPress: () => {
                  //           this.resetForm();
                  //         },
                  //         style: 'cancel',
                  //       },
                  //       {
                  //         text: 'OK',
                  //         onPress: () => {
                  //           this.handlehandleEditInfo();
                  //           this.presentLocalNotification(this.state.date);
                  //         },
                  //       },
                  //     ],
                  //     { cancelable: false }
                  //   );
                  // }
                }
                title='Submit'
                color='#512DA8'
                accessibilityLabel='Learn more about this purple button'
              />
            </View>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={this.state.showModal}
              onDismiss={() => this.toggleModal()}
              onRequestClose={() => this.toggleModal()}
            >
              <View style={styles.modal}>
                <Text style={styles.modalTitle}>Your handleEditInfo</Text>
                <Text style={styles.modalText}>
                  Number of Guests: {this.state.guests}
                </Text>
                <Text style={styles.modalText}>
                  Smoking?: {this.state.smoking ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.modalText}>
                  Date and Time: {this.state.date}
                </Text>

                <Button
                  onPress={() => {
                    this.toggleModal();
                    this.resetForm();
                  }}
                  color='#512DA8'
                  title='Close'
                />
              </View>
            </Modal>
          </Animatable.View>
        </ScrollView>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    //alignItems: 'center',
    //justifyContent: 'center',
    //flex: 1,
    //flexDirection: 'row',
    margin: 5,
  },
  formLabel: {
    fontSize: 18,
    //flex: 1.5,
    fontWeight: 'bold',
  },
  formItem: {
    // flex: 1,
    // justifyContent: 'flex-start',
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
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
});

export default handleEditInfo;
