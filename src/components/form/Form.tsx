import React, { useState, useEffect } from "react";
import axios from "axios";
import { Occupation } from "../types/Types";
import Success from "../success/Success";
import "./form.css";

const Form = () => {
  const [occupations, setOccupations] = useState<string[]>([]);
  const [states, setStates] = useState<Occupation[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const api_url = "https://frontend-take-home.fetchrewards.com/form" as string; // Since i am allowed to push the code in a public repo, i dont need to store the API in the an environment variable.

  // Fetch Occupation and State should allow users to select from options returned by an endpoint.
  const getStateAndOccupations = async () => {
    try {
      const res = await axios.get(api_url);
      setOccupations(res.data.occupations);
      setStates(res.data.states);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    // Displaying the occupations and states from the API endpoint in useEffect to render properly.
    getStateAndOccupations();
  }, []);

  // Reset the input fields after the form is submitted.
  const resetInput = (): void => {
    setSent(true);
    setName("");
    setEmail("");
    setPassword("");
    setOccupation("");
    setState("");
  };

  // Submit the form to the API endpoint.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const res = await axios.post(api_url, {
      name,
      email,
      password,
      occupation,
      state,
    });
    if (res.status === 201 || 200) {
      setSent(true);
      resetInput();
      console.log(res);
    }
    setLoading(false);
  };
  return (
    <div className="login-box">
      {/* Check if the response is 200 | 201 | OK */}
      {sent && <Success sent={sent} setSent={setSent} />}
      <div className="login-box-title">
        <i className="uil uil-lock"></i>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="container-user-box">
          {/* Left */}
          <div className="container-left-user-box">
            <div className={`user-box ${name === "" && "required"} `}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full name"
              />
            </div>
            <div className={`user-box ${email === "" && "required"} `}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </div>
            <div className={`user-box ${password === "" && "required"} `}>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          {/* Right */}
          <div className="container-right-user-box">
            {/* <div className="user-box-state">State - Occupation</div> */}
            <div className={`user-box ${occupation === "" && "required"} `}>
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
            <div className={`user-box ${state === "" ? "required" : ""} `}>
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
            <div className="user-box-submit">
              <button className="btn" type="submit">
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
