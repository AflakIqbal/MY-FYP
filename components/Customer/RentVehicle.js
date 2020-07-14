import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Picker,
  Switch,
} from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { baseUrlNode } from '../../shared/baseUrl';
import { baseUrl } from '../../shared/baseUrl';

class RentVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Car',
      city: 'Lahore',
      driver: 'false',
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    const city = this.props.navigation.getParam('city', '');
    const type = this.props.navigation.getParam('type', '');
    console.log(city);
    console.log('kuch aya');

    console.log(type);

    return (
      <View style={styles.main}>
        {/* <Image style={styles.image} source={require('../images/logo.png')} /> */}
        <Text style={styles.title}>Search Vehicle</Text>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Select Type</Text>
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
          <Text style={styles.formLabel}>Select City</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.city}
            onValueChange={(Value, itemIndex) => this.setState({ city: Value })}
          >
            <Picker.Item label='Lahore' value='Lahore' />
            <Picker.Item label='Islamabad' value='Islamabad' />
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

        <Button
          title='Lets Chalo'
          buttonStyle={styles.button}
          // icon={<Icon name='user' type='font-awesome' color='white' />}
          onPress={() =>
            navigate('Vehicles', {
              city: this.state.city,
              type: this.state.type,
              driver: this.state.driver,
            })
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    //marginLeft: 90,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#512DA8',
    borderRadius: 50,
    margin: 10,
    alignSelf: 'center',
    //marginLeft: 60,
    width: 200,
  },
  main: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  formRow: {
    margin: 10,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'serif',
  },
  formItem: {
    borderRadius: 50,
    borderEndWidth: 10,
    backfaceVisibility: 'visible',
    marginLeft: 50,
    marginRight: 50,
    fontFamily: 'serif',
    //backgroundColor: '#D1C0FF',
  },

  formRow1: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
  formLabel1: {
    fontSize: 18,
    flex: 2,
  },
  formItem1: {
    flex: 1,
  },
});

export default RentVehicle;
