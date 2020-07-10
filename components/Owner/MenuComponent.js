import React, { Component } from 'react';
import {
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Text,
  Image,
  Button,
  Alert,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

import { ListItem, Tile } from 'react-native-elements';
import { DISHES } from '../../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { baseUrlNode } from '../../shared/baseUrl';

console.disableYellowBox = true;
// const mapStateToProps = (state) => {
//   return {
//     dishes: state.dishes,
//   };
// };

class Menu extends Component {
  // static navigationOptions = {
  //   title: 'Menu',
  // };
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      isLoading: true,
      token: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
    console.log(token);
    const response = await fetch(baseUrlNode + 'api/vehicle/ownerVehicle', {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ vehicles: responseJson });

        console.log(responseJson.vehicles);
      })
      .catch((error) => {
        console.error(error);
        console.log('error araha');
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert(
              'Delete Vehicle?',
              'Are you sure you wish to delete the Vehicle' + '?',
              [
                {
                  text: 'Cancel',
                  style: ' cancel',
                },
                {
                  text: 'OK',
                  onPress: async () => {
                    console.log(item._id);

                    await fetch(
                      baseUrlNode + 'api/vehicle/delete/' + item._id,
                      {
                        method: 'DELETE',
                        headers: {
                          'x-auth-token': this.state.token,
                        },
                      }
                    )
                      .then((response) => response.json())
                      .then((responseJson) => {
                        console.log('deleted');
                        console.log(responseJson);
                      })
                      .catch((error) => {
                        console.error(error);
                        console.log('not deleted');
                      });
                  },
                },
              ],
              { cancelable: false }
            );
          },
        },
      ];
      return (
        <Swipeout right={rightButton} autoClose={true}>
          <Animatable.View animation='fadeInRightBig' duration={2000}>
            {/* <View style={Styles.main}>
            <View style={{ flex: 2 }}>
              <Image source={require('../images/car.jpg')} style={Styles.img} />
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 5 }}>
              <Text>Car</Text>
            </View>
          </View> */}
            <ListItem
              style={Styles.list}
              key={index}
              title={
                'Type: ' +
                item.type +
                '\n' +
                item.manufacturer +
                ' ' +
                item.model
              }
              subtitle={
                'Vehicle model: ' +
                item.year +
                '\n' +
                'Booking: ' +
                item.available
              }
              hideChevron={true}
              leftAvatar={{ source: require('../images/car.jpg') }}
              onPress={() => navigate('Detail', { vehicle: item })}
            />
          </Animatable.View>
        </Swipeout>
      );
    };

    return (
      <ScrollView>
        <FlatList data={this.state.vehicles} renderItem={renderMenuItem} />
        <View style={Styles.button}>
          <Button
            onPress={() => navigate('New', {})}
            title=' Add new Vehicle'
          />
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  list: {
    marginBottom: 2,
  },
  img: {
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 60,
  },
  button: {
    margin: 30,
  },
  main: {
    marginBottom: 2,
    flex: 1,
    backgroundColor: '#FDF6E7',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});
export default Menu;
