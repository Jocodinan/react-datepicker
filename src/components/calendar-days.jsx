import React, { Component } from 'react';
import moment from 'moment';

export default class CalendarDays extends Component{
  constructor(props){
    super(props);

    this.onHoverDay = this.onHoverDay.bind(this);
    this.onSelectedDay = this.onSelectedDay.bind(this);

    this.state = {
      hoverDay: null,
      selectedRange: []
    }
  }
  onSelectedDay(currentDay){
    const { onSelectedDay, dateFormat } = this.props;
    this.setState({
      selectedRange: []
    })
    onSelectedDay(currentDay.format(dateFormat));
  }
  onHoverDay(day){
    const { selectedDate, dateFormat } = this.props,
          { selectedRange } = this.state,
          startDate = moment(selectedDate).clone().hour(12).minute(0).second(0).millisecond(0),
          currentDay = moment(day).clone().hour(12).minute(0).second(0).millisecond(0),
          inRangeDays = [];
    
    let difference;

    if(startDate.isBefore(currentDay)){
      difference = parseInt(moment(currentDay.diff(startDate)).clone().format('DD'));
      for(let i = 0; i < difference; i++){
        inRangeDays.push(currentDay.clone().subtract(i + 1, 'days').format(dateFormat));
      }
    }else if(startDate.isAfter(currentDay)){
      difference = parseInt(moment(startDate.diff(currentDay)).clone().format('DD'));
      for(let i = 0; i < difference; i++){
        inRangeDays.push(currentDay.clone().add(i + 1, 'days').format(dateFormat));
      }
    }         

    this.setState({
      hoverDay: day.hour(12).minute(0).second(0).millisecond(0),
      selectedRange: inRangeDays
    });
  }
  getHoverRangeClass(day){
    //   console.log('up');
    // }else if(startDate.isSame(currentDay)){
    //   console.log('same');
    // }else if(startDate.isAfter(currentDay)){
    //   console.log('down');
    // }
  }
	getMonthWeeks(){
    const {showingDate, selectedDate, onSelectedDay, dateFormat, selectingRangeDate} = this.props,
          {hoverDay, selectedRange} = this.state,
          date = moment(showingDate).clone(),
          daysInMonth = date.clone().daysInMonth(),
          firstOfMonth = date.clone().startOf('month').hour(12),
          lastOfMonth = date.clone().endOf('month').hour(12),
          days = [];
    
    //Days of the previous month
    for(let i = 0; i < firstOfMonth.weekday(); i++){
      days.unshift(
        <div className="datepicker-calendar-day-holder" key={`previous-day-${i}`}>
          <div className="datepicker-calendar-day disable">
            { firstOfMonth.clone().subtract(i + 1, 'days').format('DD') }
          </div>
        </div>
      );
    }

    //Days of the current month
    for(let j = 0; j < daysInMonth; j++){
			const currentDay = firstOfMonth.clone().add(j, 'days').minute(0).second(0).millisecond(0),
            selectedDateOnMonth = moment(selectedDate).clone().hour(12).minute(0).second(0).millisecond(0),
            parsedCurrentDay = currentDay.format(dateFormat);

			let activeClass = '',
          rangeClass = '';

			if(selectedDateOnMonth.isSame(currentDay)){
				activeClass = 'active';
			}

      if(selectingRangeDate){
        if(currentDay.isSame(hoverDay)){
          activeClass = 'active';
        }

        if(selectedRange.includes(parsedCurrentDay)){
          rangeClass = 'in-range'
        }
      }
 
      days.push(
        <div className="datepicker-calendar-day-holder" key={`day-${j}`}>
          <div className={`datepicker-calendar-day ${activeClass} ${rangeClass}`} onClick={ this.onSelectedDay.bind(null, currentDay) } onMouseEnter={this.onHoverDay.bind(null, currentDay)}>
            { currentDay.format('DD') }
          </div>
        </div>
      );
    }

		//Days of the next month
		for(let k = lastOfMonth.weekday(), l = 0;  k < 6; k++, l++){
			days.push(
				<div className="datepicker-calendar-day-holder" key={`next-day-${l}`}>
          <div className="datepicker-calendar-day disable">
            { lastOfMonth.clone().add(l + 1, 'days').format('DD') }
          </div>
        </div>
			);
		}

    return days;
  }
	render(){
		const days = this.getMonthWeeks();

		return (
			<div className="datepicker-calendar-days">
        { days }
      </div>
		);
	}
}