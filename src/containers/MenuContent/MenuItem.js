import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Image from '../../components/Image';

export default class MenuItem extends Component {
    static propTypes = {
      style: PropTypes.any,
      image: PropTypes.objectOf(PropTypes.any),
      text: PropTypes.objectOf(PropTypes.any).isRequired,
      bordered: PropTypes.bool,
      isLastItem: PropTypes.bool,
      childItem: PropTypes.bool,
      broadcastMenuItemOpened: PropTypes.func
    };

    static defaultProps = {
      image: {},
      style: {},
      bordered: false,
      isLastItem: false,
      childItem: false,
      broadcastMenuItemOpened: this.noop
    };

    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        menuItemChildrenHeight: new Animated.Value(0),
        menuItemChildrenOpacity: new Animated.Value(0),
      };

      this.height = {
        opened: { toValue: 100 }, // Default value set to 100
        closed: { toValue: 0 },
      };

      this.animationEasing = { duration: 200, easing: Easing.linear };
      this.animation = {};
      this.noop = () => {};
    }

    animateMenu = (type) => {
      if (type === 'close') {
        this.animation.open.stop();
        this.animation.close.start();
      } else if (type === 'open') {
        this.animation.close.stop();
        this.animation.open.start();
      }
    };

    toggleMenuItemChildren = () => {
      this.setState({ isOpen: !this.state.isOpen });
      if (this.state.isOpen) {
        this.animateMenu('close');
      } else {
        this.props.broadcastMenuItemOpened(this.props.text.content);
        this.animateMenu('open');
      }
    };

    closeMenuItemChildren = () => {
      this.setState({ isOpen: false });
      this.animateMenu('close');
    };

    generateAnimationFunc = (childrenElements) => {
      const childrenProps = childrenElements.props.children;
      if (childrenProps.length > 0) {
        let totalHeight = 0;
        childrenProps.forEach((childrenProp) => {
          totalHeight += (childrenProp.props.image ? 60 : 50);
        });
        this.height.opened.toValue = totalHeight;
      }
      this.animation = {
        open: Animated.parallel([
          Animated.timing(this.state.menuItemChildrenHeight, Object.assign({}, this.height.opened, this.animationEasing)),
          Animated.timing(this.state.menuItemChildrenOpacity, { toValue: 1 }),
        ]),
        close: Animated.parallel([
          Animated.timing(this.state.menuItemChildrenHeight, Object.assign({}, this.height.closed, this.animationEasing)),
          Animated.timing(this.state.menuItemChildrenOpacity, { toValue: 0 }),
        ])
      };
    };

    generateOnPressFunc = () => {
      if (this.props.children) return this.toggleMenuItemChildren;
      if (!this.props.onPress) return this.noop;
      return this.props.onPress;
    };

    render() {
      const {
        image, text, contentRight, bordered, isLastItem, style, children, childItem
      } = this.props;
      const hasImage = image && Object.keys(image).length > 0 && image.uri.length > 0;
      const onPressFn = this.generateOnPressFunc();
      const isBordered = bordered && !isLastItem;
      const activeOpacity = onPressFn ? 0.8 : 1;
      if (children && Object.keys(this.animation).length === 0) this.generateAnimationFunc(children);
      return (
        <View>
          <TouchableOpacity
            style={[
                styles.menuItemWrapper,
                isBordered && styles.menuItemBordered,
                isBordered && childItem && styles.menuItemBorderedBlack,
                style && style,
                this.state.isOpen && styles.menuItemChildrenOpen,
                hasImage && styles.menuItemWrapperWithImage
            ]}
            activeOpacity={activeOpacity}
            onPress={onPressFn}
          >
            {hasImage && <Image uri={image.uri} style={image.style || {}} height={image.height} width={image.width} />}
            <View style={[styles.menuItemTextWrapper, contentRight && styles.menuItemTextWrapperMultipleText]}>
              <Text style={[styles.menuItemTextLeft, text.style && text.style]}>
                {text.content}
              </Text>
              {contentRight || null }
            </View>

          </TouchableOpacity>
          {children && (
            <Animated.View style={{ height: this.state.menuItemChildrenHeight, opacity: this.state.menuItemChildrenOpacity }}>
              {children}
            </Animated.View>
          )}
        </View>);
    }
}
