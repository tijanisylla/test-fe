import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Declaring an interface for the state object to be used in the App component.
interface Occupation {
  name: string;
  abbreviation: string;
  setOccupations: React.Dispatch<React.SetStateAction<string[]>>;
}

const App: React.FC = () => {
  const [occupations, setOccupations] = useState<string[]>([]);
  const [states, setStates] = useState<Occupation[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [state, setState] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://frontend-take-home.fetchrewards.com/form")
      .then((res) => {
        setOccupations(res.data.occupations);
        setStates(res.data.states);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("https://frontend-take-home.fetchrewards.com/form", {
        name,
        email,
        password,
        occupation,
        state,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Occupation:</label>
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          >
            <option value="">Select an occupation</option>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>State:</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
