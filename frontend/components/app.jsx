import React from 'react';
import NavbarContainer from './navbar/navbar_container';

const App = ({children}) => (
  <div>
    <NavbarContainer />
    <main>
      {children}
    </main>
  </div>
);

export default App;
