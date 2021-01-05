import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-education',
  templateUrl: './student-education.component.html',
  styleUrls: ['./student-education.component.css']
})
export class StudentEducationComponent implements OnInit {
  @Output() educationEvent = new EventEmitter<any>();
  educationDetail: any = {};
  requestDto: any = {};
  classList: any = [];
  moiList: any = [{ name: 'Hindi', id: 1 }, { name: 'English', id: 2 }];
  statusList: any = []
  userObj: any = {};

  alertCount: number = 0;
  alertMsg: String;
  alertFlag: boolean = false;

  constructor(public common: CommonService, private http: HttpService) { }

  ngOnInit(): void {
    this.common.schoolDetail = JSON.parse(sessionStorage.getItem('schoolDetail'))
    this.userObj = this.common.userObj;
    if (this.common.studentAction == 'edit') {
      this.getEducationDetail(this.common.stdIdEdit, this.common.schoolDetail.udiseCode);
    }
    this.http.getMoiMaster(this.common.schoolDetail.stateCode).subscribe(res => {
      console.log(res)
      if (res.statusCode == environment.httpSuccess) {
        this.moiList = res.data.result;
      }
    })
    let classinterval = setInterval(() => {
      if (this.common.stdClass) {
        if (this.common.stdClass == '1') {
          this.http.getSchoolingStatus().subscribe(res => {
            if (res.statusCode == environment.httpSuccess) {
              this.statusList = res.data.result;
              console.log(this.statusList)
            } else {
              console.log("prev status error")
            }
            clearInterval(classinterval);

          })
        } else {
          clearInterval(classinterval);
        }
      } else {
        clearInterval(classinterval);
      }
    }, 1)


      if (this.common.schoolDetail) {
        this.classList = this.common.createSchoolClassList(this.common.schoolDetail.classFrom, this.common.schoolDetail.classTo)
      }
  }


  sendEducationInfo() {
    if (this.common.studentAction == 'add') {
      this.educationDetail.studentId = this.common.generatedStudentId;
    }
    else if (this.common.studentAction == 'edit') {
      this.educationDetail.studentId = this.common.stdIdEdit;
    }
    this.requestDto.educationDetail = this.educationDetail
    this.saveEducationInfo();
  }

  getEducationDetail(studentId, schoolId) {
    this.http.getEducationDetail(studentId, schoolId).subscribe(res => {
      console.log(res)
      if (res.educationDetail) {
        this.educationDetail = res.educationDetail;
        console.log(this.classList)
      }
    }, error => {
      console.log(error)
    })
  }



  saveEducationInfo() {
    this.http.saveStudentEducationInfo(this.requestDto).subscribe(res => {
      console.log(res);
      if (res.statusCode == environment.successCode) {

        if (this.common.studentAction == 'edit') {
          this.getEducationDetail(this.common.stdIdEdit, this.common.schoolDetail.udiseCode);
        }
        this.educationEvent.emit();
      } else {
        this.alertMsg = res.description;
        this.alertCount = this.alertCount + 1;
        this.alertFlag = true;
      }
    }, error => {
      console.log(error)
      this.alertMsg = "Some problem occurred while saving data. Please try again.";
      this.alertCount = this.alertCount + 1;
      this.alertFlag = true;
    })
  }
}