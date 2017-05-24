import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './components/datepicker.jsx';

ReactDOM.render( 
  <DatePicker 
    inputName="datepicker"
    dateFormat="YYYY-MM-DD"
    selectDateCallback={
      function(date){
        console.log(date);
      }
    }
    rangePicker={true}
  />, 
  document.getElementById('root') );