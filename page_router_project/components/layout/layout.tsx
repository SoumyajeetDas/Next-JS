import { Fragment, ReactNode } from 'react';

import MainNavigation from './main-navigation';

const Layout: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
