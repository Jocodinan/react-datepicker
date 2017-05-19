import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Calendar from './calendar.jsx';

export default class DatePicker extends Component{
  constructor(props){
    super(props);

    this.showCalendar = this.showCalendar.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.onCalendarMouseEnter = this.onCalendarMouseEnter.bind(this);
    this.onCalendarMouseLeave = this.onCalendarMouseLeave.bind(this);

    this.state = {
      selectedDate: this.props.selectedDate,
      visible: false,
      onCalendar: false
    }
  }
  showCalendar(){
    this.setState({ visible: true });
  }
  pageClick(){
    if(!this.state.onCalendar)
      this.setState({ visible: false });
  }
  onCalendarMouseEnter(){
    this.setState({ onCalendar: true });
  }
  onCalendarMouseLeave(){
    this.setState({ onCalendar: false });
  }
  render(){
    const props = this.props;

    let calendar = null;

    if(this.state.visible){
      calendar = (
        <Calendar 
          { ...this.state } 
          { ...props }
          pageClick={this.pageClick}
          onCalendarMouseEnter={this.onCalendarMouseEnter}
          onCalendarMouseLeave={this.onCalendarMouseLeave}
        />
      );
    }

    return (
      <div className="datepicker-holder">
        <input 
          className={props.className} 
          type="text" name={props.inputName} 
          value={this.state.selectedDate} 
          onClick={this.showCalendar}
          readOnly
        />
        <CSSTransitionGroup
          transitionName="fade-in"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          { calendar }
        </CSSTransitionGroup>
      </div>
    );
  }
}

DatePicker.propTypes = {
  inputName: PropTypes.string.isRequired,
  className: PropTypes.string,
  // selectedDate: PropTypes.date,
  dateFormat: PropTypes.string,
  lang: PropTypes.string
}

DatePicker.defaultProps = {
  selectedDate: new Date(),
  lang: 'es'
}