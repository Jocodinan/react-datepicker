import React, { Component } from 'react';
import moment from 'moment';

export default class WeekHeader extends Component{
  getDaysContent(){
    const weekHeaders = [];
    for(let i = 0; i < 7; i++){
      weekHeaders.push(
        <div className="datepicker-cell day" key={`key-weekday-${i}`}>
          { moment().weekday(i).format('dd') }
        </div>
      );
    }
    return weekHeaders;
  }
  render(){
    const days = this.getDaysContent();

    return(
      <div className="datepicker-calendar-week-header">
        { days }
      </div>
    );
  }
}