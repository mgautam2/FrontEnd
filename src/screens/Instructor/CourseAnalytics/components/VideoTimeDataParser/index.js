import _ from 'lodash';

export const CourseLogKeywords = {
    'nameIdentifier' : 'CourseLogs',
    'itemName' : 'mediaName',
    'prettierItemName' : 'Video Name',
    'prettierlast1Hr' : 'Last 1 Hour',
    'prettierlast3Days' : 'Last 3 Days',
    'prettierlastWeek' : 'Last Week',
    'prettierlastMonth' : 'Last Month',
    'prettierTotal' : 'Total'
};

export const StudentLogKeywords = {
    'nameIdentifier' : 'StudentLogs',
    'itemName' : 'email',
    'prettierItemName' : 'Student Email',
    'prettierlast1Hr' : 'Last 1 Hour',
    'prettierlast3Days' : 'Last 3 Days',
    'prettierlastWeek' : 'Last Week',
    'prettierlastMonth' : 'Last Month',
    'prettierTotal' : 'Total'
};

export const prettierKeywordsMapped = {
    'Video Name': 'mediaName',
    'Student Email' :  'email',
    'Last 1 Hour': 'last1Hr',
    'Last 3 Days' : "last3Days",
    'Last Week' : "lastWeek",
    'Last Month' : "lastMonth",
    'Total' : "total"
}

export const VideoTimeDataParser = class {
    constructor (offeringId) {
        this.offeringID = offeringId;
        this.logs = null;

        this.REQUEST_SENT_TIME = 15; // The number of seconds a new request is sent
        this.SECS_IN_A_MINUTE = 60;

        /*
            Here is the structure for combined Course Logs 
            {
                 id : {
                    "mediaName": "",
                    "id": "",
                    "last1Hr": 12,
                    "last3Days": 12,
                    "lastWeek": 12,
                    "lastMonth": 12,
                    "total": 12
                }
            }
        */
        this.combinedCourseLogsObject = {};
        this.sortedCourseLogsArray = [];


        /*
            Here is the structure for combined Student Logs 
            {
                id : {
                    "email" : "",
                    "last1Hr": 12,
                    "last3Days": 12,
                    "lastWeek": 12,
                    "lastMonth": 12,
                    "total": 12
                }
            }
        */
        this.combinedStudentLogsObject = {};
        this.sortedStudentLogsArray = [];
    }

    async basicSetup() {
        this.logs = (require('./sampledata.json'));
        this.combineStudentLogs();
        this.sortStudentLogs('total', true);
        this.combineCourseLogs();
    }

    static sortLogs(logsToSort, keyword, descending) {
        let multiplier = 1;
        if (descending) {
            multiplier = -1;
        }
        logsToSort.sort((itemA, itemB) => {
            return (itemA[keyword] - itemB[keyword]) * (multiplier) ;
        });
        return logsToSort; 
    }

    sortStudentLogs(keyword, descending) {
        let multiplier = 1;
        if (descending) {
            multiplier = -1;
        }
        this.sortedStudentLogsArray.sort((studentA, studentB) => {
            return (studentA[keyword] - studentB[keyword]) * (multiplier) ;
        });
    }

    sortCourseLogs(keyword, descending) {
        let multiplier = 1;
        if (descending) {
            multiplier = -1;
        }
        this.sortedCourseLogsArray.sort((courseA, courseB) => {
            return (courseA[keyword] - courseB[keyword]) * (multiplier) ;
        });
    }
    
    combineStudentLogs() {
        this.combinedStudentLogsObject = {};
        this.logs.forEach((student, index) => {
            this.combinedStudentLogsObject[student.user.id] = {};
            this.combinedStudentLogsObject[student.user.id].email = student.user.email;
            this.combinedStudentLogsObject[student.user.id].last1Hr = 0;
            this.combinedStudentLogsObject[student.user.id].last3Days = 0;
            this.combinedStudentLogsObject[student.user.id].lastWeek = 0;
            this.combinedStudentLogsObject[student.user.id].lastMonth = 0;
            this.combinedStudentLogsObject[student.user.id].total = 0;
            student.medias.forEach((media) => {
                this.combinedStudentLogsObject[student.user.id].last1Hr += media.last1Hr;
                this.combinedStudentLogsObject[student.user.id].last3Days += media.last3Days;
                this.combinedStudentLogsObject[student.user.id].lastWeek += media.lastWeek;
                this.combinedStudentLogsObject[student.user.id].lastMonth += media.lastMonth;
                this.combinedStudentLogsObject[student.user.id].total += media.total;
            });            
        });

        Object.values(this.combinedStudentLogsObject).forEach((student) => {
            student.last1Hr = (student.last1Hr * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
            student.last3Days = (student.last3Days * this.REQUEST_SENT_TIME) %
             this.SECS_IN_A_MINUTE;
            student.lastWeek = (student.lastWeek * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
            student.lastMonth = (student.lastMonth * this.REQUEST_SENT_TIME) %
             this.SECS_IN_A_MINUTE;
            student.total = (student.total * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
        });

        this.sortedStudentLogsArray = [];
        let keys = Object.keys(this.combinedStudentLogsObject);
        for (let i = 0; i < keys.length;) {
            this.sortedStudentLogsArray.push(this.combinedStudentLogsObject[keys[i]]);
            i += 1;
        }
        this.sortStudentLogs('total', true);
    }

    combineCourseLogs() {
        this.combinedCourseLogsObject = {};
        this.logs.forEach((student, index) => {
            student.medias.forEach((media) => {
                if (!this.combinedCourseLogsObject[media.id]) {
                    this.combinedCourseLogsObject[media.id] = {};
                    this.combinedCourseLogsObject[media.id].mediaName = media.mediaName;
                    this.combinedCourseLogsObject[media.id].last1Hr = media.last1Hr;
                    this.combinedCourseLogsObject[media.id].last3Days = media.last3Days;
                    this.combinedCourseLogsObject[media.id].lastWeek = media.lastWeek;
                    this.combinedCourseLogsObject[media.id].lastMonth = media.lastMonth;
                    this.combinedCourseLogsObject[media.id].total = media.total;
                } else {
                    this.combinedCourseLogsObject[media.id].last1Hr += media.last1Hr;
                    this.combinedCourseLogsObject[media.id].last3Days += media.last3Days;
                    this.combinedCourseLogsObject[media.id].lastWeek += media.lastWeek;
                    this.combinedCourseLogsObject[media.id].lastMonth += media.lastMonth;
                    this.combinedCourseLogsObject[media.id].total += media.total;
                }
            });
        }); 

        Object.values(this.combinedCourseLogsObject).forEach((course) => {
            course.last1Hr = (course.last1Hr * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
            course.last3Days = (course.last3Days * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
            course.lastWeek = (course.lastWeek * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
            course.lastMonth = (course.lastMonth * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
            course.total = (course.total * this.REQUEST_SENT_TIME) % this.SECS_IN_A_MINUTE;
        });

        this.sortedCourseLogsArray = [];
        let keys = Object.keys(this.combinedCourseLogsObject);
        for (let i = 0; i < keys.length;) {
            this.sortedCourseLogsArray.push(this.sortedCourseLogsArray[keys[i]]);
            i += 1;
        }

        this.sortCourseLogs('total', true);
    }
}

