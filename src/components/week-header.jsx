import React, { Component } from 'react';
import { getDays } from './datepicker-utilities.js'

export default class WeekHeader extends Component{
  getDaysContent(){
    const props = this.props;
    return getDays(props.lang).map((day) => {
            return (
              <div className="datepicker-cell day" key={`kay-${day}`}>
                { day }
              </div>
            );
          });
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