import React from 'react';
import { View } from 'react-native';
import tableStyles from '../styles/tables';

export default (props: any): JSX.Element => {
  const { children } = props;
  return (
    <View style={tableStyles.tableRow}>
      {children}
    </View>
  );
};
