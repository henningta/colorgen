import React from 'react';

import '../styles/spinner.module.css';

const Spinner: React.FC = () => (
  <div>
    <div className="spinner">
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  </div>
);

export default Spinner;
