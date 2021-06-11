import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import ProductTabContent from './ProductTabContent';

import AddCategory from '../Buttons/AddCategory/AddCategory';



const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#32CD32',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
   top:0,
    marginLeft: '15px',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#32CD32',
      opacity: 1,
    },
    '&$selected': {
      color: 'black',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'black',
    },
  },
  selected: {},
})) ((props) => <Tab disableRipple {...props} />);



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    position:'fixed',
    top:'70px',
    width:'100%',
    backgroundColor: theme.palette.background.paper,
  },
  rowElementsDiv:{
    width:'100%',
    marginTop:'160px',
    textAlign: 'center',
  },
  // rowElements:{
  //   display: 'inline-block',
  // }
  
}));

export default function HeaderBelowMenu() {
  const classes = useStyles();
  //const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>

      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Product" {...anyProps(0)}/>
          <AntTab label="Inventory" {...anyProps(1)}/>
          <AntTab label="Delivery Time slot" {...anyProps(2)}/>
          <AntTab label="Order Management" {...anyProps(3)}/>
        </AntTabs>
        <Typography className={classes.padding} />
      </div>


  {value === 0 ?  <div className={classes.rowElementsDiv}>
                      <div style={{display:'inline-block', float:'left', marginLeft:'60px'}}>
                        <h5 style={{opacity: '0.8'}}>Category</h5>
                      </div>

                      <div style={{display:'inline-block', marginRight:'445px'}}>
                        <span style={{fontSize:'18px'}}> All Products</span>
                      </div>
                      
                      <div style={{display:'inline-block', float:'right', marginRight:'115px'}}>
                        <AddCategory/>              
                      </div>
                      <div style={{display:'inline-block', float:'right'}}>
                        <AddCategory/>              
                      </div>
                  </div>

             : null}

              <br/>

      <div
        index={value}
        onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}  style={{marginTop: '-42px'}}>
<br/>
            <ProductTabContent />

          </TabPanel>

          <TabPanel value={value} index={1} >
            Inventory
          </TabPanel>

          <TabPanel value={value} index={2} >
            Delivery Time slot
          </TabPanel>

          <TabPanel value={value} index={3} >
            Order Management
          </TabPanel>
      </div>


    </div>
  );
}





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};





function anyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}