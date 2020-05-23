import { StyleSheet } from 'react-native';
import globalVars from './global-vars';

export default StyleSheet.create({
  table: {
    width: '100%',
    marginBottom: globalVars.spacing,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: globalVars.spacing,
    paddingHorizontal: globalVars.spacing,
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
    padding: 4,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});
