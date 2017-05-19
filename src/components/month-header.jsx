import React, { Component } from 'react';
import { getMonthString } from './datepicker-utilities.js'

export default class MonthHeader extends Component{
  render(){
    const props = this.props;

    return (
      <div className="datepicker-calendar-month-header">
        <h3 className="datepicker-calendar-month-title">
          <button className="datepicker-calendar-arrow prev">
            <i className="datepicker-icon arrow-left"></i>
          </button>
          { getMonthString(props.selectedDate, props.lang) }
          <span className="datepicker-calendar-year">{ props.selectedDate.getFullYear() }</span>
          <button className="datepicker-calendar-arrow next">
            <i className="datepicker-icon arrow-right"></i>
          </button>
        </h3>
      </div>
    );
  }
}