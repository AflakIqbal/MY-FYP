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
  TouchableOpacity,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { baseUrlNode } from '../../shared/baseUrl';
import ImageBrowser from '../ImagePicker/ImageBrowser';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Input, CheckBox, Icon, Card, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import thunk from 'redux-thunk';
var cPhotos = [];
class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Car',
      manufacturer: '',
      model: '',
      year: 2012,
      seatingCapacity: 0,
      transmission: 'Manual',
      fare: 0,
      driver: false,
      showModal: false,
      city: 'Islamabad',
      token: null,
      showGallery: false,
    };
  }

  componentDidMount = async () => {
    const token1 = await AsyncStorage.getItem('token');
    this.setState({ token: token1 });
    cPhotos = [];
  };

  static navigationOptions = {
    title: 'Add New Vehicle',
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
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
            this.handleReservation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  handleReservation() {
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
        city: this.state.city,
        driver: this.state.driver,
        imageURI: this.state.imageUrl,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (!data.errors) {
            this.props.navigation.navigate('Vehicles');
          } else {
            data.errors.forEach((error) => alert(error.msg));
          }
        } catch (e) {
          console.log('error hai', e);
        }
      });
  }

  resetForm() {
    this.setState({
      type: 'Car',
      manufacturer: '',
      model: '',
      year: 2012,
      seatingCapacity: 0,
      transmission: 'Manual',
      fare: 0,
      city: 'Islamabad',
      driver: false,
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
        aspect: [4, 4],
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

  noCameraPermissionComponent = () => (
    <View>
      <Text>Camera not allowed</Text>
    </View>
  );

  emptyStayComponent = () => (
    <View>
      <Text>Empty Component</Text>
    </View>
  );

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Card>
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
                emptyStayComponent={this.emptyStayComponent}
                noCameraPermissionComponent={this.noCameraPermissionComponent}
              />
            </View>
          </Modal>
          <Animatable.View animation='zoomIn' duration={3000}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: this.state.imageUrl }}
                loadingIndicatorSource={require('../images/logo.png')}
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
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Type</Text>
              <Picker
                style={styles.formItem}
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ type: itemValue })
                }
              >
                <Picker.Item label='Bike' value='Bike' />
                <Picker.Item label='Car' value='Car' />
              </Picker>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>City</Text>
              <Picker
                style={styles.formItem}
                selectedValue={this.state.city}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ city: itemValue })
                }
              >
                <Picker.Item label='Lahore' value='Lahore' />
                <Picker.Item label='Islamabad' value='Islamabad' />
              </Picker>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Seating Capacity</Text>
              <Picker
                style={styles.formItem}
                selectedValue={this.state.seatingCapacity}
                onValueChange={(Value, itemIndex) =>
                  this.setState({ seatingCapacity: Value })
                }
              >
                <Picker.Item label='1' value='1' />
                <Picker.Item label='2' value='2' />
                <Picker.Item label='3' value='3' />
                <Picker.Item label='4' value='4' />
                <Picker.Item label='5' value='5' />
                <Picker.Item label='6' value='6' />
                <Picker.Item label='7' value='7' />
              </Picker>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>transmission</Text>
              <Picker
                style={styles.formItem}
                selectedValue={this.state.transmission}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ transmission: itemValue })
                }
              >
                <Picker.Item label='Manual' value='manual' />
                <Picker.Item label='Automatic' value='Automatic' />
              </Picker>
            </View>

            <View style={styles.formRow1}>
              <Text style={styles.formLabel1}>Driver</Text>
              <Switch
                style={styles.formItem1}
                value={this.state.driver}
                trackColor='#512DA8'
                onValueChange={(value) => this.setState({ driver: value })}
              ></Switch>
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Manufacturer</Text>

              <Input
                style={styles.formItem}
                placeholder='Honda, Toyota etc'
                onChangeText={(manufacturer) => this.setState({ manufacturer })}
                value={this.state.manufacturer}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Model</Text>

              <Input
                style={styles.formItem}
                placeholder='City, Civic etc'
                onChangeText={(model) => this.setState({ model })}
                value={this.state.model}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Register Year</Text>

              <Input
                style={styles.formItem}
                placeholder='2013 etc'
                onChangeText={(year) => this.setState({ year })}
                value={this.state.year}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Fare</Text>

              <Input
                style={styles.formItem}
                placeholder='300 etc'
                onChangeText={(fare) => this.setState({ fare })}
                value={this.state.fare}
              />
            </View>

            <View style={styles.formRow}>
              <Button
                onPress={() => {
                  this.saveImage();
                }}
                title='Reserve'
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
                <Text style={styles.modalTitle}>Your Reservation</Text>
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
  formRow1: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  formLabel1: {
    fontSize: 18,
    flex: 2,
    fontWeight: 'bold',
  },
  formItem1: {
    flex: 1,
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
  flex: {
    flex: 1,
    width: '98%',
    marginLeft: '1%',
  },
  container: {
    justifyContent: 'center',
    margin: 20,
  },
});

export default Reservation;
