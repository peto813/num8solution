import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class DateEx {

	  constructor(
	    public startDate: NgbDateStruct,
	    public numberDays: number,
	    public countryCode: string
	  ) {  }


  	set _startDate(s) {
		//if (this.startDate){
			var tempDate;
			var dateString = String(s).split("/");
			if (dateString.length===3){
				tempDate =  new Date(parseInt(dateString[2]), parseInt(dateString[0])-1,parseInt(dateString[1]));
				this.startDate ={ day: tempDate.getUTCDate(), month: tempDate.getUTCMonth() + 1, year: tempDate.getUTCFullYear()};
			}
		//}
	}
}
