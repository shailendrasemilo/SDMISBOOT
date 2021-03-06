import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-incentive',
  templateUrl: './student-incentive.component.html',
  styleUrls: ['./student-incentive.component.css']
})
export class StudentIncentiveComponent implements OnInit {
  @Output() incentiveEvent = new EventEmitter<any>();
  incentiveDetail: any = {};
  requestDTO: any = {};
  constructor(public common: CommonService, private http: HttpService) { }
  userObj: any = {};

  uniformList: any = [{ name: 'None', value: 0 }, { name: 'One Set', value: 1 }, { name: 'Two Set', value: 2 }, { name: 'Partial', value: 3 }];
  cwsnFacility: any = [];
  splTrainingList: any = [{name: "Not Applicable", value: "0"},
  {name: "KGBV", value: "1"}, 
  {name: "Non KGBV (Government)", value: "2"},
  {name: "Girls Hostel", value: "3"},
  {name: "Others", value: "4"},
  {name: "None", value: "5"}]

  alertCount: number = 0;
  alertMsg: String;
  alertFlag: boolean = false;

  ngOnInit(): void {
    this.userObj = this.common.userObj;
    if (this.common.studentAction == 'edit') {
      this.getIncentiveDetail(this.common.stdIdEdit, this.common.schoolDetail.udiseCode);
    }
    this.getCwsnList();
  }

  getCwsnList() {
    this.http.getCwsnList().subscribe(res => {
      console.log('cwsn', res)
      if(res.statusCode == environment.httpSuccess) {
        this.cwsnFacility = res.data.result
      }
    }) 
  }

  sendIncentiveDetail() {
    if (this.common.studentAction == 'add') {
      this.incentiveDetail.studentId = this.common.generatedStudentId;
    }
    else if (this.common.studentAction == 'edit') {
      this.incentiveDetail.studentId = this.common.stdIdEdit;
    }
    this.requestDTO.incentiveDetail = this.incentiveDetail;
    this.saveIncentiveInfo();
  }

  saveIncentiveInfo() {
    this.http.saveStudentIncentiveDetail(this.requestDTO).subscribe(res => {
      console.log(res)
      if (res.statusCode == environment.successCode) {
        if (this.common.studentAction == 'edit') {
          this.getIncentiveDetail(this.common.stdIdEdit, this.common.schoolDetail.udiseCode);
        }
        this.incentiveEvent.emit();
      } else {
        this.alertMsg = res.description;
        this.alertCount = this.alertCount + 1;
        this.alertFlag = true;
      }
    }, error => {
      this.alertMsg = "Some problem occurred while saving data. Please try again.";
      this.alertCount = this.alertCount + 1;
      this.alertFlag = true;
    })
  }

  getIncentiveDetail(studentId, schoolId) {
    this.http.getIncentiveDetail(studentId, schoolId).subscribe(res => {
      console.log(res)
      if (res.incentiveDetail) {
        this.incentiveDetail = res.incentiveDetail;
      }
      console.log(this.incentiveDetail)
    }, error => {
      console.log(error)
    })
  }

}
