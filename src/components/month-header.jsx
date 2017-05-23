import React, { Component } from 'react';
import moment from 'moment';

export default class MonthHeader extends Component{
  render(){
    const { showingDate, onChangeMonth } = this.props,
          monthName = moment(showingDate).format('MMMM'),
          year = moment(showingDate).format('YYYY');

    return (
      <div className="datepicker-calendar-month-header">
        <h3 className="datepicker-calendar-month-title">
          <button className="datepicker-calendar-arrow prev" onClick={onChangeMonth.bind(null, 'prev')}>
            <i className="datepicker-icon arrow-left"></i>
          </button>
          { monthName.substring(0, 1).toUpperCase() + monthName.substring(1)}
          <span className="datepicker-calendar-year">{ year }</span>
          <button className="datepicker-calendar-arrow next" onClick={onChangeMonth.bind(null, 'next')}>
            <i className="datepicker-icon arrow-right"></i>
          </button>
        </h3>
      </div>
    );
  }
}