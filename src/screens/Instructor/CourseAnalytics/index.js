import React, { Component } from 'react';
import { withReduxProvider } from 'redux/redux-provider';
import { CTLayout, CTFragment } from 'layout';
import { courseStore, connectWithRedux, setup } from './controllers';
import TempVideoTimeTable from './components/TempVideoTimeTable';
import VideoTimeTable from './components/VideoTimeTable';
import { VideoTimeDataParser, CourseLogKeywords, StudentLogKeywords} from './components/VideoTimeDataParser/index';


export class CourseAnalyticsWithRedux extends Component {
  constructor(props) {
    super(props);
    this.offeringId = this.props.match.params.id;
    this.dataParser = null;
    this.state = {
      studentSortedLogs:[],
      courseSortedLogs:[]

    }
    setup.init(props);
  }

  componentDidMount() {
    setup.setupCourseSettingsPage(this.offeringId);
    if (this.offeringId) {
      this.dataParser = new VideoTimeDataParser(this.offeringId);
      this.dataParser.basicSetup();
      let newStudentLogs = 
        VideoTimeDataParser.deepCopyLogsArray(this.dataParser.sortedStudentLogsArray);
      let newCourseLogs = 
        VideoTimeDataParser.deepCopyLogsArray(this.dataParser.sortedCourseLogsArray);
      
      this.setState({studentSortedLogs : newStudentLogs});
      this.setState({courseSortedLogs : newCourseLogs});
    }
  }


  render() {
    const { offering } = this.props;
    const layoutProps = CTLayout.createProps((sidebar) => ({
      transition: true,
      responsive: true,
      footer: true,
      headingProps: {
        heading: 'Course Analytics',
        icon: 'bar_chart',
        sticky: true,
        gradient: true,
        offsetTop: 30,
      },
      sidebarProps: {
        items: sidebar.getCoursePageSidebarItems(offering)
      }
    }));

    return (
      <CTLayout {...layoutProps}>
        <CTFragment padding={[20, 20]} loading={!offering}>
          {(offering && this.dataParser ) && <VideoTimeTable
            logsToDisplay={this.state.studentSortedLogs}
            logsKeyword={StudentLogKeywords}
            offeringId={offering.id}
            tabName='Viewer Statstics'
          />}
          {(offering && this.dataParser ) && <VideoTimeTable
            logsToDisplay={this.state.courseSortedLogs}
            logsKeyword={CourseLogKeywords}
            offeringId={offering.id}
            tabName='Course Statstics'
          />}
        </CTFragment>
      </CTLayout>
    );
  }
}

export const CourseAnalytics = withReduxProvider(
  CourseAnalyticsWithRedux,
  courseStore,
  connectWithRedux,
  ['offering'],
  ['all']
);
