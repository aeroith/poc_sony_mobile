import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class ProgramTypeTabSelector extends Component {
  constructor(props) {
    super(props);
    this.availableTypes = ['tv', 'movie'];
    this.state = {
      selectedType: 'tv',
    };
  }

  onPress = type => () => this.setState({ selectedType: type });

  render() {
    return (
      <View {...this.props}>
        <View style={styles.container}>
          {
            this.availableTypes.map((type, index) =>
              <TabItem
                onPress={this.onPress(type)}
                active={this.state.selectedType === type}
                key={index}
                style={styles.tabItemText}
                title={this.props.translate(type)}
              />)
          }
        </View>
      </View>
    );
  }
}

const TabItem = ({ onPress, active, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tabItemContainer, active && styles.tabItemContainerActive]}
  >
    <Text style={styles.tabItemText}>{title}</Text>
  </TouchableOpacity>
);
