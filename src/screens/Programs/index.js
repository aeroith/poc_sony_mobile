import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimensions, View, TouchableOpacity, FlatList, Animated } from 'react-native';
import styles from './styles';
import withTranslation from '../../hocs/Translation/index';
import ProgramTypeTabSelector from '../../containers/ProgramTypeTabSelector';
import { actions as programActions } from '../../reducers/programs';
import ImageWrapper from '../../components/Image';

const deviceWidth = Dimensions.get('window').width;
const imageWidth = (deviceWidth - 40) / 4;

@withTranslation
@connect(
  state => ({
    selectedType: state.programs.selectedType,
    programs: state.programs.programs,
    isLoading: state.programs.isLoading,
  }),
  programActions,
)
export default class Programs extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPrograms(1);
  }

  render() {
    const { programs, selectedType } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={styles.emptyContainer}
        />
        <ProgramTypeTabSelector
          selectedType={selectedType}
          setProgramType={this.props.setProgramType}
          translate={this.props.translate}
        />
        <View style={styles.programsContainer}>
          {
            <ProgramList
              getPrograms={this.props.getPrograms}
              isLoading={this.props.isLoading}
              programs={programs.filter(x => x.type === selectedType).map((x, id) => ({...x, id}))}
            />
          }
        </View>
      </View>
    );
  }
}

const ImageItem = ({ onPress, image }) => (
  <TouchableOpacity onPress={onPress} style={styles.program}>
    <ImageWrapper
      uri={image}
      height={imageWidth * 1.5}
      width={imageWidth}
    />
  </TouchableOpacity>
);

class ProgramList extends PureComponent {
  onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }]);
  onPress = () => {};

  keyExtractor = item => item.id;
  animVal = new Animated.Value(0);

  renderItem = ({ item }) => (
    <ImageItem
      id={item.id}
      onPress={this.onPress}
      image={item.poster_image}
    />
  );

  render() {
    return (
      <FlatList
        onScroll={this.onScroll}
        scrollEventThrottle={10}
        onRefresh={() => this.props.getPrograms(1)}
        refreshing={this.props.isLoading}
        numColumns={4}
        data={this.props.programs}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
