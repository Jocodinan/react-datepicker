import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './components/datepicker.jsx';

ReactDOM.render( 
  <DatePicker 
    inputName="datepicker"
    inputClass="full"
    dateFormat="YYYY-MM-DD"
    startDate="2017-05-25"
    endDate="2017-05-30"
    selectDateCallback={
      function(date){
        console.log(date);
      }
    }
    rangePicker={true}
  />, 
  document.getElementById('root') );