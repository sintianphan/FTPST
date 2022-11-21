import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import classnames from 'classnames'

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import {
    Fab,
    IconButton
} from '@mui/material'
import { connect } from 'react-redux';
// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link } from '../Wrappers'
import ColorChangeThemePopper from './components/ColorChangeThemePopper'

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard'
import BreadCrumbs from '../../components/BreadCrumbs'

// context
import { useLayoutState } from '../../context/LayoutContext'

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import CustomerFormPage from 'pages/CRUD/Customer/form/CustomerFormPage';
import CustomerTablePage from 'pages/CRUD/Customer/table/CustomerTablePage';

import ItemFormPage from 'pages/CRUD/Item/form/ItemFormPage';
import ItemTablePage from 'pages/CRUD/Item/table/ItemTablePage';

import ChartofaccountFormPage from 'pages/CRUD/Chartofaccount/form/ChartofaccountFormPage';
import ChartofaccountTablePage from 'pages/CRUD/Chartofaccount/table/ChartofaccountTablePage';

import SupplierFormPage from 'pages/CRUD/Supplier/form/SupplierFormPage';
import SupplierTablePage from 'pages/CRUD/Supplier/table/SupplierTablePage';

import ServiceFormPage from 'pages/CRUD/Service/form/ServiceFormPage';
import ServiceTablePage from 'pages/CRUD/Service/table/ServiceTablePage';

import StateFormPage from 'pages/CRUD/State/form/StateFormPage';
import StateTablePage from 'pages/CRUD/State/table/StateTablePage';

import CountryFormPage from 'pages/CRUD/Country/form/CountryFormPage';
import CountryTablePage from 'pages/CRUD/Country/table/CountryTablePage';

import CityFormPage from 'pages/CRUD/City/form/CityFormPage';
import CityTablePage from 'pages/CRUD/City/table/CityTablePage';

import ItemgroupFormPage from 'pages/CRUD/Itemgroup/form/ItemgroupFormPage';
import ItemgroupTablePage from 'pages/CRUD/Itemgroup/table/ItemgroupTablePage';

import SalesorderFormPage from 'pages/CRUD/Salesorder/form/SalesorderFormPage';
import SalesorderTablePage from 'pages/CRUD/Salesorder/table/SalesorderTablePage';

import SalesorderdetailsFormPage from 'pages/CRUD/Salesorderdetails/form/SalesorderdetailsFormPage';
import SalesorderdetailsTablePage from 'pages/CRUD/Salesorderdetails/table/SalesorderdetailsTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url))
  return <span>Redirecting...</span>;
}

function Layout(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    // global
    let layoutState = useLayoutState()

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Sidebar />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <BreadCrumbs />
                <Switch>

                    <Route path="/admin/dashboard" component={Dashboard} />
                    <Route path="/admin/user/edit" component={EditUser} />
                    <Route
                      path={'/admin/api-docs'}
                      exact
                      component={(props) => <Redirect url={process.env.NODE_ENV === 'production'
                        ? window.location.origin + '/api-docs'
                        : 'http://localhost:8080/api-docs'} {...props}/>}
                    />

                    <Route path={"/admin/users"} exact component={UsersTablePage} />
                    <Route path={"/admin/users/new"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id/edit"} exact component={UsersFormPage} />

                    <Route path={"/admin/customer"} exact component={CustomerTablePage} />
                    <Route path={"/admin/customer/new"} exact component={CustomerFormPage} />
                    <Route path={"/admin/customer/:id/edit"} exact component={CustomerFormPage} />

                    <Route path={"/admin/item"} exact component={ItemTablePage} />
                    <Route path={"/admin/item/new"} exact component={ItemFormPage} />
                    <Route path={"/admin/item/:id/edit"} exact component={ItemFormPage} />

                    <Route path={"/admin/chartofaccount"} exact component={ChartofaccountTablePage} />
                    <Route path={"/admin/chartofaccount/new"} exact component={ChartofaccountFormPage} />
                    <Route path={"/admin/chartofaccount/:id/edit"} exact component={ChartofaccountFormPage} />

                    <Route path={"/admin/supplier"} exact component={SupplierTablePage} />
                    <Route path={"/admin/supplier/new"} exact component={SupplierFormPage} />
                    <Route path={"/admin/supplier/:id/edit"} exact component={SupplierFormPage} />

                    <Route path={"/admin/service"} exact component={ServiceTablePage} />
                    <Route path={"/admin/service/new"} exact component={ServiceFormPage} />
                    <Route path={"/admin/service/:id/edit"} exact component={ServiceFormPage} />

                    <Route path={"/admin/state"} exact component={StateTablePage} />
                    <Route path={"/admin/state/new"} exact component={StateFormPage} />
                    <Route path={"/admin/state/:id/edit"} exact component={StateFormPage} />

                    <Route path={"/admin/country"} exact component={CountryTablePage} />
                    <Route path={"/admin/country/new"} exact component={CountryFormPage} />
                    <Route path={"/admin/country/:id/edit"} exact component={CountryFormPage} />

                    <Route path={"/admin/city"} exact component={CityTablePage} />
                    <Route path={"/admin/city/new"} exact component={CityFormPage} />
                    <Route path={"/admin/city/:id/edit"} exact component={CityFormPage} />

                    <Route path={"/admin/itemgroup"} exact component={ItemgroupTablePage} />
                    <Route path={"/admin/itemgroup/new"} exact component={ItemgroupFormPage} />
                    <Route path={"/admin/itemgroup/:id/edit"} exact component={ItemgroupFormPage} />

                    <Route path={"/admin/salesorder"} exact component={SalesorderTablePage} />
                    <Route path={"/admin/salesorder/new"} exact component={SalesorderFormPage} />
                    <Route path={"/admin/salesorder/:id/edit"} exact component={SalesorderFormPage} />

                    <Route path={"/admin/salesorderdetails"} exact component={SalesorderdetailsTablePage} />
                    <Route path={"/admin/salesorderdetails/new"} exact component={SalesorderdetailsFormPage} />
                    <Route path={"/admin/salesorderdetails/:id/edit"} exact component={SalesorderdetailsFormPage} />

                </Switch>
                <Fab
                    color="primary"
                    aria-label="settings"
                    onClick={e => handleClick(e)}
                    className={classes.changeThemeFab}
                    style={{ zIndex: 100 }}
                >
                    <SettingsIcon style={{ color: '#fff' }} />
                </Fab>
                <ColorChangeThemePopper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                />
                <Footer>
                    <div>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Flatlogic
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/about'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            About Us
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/blog'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Blog
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={'https://www.facebook.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="facebook">
                              <FacebookIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://twitter.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="twitter">
                              <TwitterIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://github.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton
                                aria-label="github"
                                style={{ padding: '12px 0 12px 12px' }}
                            >
                              <GithubIcon style={{ color: '#6E6E6E99' }} />
                            </IconButton>
                        </Link>
                    </div>
                </Footer>
            </div>
        </div>
    )
}

export default withRouter(connect()(Layout))
