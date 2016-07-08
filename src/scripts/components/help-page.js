import React from 'react';

import PageBackButton from '../components/page-back-button';


export default function HelpPage() {
  return (
    <section className="page help-page">
      <section className="page-content">
        <div className="page-back-button-container">
          <PageBackButton icon text="close" />
        </div>
        <h1>Hekp</h1>
      </section>
    </section>
  );
}
