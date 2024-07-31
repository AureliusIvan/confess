"use server"

import React from "react";

async function PrivacyPolicy() {
  return (
      <section className={'bg-white m-5 p-6'}>
        <h1 className={'text-bold'}>
          Privacy Policy
        </h1>

        <p className={'space-y-1.5'}>
          Your privacy is important to us, we will not store any of your data.

          <br/>
        </p>
      </section>
  );
}

export default PrivacyPolicy;