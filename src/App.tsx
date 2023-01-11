import React from "react";
import { Form } from "./components";
import "./App.css";

// App component
// This is the main component of the application
// It renders the Form component

// I prefer using React.FC (Function)Component instead of React.(Class)Component
const App: React.FC = () => {
  return (
    <div className="App">
      <Form />
    </div>
  );
};

export default App;
