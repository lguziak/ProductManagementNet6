import React from "react";

const AboutPage = () => (
  <div>
    <h2>About</h2>
    <p>
      This simple app has fuctionality to add, edit and delete products. There
      are four projects in the solution. Basic DDD principle was followed -
      domain project has no dependencies.
    </p>

    <p>
      The main objective was to integrate NET 6 with EF6 with a new React client
      application. To use it, just follow buttons, click on Products then edit
      or add products. Please refresh the page after change to see the updated
      data on UI. Minimum set of validation has been provided to ensure DB is
      okay. Still some obvious functionality is missing or it is in a working
      progress . On TO DO list: limit repetition and add refresh of data on UI.
    </p>

    <br />

    <h3>Rundown of key technologies and approaches:</h3>

    <ul>
      <li>
        1. UI built in React 18. Functional and Clases approach has been
        implemented to construct react components.
      </li>
      <li>
        2. Use of custom presentational components - no logic - receiving props.
        Simplified handling change of a controlled components.
      </li>
      <li>3. Thunks as middleware for HTTP async calls.</li>
      <li>3. Redux used for a global state management.</li>
      <li>4. Web API is built in NET 6</li>
      <li>5. Entity Framework 6 as ORM for SQLlite Database</li>
      <li>
        6. Some other helpers: Automapper, Toaster, Moment js to handle dates
      </li>
      <li>7. Bootstrap for HTML positioning </li>
    </ul>
  </div>
);

export default AboutPage;
