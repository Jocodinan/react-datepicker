import React, { Component } from 'react';
import moment from 'moment';

export default class CalendarDays extends Component{
	getMonthWeeks(){
    const {showingDate, selectedDate, onSelectedDay, dateFormat} = this.props,
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
			const currentDay = firstOfMonth.clone().add(j, 'days'),
            selectedDateOnMonth = moment(selectedDate).clone();

			let activeClass = '';
			if(selectedDateOnMonth.isSame(currentDay, 'year') && selectedDateOnMonth.isSame(currentDay, 'month') && selectedDateOnMonth.isSame(currentDay, 'day')){
				activeClass = 'active';
			}

      days.push(
        <div className="datepicker-calendar-day-holder" key={`day-${j}`}>
          <div className={`datepicker-calendar-day ${activeClass}`} onClick={ onSelectedDay.bind(null, currentDay.format(dateFormat)) }>
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