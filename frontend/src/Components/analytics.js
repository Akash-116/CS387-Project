import React, { Fragment } from 'react';
import testAnalytics from './TestData/testAnalytics';

const Analytics = () => {



    return (
        <Fragment>



            <div className='container'>
                <h2>Analytics</h2>
                <table class="table table-hover">
                    <tbody>
                        <tr></tr>
                        <tr>
                            <td>Best Customer</td>
                            <td>{testAnalytics.bestCustomer} </td>
                        </tr>
                        <tr>
                            <td>Best Employee</td>
                            <td>{testAnalytics.bestEmployee} </td>
                        </tr>
                        <tr>
                            <td>Top Dish</td>
                            <td>{testAnalytics.topDishOrdered} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </Fragment>
    );
};



export default Analytics;
