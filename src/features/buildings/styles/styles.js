import tableStyle from 'assets/jss/components/tableStyle'

const buildingStyle = theme => {
  return {
    ...tableStyle(theme),
    boldLabel: {
      fontWeight: 'bold'
    },
    collapseContainer: {
      padding: '10px',
      borderBottom: '1px solid #eee'
    },
    typeTitle: {
      paddingLeft: '10px',
      marginTop: '20px'
    },
    formControlLabel: {
      marginRight: '2px'
    },
    customMargin: {
      margin: '10px',
      padding: '15px'
    }
  }
}

export const boxStyle = theme => {
  return {
    ...tableStyle(theme),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }
}

export default buildingStyle
