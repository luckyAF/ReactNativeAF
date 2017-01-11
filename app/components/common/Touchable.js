'use strict';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function TouchableIOS(props: Object): ReactElement {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const Touchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : TouchableIOS;

module.exports = Touchable;
