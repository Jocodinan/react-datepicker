import React, { Component } from 'react';
import MonthHeader from './month-header.jsx';
import WeekHeader from './week-header.jsx';

export default class Calendar extends Component{
  componentDidMount(){
    window.addEventListener('mousedown', this.props.pageClick, false);
  }
  componentWillUnmount(){
    window.removeEventListener('mousedown', this.props.pageClick, false);
  }
  render(){
    return (
      <div className={`datepicker-calendar ${this.props.visible}`} onMouseEnter={this.props.onCalendarMouseEnter} onMouseLeave={this.props.onCalendarMouseLeave}>
        <MonthHeader { ...this.props } />
        <WeekHeader { ...this.props } />
      </div>
    );
  }
}