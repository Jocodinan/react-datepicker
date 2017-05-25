import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Calendar from './calendar.jsx';

require("moment/min/locales.min");

export default class DatePicker extends Component{
  constructor(props){
    super(props);
    const { startDate, endDate, dateFormat, lang } = this.props;

    moment.locale(lang);

    this.showCalendar = this.showCalendar.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.onCalendarMouseEnter = this.onCalendarMouseEnter.bind(this);
    this.onCalendarMouseLeave = this.onCalendarMouseLeave.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onSelectedDay = this.onSelectedDay.bind(this);

    this.state = {
      startDate: moment(startDate).clone().format(dateFormat),
      endDate: endDate ? moment(endDate).clone().format(dateFormat) : null,
      showingDate: moment(startDate).clone().format(dateFormat),
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
          {startDate} = this.state,
          useRangePicker = rangePicker ? !this.state.selectingRangeDate : false,
          statesOptions = {
            selectingRangeDate: useRangePicker,
            visible: rangePicker && useRangePicker ? true : false
          }
    
    if(rangePicker){
      statesOptions.endDate = date;
      if(useRangePicker){
        statesOptions.startDate = date;
      }
    }else{
      statesOptions.startDate = date;
    }

    this.setState(statesOptions);

    if(rangePicker){
      if(!useRangePicker){
        selectDateCallback(`${startDate} - ${date}`);
      }
    }else{
      selectDateCallback(date);
    }
  }
  render(){
    const { datePickerHolderClass, inputClass, inputName, rangePicker } = this.props,
          { startDate, endDate } = this.state,
          inputValue = rangePicker && endDate ? `${startDate} - ${endDate}` : startDate;

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
          startDate={ startDate }
        />
      );
    }

    return (
      <div className={datePickerHolderClass}>
        <input 
          className={inputClass} 
          type="text" name={inputName} 
          value={inputValue} 
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
  startDate: new Date(),
  dateFormat: "DD-MM-YYYY",
  datePickerHolderClass: "datepicker-holder",
  lang: 'es',
  rangePicker: false
}