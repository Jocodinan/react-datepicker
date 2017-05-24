import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Calendar from './calendar.jsx';

require("moment/min/locales.min");

export default class DatePicker extends Component{
  constructor(props){
    super(props);
    const { selectedDate, dateFormat, lang } = this.props,
          parseDate = selectedDate ? selectedDate : new Date(),
          date = moment(parseDate).format(dateFormat);

    moment.locale(lang);

    this.showCalendar = this.showCalendar.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.onCalendarMouseEnter = this.onCalendarMouseEnter.bind(this);
    this.onCalendarMouseLeave = this.onCalendarMouseLeave.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onSelectedDay = this.onSelectedDay.bind(this);

    this.state = {
      selectedDate: date,
      endDate: null,
      showingDate: date,
      visible: false,
      onCalendar: false,
      selectingRangeDate: false
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
  onChangeMonth(direction){
    const { dateFormat } = this.props;
    let date = moment(this.state.showingDate).clone();

    if(direction == 'prev'){
      date = date.subtract(1, 'month').format(dateFormat);
    }else{
      date = date.add(1, 'month').format(dateFormat);
    }
    
    this.setState({ showingDate: date });
  }
  onSelectedDay(date){
    const { selectDateCallback, rangePicker } = this.props,
          useRangePicker = rangePicker ? !this.state.selectingRangeDate : false;

    this.setState({
      selectedDate: date,
      selectingRangeDate: useRangePicker,
      visible: rangePicker && useRangePicker ? true : false
    });

    selectDateCallback(date);
  }
  render(){
    const { datePickerHolderClass, inputClass, inputName } = this.props,
          { selectedDate } = this.state; 
    let calendar = null;
    
    if(this.state.visible){
      calendar = (
        <Calendar 
          { ...this.state } 
          { ...this.props }
          pageClick={this.pageClick}
          onCalendarMouseEnter={this.onCalendarMouseEnter}
          onCalendarMouseLeave={this.onCalendarMouseLeave}
          onChangeMonth={this.onChangeMonth}
          onSelectedDay={this.onSelectedDay}
          selectedDate={ selectedDate }
        />
      );
    }

    return (
      <div className={datePickerHolderClass}>
        <input 
          className={inputClass} 
          type="text" name={inputName} 
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
  inputClass: PropTypes.string,
  dateFormat: PropTypes.string,
  datePickerHolderClass: PropTypes.string,
  lang: PropTypes.string,
  rangePicker: PropTypes.bool,
  selectDateCallback: PropTypes.func
}

DatePicker.defaultProps = {
  selectedDate: new Date(),
  dateFormat: "DD-MM-YYYY",
  datePickerHolderClass: "datepicker-holder",
  lang: 'es',
  rangePicker: false
}