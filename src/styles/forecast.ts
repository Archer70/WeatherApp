import { StyleSheet } from 'react-native';
import globalVars from './global-vars';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: globalVars.spacing,
    marginLeft: globalVars.spacing,
  },
});
