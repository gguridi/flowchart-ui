import React from "react";
import AdminLTE, {Navbar, ControlSidebar, AsyncContent, AsyncComponent, Sidebar, Footer} from "adminlte-2-react";
import { HashRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Admin extends AdminLTE {

  render() {
    let {
      children, title, titleShort,
    } = this.props;
    const { searchbarFilter } = this.props;
    const { homeTo } = this.props;
    {
      if (!children) children = [<div>No content</div>];
      if (!children.length) { children = [children]; }
      let temp = children.filter(p => Object.prototype.toString.call(p) !== '[object Array]');
      children.filter(p => Object.prototype.toString.call(p) === '[object Array]').forEach((p) => { temp = temp.concat(p); });
      children = temp;
    }
    if (!title.length) {
      title = [title];
    }
    const [titleBold, titlethin = ''] = title;
    if (!titleShort.length) {
      titleShort = [titleShort];
    }
    const [titleShortBold, titleShotThin = ''] = titleShort;
    let [menu] = children && children.length && children.filter(p => p.type === Navbar.Core);
    if (children.findIndex(p => p.type === ControlSidebar) > 0) {
      menu = React.cloneElement(menu, { additionalMenus: [React.createElement(Navbar.ControlSidebarEntry, { key: 'control-sidebar-entry' })] });
    }
    const content = children.filter(p => p !== menu);
    const routes = content.filter(p => (p.props && p.props.path) || (typeof p.type === 'function' && p.type === Redirect)).map((P) => {
      if (P.type !== Route || P.type !== Redirect) {
        if (P.type === AsyncContent) {
          return (
            <Route
              modal={P.props.modal}
              key={P.props.path}
              path={P.props.path}
              exact={P.props.exact}
              component={AsyncComponent(() => import(P.props.component))}
            />
          );
        }
        return (
          <Route
            modal={P.props.modal}
            key={P.props.path}
            path={P.props.path}
            exact={P.props.exact}
            render={props => React.cloneElement(P,
              { key: P.props.key ? P.props.key : P.props.path, ...props })}
          />
        );
      }
      return P;
    });
    const nonModalRoutes = routes.filter(p => !p.props.modal);
    const modalRoutes = routes.filter(p => p.props.modal);

    const childSidebar = content.find(p => p.type === Sidebar.Core);
    const childFooter = content.find(p => p.type === Footer);
    const {
      sidebar: propSidebar,
      // controlSidebar,
      footer: propFooter,
    } = this.props;

    if (childSidebar && propSidebar) {
      // eslint-disable-next-line no-console
      console.error('Pass sidebar either as prop or child but not both');
    }

    if (childFooter && propFooter) {
      // eslint-disable-next-line no-console
      console.error('Pass footer either as prop or child but not both');
    }
    const sidebar = childSidebar || (
      <Sidebar.Core searchbarFilter={searchbarFilter}>
        {propSidebar}
      </Sidebar.Core>
    );
    const footer = childFooter || propFooter;

    return (
      <Router>
        <div className="wrapper">
          <header className="main-header">
            <Link className="logo" to={homeTo}>
              <span className="logo-mini">
                <b>{titleShortBold}</b>
                {titleShotThin}
              </span>
              <span className="logo-lg">
                <b>{titleBold}</b>
                {titlethin}
              </span>
            </Link>
            <nav className="navbar navbar-static-top">
              <div className="sidebar-toggle" data-toggle="push-menu" role="button">
                <FontAwesomeIcon icon={['fas', 'bars']} />
                <span className="sr-only">Toggle navigation</span>
              </div>
              <div className="navbar-custom-menu">
                {menu}
              </div>
            </nav>
          </header>
          {sidebar}
          <Switch>
            {modalRoutes}
          </Switch>
          <div className="content-wrapper">
            <Switch>
              {nonModalRoutes}
            </Switch>
          </div>
          {footer}
        </div>
      </Router>
    );
  }
}
