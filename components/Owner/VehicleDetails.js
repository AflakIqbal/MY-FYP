import React, { Component } from 'react';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrlNode } from '../../shared/baseUrl';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  SafeAreaView,
  FlatList,
  Share,
} from 'react-native';

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: [],
      comments: [],
    };
  }

  componentDidMount() {
    const vehicle1 = this.props.navigation.getParam('vehicle');
    console.log(vehicle1);
    this.setState({ vehicle: vehicle1 });
    console.log('1st');
    console.log(vehicle1._id);
    this.getData(vehicle1._id);
  }

  getData = async (id) => {
    console.log('2nd');
    console.log(id);
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const response = await fetch(baseUrlNode + 'api/vehicle/bookings/' + id, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ comments: responseJson });

        console.log('yeh');
      })
      .catch((error) => {
        console.error(error);
        console.log('error araha');
      });
  };

  //   static navigationOptions = {
  //     title: 'Vehicle Details',
  //   };
  render() {
    const shareDish = (title, message, url) => {
      Share.share(
        {
          title: title,
          message: title + ': ' + message + ' ' + url,
          url: url,
        },
        {
          dialogTitle: 'Share ' + title,
        }
      );
    };

    const RenderComments = () => {
      const renderCommentItem = ({ item, index }) => {
        return (
          <View key={index} style={{ margin: 10 }}>
            <Text style={{ fontSize: 14 }}>{item.customer.name}</Text>
            <Text style={{ fontSize: 14 }}>
              {item.vehicleFeedback.feedback}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {item.vehicleFeedback.rating} Stars
            </Text>
            <Text style={{ fontSize: 12 }}>{'-- ' + item.date} </Text>
          </View>
        );
      };

      return (
        <Card title='Comments'>
          <FlatList data={this.state.comments} renderItem={renderCommentItem} />
        </Card>
      );
    };

    const RenderDish = () => {
      const vehicle = this.state.vehicle;

      if (vehicle != null) {
        return (
          <Card image={require('../images/car.jpg')}>
            <Text style={styles.text}>Vehicle Type: {vehicle.type}</Text>
            <Text style={styles.text}>
              Model: {vehicle.manufacturer} {vehicle.model}
            </Text>
            <Text style={styles.text}>Register Year: {vehicle.year}</Text>
            <Text style={styles.text}>
              Seating Capacity: {vehicle.seatingCapacity}
            </Text>
            <Text style={styles.text}>Transmition: {vehicle.transmission}</Text>
            <Text style={styles.text}>Fair: {vehicle.fare}</Text>
            <View style={styles.card}>
              <Icon
                raised
                reverse
                name='share'
                type='font-awesome'
                color='#51D2A8'
                onPress={() =>
                  shareDish(
                    vehicle.type,
                    vehicle.manufacturer,
                    '../images/car.jpg'
                  )
                }
              />
            </View>
          </Card>
        );
      } else {
        return (
          <View>
            <Text>error araha hai</Text>
          </View>
        );
      }
    };

    return (
      <ScrollView>
        <RenderDish />
        <RenderComments />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  //   drawerHeader: {
  //     backgroundColor: '#800080',
  //     height: 140,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     flex: 1,
  //     flexDirection: 'row',
  //   },
  //   drawerHeaderText: {
  //     color: 'white',
  //     fontSize: 26,
  //     fontWeight: 'bold',
  //   },
  //   drawerImage: {
  //     marginLeft: 15,
  //     width: 80,
  //     height: 100,
  //   },
  card: {
    alignItems: 'center',
  },
  text: {
    //marginLeft: 15,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'serif',
    textDecorationColor: 'purple',
    textShadowColor: 'indigo',
  },
});

export default Dishdetail;
