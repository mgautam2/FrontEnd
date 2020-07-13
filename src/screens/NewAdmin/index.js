import React from 'react';
import { withReduxProvider } from 'redux/redux-provider';
import { CTLayout } from 'layout';
import { links } from 'utils';
import {
    setup,
    adminStore,
    connectWithRedux
} from './controllers';

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
            headingProps: {
                heading: 'Admin',
                icon: 'search',
                sticky: true,
                gradient: true,
                offsetTop: 30,
            },
        });
    
        return (
          <CTLayout {...layoutProps}>
            Here is new admin page
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