import React from 'react';
import { withReduxProvider } from 'redux/redux-provider';
import { CTLayout } from 'layout';
import { links } from 'utils';
import {
    setup
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
}