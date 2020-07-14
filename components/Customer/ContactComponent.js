import React, { Component } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

class Contact1 extends Component {
  sendMail() {
    MailComposer.composeAsync({
      recipients: ['muhammadaflak322@gmail.com'],
      subject: 'Enquiry',
      body: 'To whom it may concern:',
    });
  }

  render() {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card title={'Our Address'}>
          <Text style={{ margin: 10 }}>{'COMSATS UNIVERSITY ISLAMABAD'}</Text>
          <Text style={{ margin: 10 }}>{'Tarlai kalan, Park Road'}</Text>
          <Text style={{ margin: 10 }}>{'Islamabad, Pakistan'}</Text>
          <Text style={{ margin: 10 }}>{'Tel: +923046860017'}</Text>
          <Text style={{ margin: 10 }}>{'Fax: +923356223525'}</Text>
          <Text style={{ margin: 10 }}>
            {'Email:muhammadaflak322@gmail.com'}
          </Text>
          <Button
            title='Send Email'
            buttonStyle={{ backgroundColor: '#512DA8' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    );
  }
  static navigationOptions = {
    title: 'Contact',
  };
}

export default Contact1;
