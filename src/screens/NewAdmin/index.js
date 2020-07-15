import React from 'react';
import { withReduxProvider } from 'redux/redux-provider';
import { CTLayout, CTFragment } from 'layout';
import { links } from 'utils';
import { Route, Redirect } from 'react-router-dom';
import {
    setup,
    adminStore,
    connectWithRedux
} from './controllers';
import { Universities } from './Universities';
import { Terms } from './Terms';
import { Departments } from './Departments';
import { Courses } from './Courses';
import { Instructors } from './Instructors';
import { More } from './More';
import { LoginAsUser } from './LoginAsUser';

class AdminWithRedux extends React.Component {
    constructor(props) {
        super();
        setup.init(props);
    }

    componentDidMount() {
        setup.setupAdminPage();
        links.title('Admin');
    }

    render() {
        const layoutProps = CTLayout.createProps({
            transition: true,
            responsive: true,
            footer: true,
            defaultOpenSidebar: true,
            headingProps: {
                subtitle: 'Admin',
            },
        });
    
        return (
          <CTLayout {...layoutProps}>
            <CTFragment>
              <Route exact path="/admin" render={() => <Redirect to="/admin/universities" />} />
              <Route exact path="/admin/universities" component={Universities} />
              <Route exact path="/admin/terms" component={Terms} />
              <Route exact path="/admin/departments" component={Departments} />
              <Route exact path="/admin/course-template" component={Courses} />
              <Route exact path="/admin/instructors" component={Instructors} />
              <Route exact path="/admin/more" component={More} />
              <Route exact path="/admin/login-as-user" component={LoginAsUser} />
            </CTFragment>
          </CTLayout>
        );
    }
}

export const NewAdmin = withReduxProvider(
    AdminWithRedux,
    adminStore,
    connectWithRedux,
    [],
    ['all'],
);