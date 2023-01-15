# Getting Started with React TypeScript :
<img width="1421" alt="Screenshot 2023-01-11 at 12 44 45 PM" src="https://user-images.githubusercontent.com/60860764/211891627-6ef0fe2d-2476-464d-803f-270696ccaf10.png">


### Instructions to run the application.

1. Clone the public repo

```git
git clone https://github.com/tijanisylla/test-fe.git
```

2. Install the dependencies

```sh
npm install
```

3. Run app in your browser

```sh
npm start
```

4. Test
```sh
npm run test
```


### Imports

```ts
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Occupation } from "../types/Types";
import Success from "../success/Success";
import "./form.css";
```

### Hooks
```ts
  const [occupations, setOccupations] = useState<string[]>([]);
  const [states, setStates] = useState<Occupation[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
```


### User's inputs:

- Full Name
- Email
- Password
- Occupation
- State

### Displaying the occupations and states from the API endpoint in useEffect to render properly.

```ts
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
    getStateAndOccupations();
  }, []);

```

### Submit the form to the API endpoint.

```ts
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

```

### Form submit
```tsx
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

```
