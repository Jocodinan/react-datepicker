import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonthHeader from './month-header.jsx';
import WeekHeader from './week-header.jsx';
import CalendarDays from './calendar-days.jsx';

export default class Calendar extends Component{
  componentDidMount(){
    window.addEventListener('mousedown', this.props.pageClick, false);
  }
  componentWillUnmount(){
    window.removeEventListener('mousedown', this.props.pageClick, false);
  }
  render(){
    const {onCalendarMouseEnter, onCalendarMouseLeave, visible} = this.props;
    return (
      <div 
        className={`datepicker-calendar ${visible}`} 
        onMouseEnter={onCalendarMouseEnter} 
        onMouseLeave={onCalendarMouseLeave}>
        <MonthHeader { ...this.props } />
        <WeekHeader { ...this.props } />
        <CalendarDays { ...this.props } />
      </div>
    );
  }
}

Calendar.propTypes = {
  pageClick: PropTypes.func,
  onCalendarMouseEnter: PropTypes.func,
  onCalendarMouseLeave: PropTypes.func,
  onChangeMonth: PropTypes.func,
  onSelectedDay: PropTypes.func
}