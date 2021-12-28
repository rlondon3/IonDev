// Create const from data from plan.js
const service = plan.service_requirements; //Get start date and end date
const checkIns = plan; //Get checkin date
const enrollmentPlan1 = enrollment[0].enrollment_days; //Get enrollment_days- 2 records for when ss was enrolled ;
const enrollmentPlan2 = enrollment[1].enrollment_days; //Get enrollment_days- 2 records for when ss was enrolled ;
const schoolYear = school_years; //Get day_events. Define days with instruction in a variable;
const studentRecord = plan;

//Get School year start dates and end dates
const schoolStartDate2020 = JSJoda.ZonedDateTime.parse(
  schoolYear[0].start_date
);
const schoolEndDate2021 = JSJoda.ZonedDateTime.parse(schoolYear[0].end_date);
const schoolStartDate2021 = JSJoda.ZonedDateTime.parse(
  schoolYear[1].start_date
);
const schoolEndDate2022 = JSJoda.ZonedDateTime.parse(schoolYear[1].end_date);

//Get total num of days student was enrolled in 2020 and 2021
const enrollment2020 = enrollmentPlan1.filter((x) => x.date.includes('2020'));
const begin2021toMid2021Enrollment = enrollmentPlan1.filter((x) =>
  x.date.includes('2021')
);
const mid2021toEnd2021Enrollment = enrollmentPlan2.filter((x) =>
  x.date.includes('2021')
);

const enrollment2020to2021 =
  enrollment2020.length +
  begin2021toMid2021Enrollment.length +
  mid2021toEnd2021Enrollment.length;

//Get total num of days student was present for instruction in 2020 and 2021
const attendance2020 = schoolYear[0].day_events.filter(
  (x) => x.attendance === true && x.instruction === true && x.date.year === 2020
).length;
const attendanceBegin2021toMid2021 = schoolYear[0].day_events.filter(
  (x) => x.attendance === true && x.instruction === true && x.date.year === 2021
).length;
const attendanceMid2021toEnd2021 = schoolYear[1].day_events.filter(
  (x) => x.attendance === true && x.instruction === true && x.date.year === 2021
).length;
const attenanceTotal2021 =
  attendanceBegin2021toMid2021 + attendanceMid2021toEnd2021;

//2022 Attendance? But no enrollment???
const attendanceMid2021toEnd2021a = schoolYear[1].day_events.filter(
  (x) => x.attendance === true && x.date.year === 2022
);

//Get Service Ids
const serviceId1 = service[0].dictionary_id;
const serviceId2 = service[1].dictionary_id;
const serviceId3 = service[2].dictionary_id;
const serviceId4 = service[3].dictionary_id;

//Get Checkin dates for services based on serviceIds

const servicesReceived = checkIns.checkins.filter(
  (x) =>
    x.service_type_id === serviceId1 ||
    x.service_type_id === serviceId2 ||
    x.service_type_id === serviceId3 ||
    x.service_type_id === serviceId4
).length;

//Services start and end dates
const serviceStartDate = JSJoda.LocalDate.parse(service[0].start_date);
const serviceEndDate = JSJoda.LocalDate.parse(service[0].end_date);

//Get Percentage of services received

const percentOfServicesReceived =
  servicesReceived / attendanceMid2021toEnd2021 + '%';

//Get Percentage of services expected
const expectedServicesPeriod = serviceStartDate.until(
  serviceEndDate,
  JSJoda.ChronoUnit.DAYS
);
//-125 days to months of 20 days of instruction
const subtractedDays = 125;
const totalNumOfSchoolDays2020to2021 =
  schoolStartDate2020.until(schoolEndDate2021, JSJoda.ChronoUnit.DAYS) -
  subtractedDays;
const totalNumOfSchoolDays2021to2022 =
  schoolStartDate2021.until(schoolEndDate2022, JSJoda.ChronoUnit.DAYS) -
  subtractedDays;

const percentOfExpectedServics =
  Math.floor(
    enrollment2020to2021 / totalNumOfSchoolDays2020to2021 +
      totalNumOfSchoolDays2021to2022
  ) + '%';

console.log(percentOfExpectedServics);
//Trigger the build
$(document).ready(function () {});
