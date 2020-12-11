import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  saveStudentBasicInfo(requestDto) {
    return this.http.post<any>(environment.api_base_url + '/saveStudentDetail', requestDto);
  }

  getStates() {
    return this.http.get<any>(environment.api_base_url + '/getState');
  }

  getDistrictsByState(stateId) {
    let params = new HttpParams();
    params = params.set('stateId', stateId);
    return this.http.get<any>(environment.api_base_url + '/getDistrict', { params });
  }

  getBlocksByDistrict(districtId) {
    let params = new HttpParams();
    params = params.set('districtId', districtId);
    return this.http.get<any>(environment.api_base_url + '/getBlock', { params });
  }

  getStudents() {
    return this.http.get<any>(environment.api_base_url + '/students');
  }

  saveStudentEducationInfo(requestDto) {
    return this.http.post<any>(environment.api_base_url + '/saveEducationDetail', requestDto);
  }

  saveStudentResultDetail(requestDto) {
    return this.http.post<any>(environment.api_base_url + '/saveResultDetail', requestDto);
  }

  saveStudentIncentiveDetail(requestDto) {
    return this.http.post<any>(environment.api_base_url + '/saveIncentiveDetail', requestDto);
  }

  saveStudentVocationalDetail(requestDto) {
    return this.http.post<any>(environment.api_base_url + '/saveVocationalDetail', requestDto);
  }

  getStudentBasicInfoById(studentId, udiseCode) {
    let params = new HttpParams();
    params = params.set('studentId', studentId)
    params = params.set('udiseCode', udiseCode)

    return this.http.get<any>(environment.api_base_url + '/viewStubasicDetail', { params });
  }

  getStudentSummary(stdSearchParam) {
    let params = new HttpParams();
    params = params.set('className', stdSearchParam.class)
    params = params.set('section', stdSearchParam.section)
    params = params.set('udiseCode', stdSearchParam.udiseCode)
    return this.http.get<any>(environment.api_base_url + '/getStudentList', { params });
  }

  getEducationDetail(studentId, schoolId) {
    let params = new HttpParams();
    params = params.set('studentId', studentId)
    params = params.set('schoolId', schoolId)
    return this.http.get<any>(environment.api_base_url + '/viewEducationDetail', { params });
  }

  getIncentiveDetail(studentId, schoolId) {
    let params = new HttpParams();
    params = params.set('studentId', studentId)
    params = params.set('schoolId', schoolId)
    return this.http.get<any>(environment.api_base_url + '/viewIncentiveDetail', { params });
  }

  getVocationDetail(studentId, schoolId) {
    let params = new HttpParams();
    params = params.set('studentId', studentId)
    params = params.set('schoolId', schoolId)
    return this.http.get<any>(environment.api_base_url + '/viewVocationalDetail', { params });
  }

  getResultDetail(studentId, schoolId) {
    let params = new HttpParams();
    params = params.set('studentId', studentId)
    params = params.set('schoolId', schoolId)
    return this.http.get<any>(environment.api_base_url + '/viewResultDetail', { params });
  }

  getSchoolDashboard(udiseCode) {
    let params = new HttpParams();
    params = params.set('udiseCode', udiseCode)
    return this.http.get<any>(environment.api_base_url + '/getSchoolDasboard', { params });
  }

  getBlockDashboard(blockCode) {
    let params = new HttpParams();
    params = params.set('blockCode', blockCode)
    return this.http.get<any>(environment.api_base_url + '/getBlockDasboard', { params });
  }

  saveSectionMst(requestDto) {
    return this.http.post<any>(environment.api_base_url + '/saveClassSection', requestDto);
  }

  getClassSection(className, udiseCode) {
    console.log(udiseCode)
    let params = new HttpParams();
    params = params.set('className', className)
    params = params.set('schoolId', udiseCode)
    return this.http.get<any>(environment.api_base_url + '/getClassSection', { params });
  }

  getAllSchoolByBlock(blockCode, page, limit) {
    let params = new HttpParams();
    params = params.set('blockCode', blockCode)
    params = params.set('page', page)
    params = params.set('pageLimit', limit)
    return this.http.get<any>('https://api.udiseplus.gov.in/v1/public/schoolMaster/byBlockCode', {params})
  }

  getSchoolByUdise(udiseCode) {
    let params = new HttpParams();
    params = params.set('udiseCode', udiseCode)
    return this.http.get<any>('https://api.udiseplus.gov.in/v1/public/schoolMaster/byUdiseCode', {params})
  }

}
