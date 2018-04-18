import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import {NgForm, FormsModule} from '@angular/forms';
import {DateEx} from './date-ex'
import {NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';


const I18N_VALUES = {
  'cu': {
    weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
   months: ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
  // other languages you would support
};

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return "";
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbDateCuParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            if(dateParts.length === 3&&dateParts[2].length===4&&dateParts[0].length===2&&dateParts[1].length===2){
            	//return null;
            	console.log(dateParts)
            	return {year: toInteger(dateParts[2]), month: toInteger(dateParts[0]), day: toInteger(dateParts[1])};
            }

        }   
        return null;
    }

    format(date: NgbDateStruct): string {
    	console.log('a')
        let stringDate: string = ""; 
        if(date) {
        	stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
            stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
            stringDate += date.year;
        }
        return stringDate;
    }
}

@Injectable()
export class I18n {
  language = 'cu';
}


	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css'],
	  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateCuParserFormatter}]
	})
	export class AppComponent extends NgbDatepickerI18n{
	//used for start date validation
	datePattern = '~(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d~';
	date;
	constructor(private _i18n: I18n, dateFormatter:NgbDateParserFormatter) {
		super();
	}
	  


	  getWeekdayShortName(weekday: number): string {
	    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
	  }
	  getMonthShortName(month: number): string {
	    return I18N_VALUES[this._i18n.language].months[month - 1];
	  }
	  getMonthFullName(month: number): string {
	    return this.getMonthShortName(month);
	  }

	title = 'Number 8 Excersize';

	model = new DateEx(
		  	undefined,
			undefined,
			'',
	);





	holidays=[
		{month:7, day:4},
		{month:12, day:24},
		{month:1, day:1},
		{month:12, day:25},
		{month:11, day:11}
	];
	

	//CALENDAR CODE
	datemodel: NgbDateStruct;

	isWeekend(date: NgbDateStruct) {
		const d = new Date(date.year, date.month - 1, date.day);
		return d.getDay() === 0 || d.getDay() === 6;
	}

	isDisabled(date: NgbDateStruct, current: {month: number}) {
		return date.month !== current.month;
	}

	///////////




 	addDays(): NgbDateStruct {
 		try{
 		  var dat = new Date(Date.UTC(this.model.startDate.year, this.model.startDate.month-1, this.model.startDate.day ));
		  dat.setDate(dat.getDate() + this.model.numberDays);
		  var datNgb ={ year: dat.getUTCFullYear(), month: dat.getUTCMonth() + 1 ,day: dat.getUTCDate()};
		  return datNgb;			
 		}
 		catch(e){
 			return this.model.startDate;
 		}

    }


	//returns parsed mininmum date
	get PminDate():NgbDateStruct{
		if(this.model.startDate){
			return this.model.startDate
		}
		return undefined;

	}

	monthDiff() {
		try{
			if(this.model.startDate.year){
				var day1 =new Date(this.model.startDate.year, this.model.startDate.month -1, this.model.startDate.day);

				var day2 = new Date(this.model.startDate.year, this.model.startDate.month-1, this.model.startDate.day );
				day2.setDate(day2.getDate() + this.model.numberDays);

				var d1= day1,d2= day2;

				if(day1<day2){
					d1= day2;
					d2= day1;
				}
				var m= (d1.getFullYear()-d2.getFullYear())*12+(d1.getMonth()-d2.getMonth());
				console.log(m)
				if(m>=1){
					return m+1;
				}else{
					return 1;
				}
			}
		}
		catch(e){
			return 1;
		}
	}


	holyday(date:NgbDateStruct):boolean{
		for (var i=0; i<this.holidays.length;i++){
			if((this.holidays[i].day===date.day )&&(this.holidays[i].month===date.month )  ){
				return true
			}
		}

		return false;
	}


}

