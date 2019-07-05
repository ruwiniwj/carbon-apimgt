/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Component } from 'react';
import qs from 'qs';
import Alert from 'AppComponents/Shared/Alert';
import PropTypes from 'prop-types';

import AuthManager from 'AppData/AuthManager';
import Configurations from '../../../../site/public/theme/defaultTheme';

/**
 *
 * Handle Logout action from APP
 * @class Logout
 * @extends {Component}
 */
class Logout extends Component {
    /**
     *Creates an instance of Logout.
     * @param {Object} props React component props
     * @memberof Logout
     */
    constructor(props) {
        super(props);
        const { search } = window.location;
        const queryString = search.replace(/^\?/, '');
        /* With QS version up we can directly use {ignoreQueryPrefix: true} option */
        const queryParams = qs.parse(queryString);
        this.referrer = qs.stringify({ referrer: queryParams.referrer || '/' });
        this.state = {
            logoutSuccess: false,
        };
    }

    /**
     *
     *
     * @memberof Logout
     */
    componentDidMount() {
        const authManager = new AuthManager();
        const promisedLogout = authManager.logoutFromEnvironments();
        promisedLogout
            .then(() => this.setState({ logoutSuccess: true }))
            .catch((error) => {
                const message = 'Error while logging out';
                Alert.error(message);
                console.log(error);
            });
    }

    /**
     *
     *
     * @returns {React.Component} Render Logout
     * @memberof Logout
     */
    render() {
        const { logoutSuccess } = this.state;
        if (logoutSuccess) {
            window.location = Configurations.context + '/services/auth/login';
        }
        return logoutSuccess;
    }
}

Logout.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
};

export default Logout;
