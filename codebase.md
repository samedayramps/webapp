# tsconfig.json

```json
{
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx"
    },
    "include": ["src"]
  }
```

# package.json

```json
{
  "name": "webb-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.23",
    "@types/react": "^18.0.33",
    "@types/react-dom": "^18.0.11",
    "firebase": "^10.13.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

# README.md

```md
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

```

# public/robots.txt

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```

# public/manifest.json

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

# public/logo512.png

This is a binary file of the type: Image

# public/logo192.png

This is a binary file of the type: Image

# public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

# public/favicon.ico

This is a binary file of the type: Binary

# src/setupTests.ts

```ts
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```

# src/reportWebVitals.ts

```ts
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

# src/react-app-env.d.ts

```ts
/// <reference types="react-scripts" />

```

# src/logo.svg

This is a file of the type: SVG Image

# src/index.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

# src/index.css

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

# src/firebase.ts

```ts
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCby3a7kd24YroYqdiegewNP1t2y1hcXa4",
    authDomain: "sdr-webapp.firebaseapp.com",
    projectId: "sdr-webapp",
    storageBucket: "sdr-webapp.appspot.com",
    messagingSenderId: "92536536415",
    appId: "1:92536536415:web:d3be3f6650af4cb1768aea"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

# src/App.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

// Import components
import RentalRequests from './components/RentalRequests';
import Customers from './components/Customers';
import Quotes from './components/Quotes';
import Payments from './components/Payments';
import Agreements from './components/Agreements';
import Rentals from './components/Rentals';

// Define the possible active components
type ActiveComponent = 'rentalRequests' | 'customers' | 'quotes' | 'payments' | 'agreements' | 'rentals';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('rentalRequests');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderComponent = (): JSX.Element => {
    switch (activeComponent) {
      case 'rentalRequests':
        return <RentalRequests />;
      case 'customers':
        return <Customers />;
      case 'quotes':
        return <Quotes />;
      case 'payments':
        return <Payments />;
      case 'agreements':
        return <Agreements />;
      case 'rentals':
        return <Rentals />;
      default:
        return <RentalRequests />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ramp Rental Management</h1>
        {user ? (
          <div>
            <p>Welcome, {user.displayName || user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={handleSignIn}>Sign In with Google</button>
        )}
      </header>
      {user && (
        <nav>
          <button onClick={() => setActiveComponent('rentalRequests')}>Rental Requests</button>
          <button onClick={() => setActiveComponent('customers')}>Customers</button>
          <button onClick={() => setActiveComponent('quotes')}>Quotes</button>
          <button onClick={() => setActiveComponent('payments')}>Payments</button>
          <button onClick={() => setActiveComponent('agreements')}>Agreements</button>
          <button onClick={() => setActiveComponent('rentals')}>Rentals</button>
        </nav>
      )}
      <main>
        {user ? renderComponent() : <p>Please sign in to access the application.</p>}
      </main>
    </div>
  );
};

export default App;
```

# src/App.test.tsx

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

# src/App.css

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

# src/components/Rentals.tsx

```tsx
// src/components/Rentals.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface Rental {
  id: string;
  agreementId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
}

const Rentals: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [formData, setFormData] = useState({
    agreementId: '',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const querySnapshot = await getDocs(collection(db, 'rentals'));
    const rentalList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Rental));
    setRentals(rentalList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rentals'), {
        ...formData,
        startDate: Timestamp.fromDate(new Date(formData.startDate)),
        endDate: Timestamp.fromDate(new Date(formData.endDate)),
      });
      fetchRentals();
      setFormData({
        agreementId: '',
        startDate: '',
        endDate: '',
        status: 'active',
      });
    } catch (error) {
      console.error('Error adding rental: ', error);
    }
  };

  return (
    <div>
      <h2>Rentals</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="agreementId"
          value={formData.agreementId}
          onChange={handleInputChange}
          placeholder="Agreement ID"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">Add Rental</button>
      </form>
      <h3>Rental List</h3>
      <ul>
        {rentals.map(rental => (
          <li key={rental.id}>
            Agreement ID: {rental.agreementId} - Status: {rental.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rentals;
```

# src/components/RentalRequests.tsx

```tsx
// src/components/RentalRequests.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface RentalRequest {
  id: string;
  estimatedLength: number;
  estimatedDuration: number;
  mobilityAids: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  status: string;
  requestDate: Timestamp;
}

const RentalRequests: React.FC = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [formData, setFormData] = useState({
    estimatedLength: '',
    estimatedDuration: '',
    mobilityAids: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  useEffect(() => {
    fetchRentalRequests();
  }, []);

  const fetchRentalRequests = async () => {
    const querySnapshot = await getDocs(collection(db, 'rentalRequests'));
    const requests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as RentalRequest));
    setRentalRequests(requests);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      estimatedLength: Number(formData.estimatedLength),
      estimatedDuration: Number(formData.estimatedDuration),
      mobilityAids: formData.mobilityAids,
      customerInfo: {
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
      },
      status: 'new',
      requestDate: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, 'rentalRequests'), newRequest);
      fetchRentalRequests();
      setFormData({
        estimatedLength: '',
        estimatedDuration: '',
        mobilityAids: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h2>Rental Requests</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="estimatedLength"
          value={formData.estimatedLength}
          onChange={handleInputChange}
          placeholder="Estimated Length"
          required
        />
        <input
          type="number"
          name="estimatedDuration"
          value={formData.estimatedDuration}
          onChange={handleInputChange}
          placeholder="Estimated Duration"
          required
        />
        <select
          name="mobilityAids"
          value={formData.mobilityAids}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Mobility Aid</option>
          <option value="wheelchair">Wheelchair</option>
          <option value="scooter">Scooter</option>
          <option value="walker">Walker</option>
          <option value="none">None</option>
        </select>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          placeholder="Customer Name"
          required
        />
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleInputChange}
          placeholder="Customer Email"
          required
        />
        <input
          type="tel"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleInputChange}
          placeholder="Customer Phone"
          required
        />
        <button type="submit">Submit Request</button>
      </form>
      <h3>Existing Requests</h3>
      <ul>
        {rentalRequests.map(request => (
          <li key={request.id}>
            {request.customerInfo.name} - {request.mobilityAids} - Status: {request.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalRequests;
```

# src/components/Quotes.tsx

```tsx
// src/components/Quotes.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Quote {
  id: string;
  rentalRequestId: string;
  amount: number;
  status: string;
}

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [formData, setFormData] = useState({
    rentalRequestId: '',
    amount: '',
    status: 'pending',
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const querySnapshot = await getDocs(collection(db, 'quotes'));
    const quoteList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Quote));
    setQuotes(quoteList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'quotes'), {
        ...formData,
        amount: Number(formData.amount),
      });
      fetchQuotes();
      setFormData({ rentalRequestId: '', amount: '', status: 'pending' });
    } catch (error) {
      console.error('Error adding quote: ', error);
    }
  };

  return (
    <div>
      <h2>Quotes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rentalRequestId"
          value={formData.rentalRequestId}
          onChange={handleInputChange}
          placeholder="Rental Request ID"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit">Add Quote</button>
      </form>
      <h3>Quote List</h3>
      <ul>
        {quotes.map(quote => (
          <li key={quote.id}>
            Request ID: {quote.rentalRequestId} - Amount: ${quote.amount} - Status: {quote.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;
```

# src/components/Payments.tsx

```tsx
// src/components/Payments.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface Payment {
  id: string;
  rentalAgreementId: string;
  amount: number;
  paymentDate: Timestamp;
  status: string;
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [formData, setFormData] = useState({
    rentalAgreementId: '',
    amount: '',
    status: 'pending',
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const querySnapshot = await getDocs(collection(db, 'payments'));
    const paymentList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Payment));
    setPayments(paymentList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'payments'), {
        ...formData,
        amount: Number(formData.amount),
        paymentDate: Timestamp.now(),
      });
      fetchPayments();
      setFormData({ rentalAgreementId: '', amount: '', status: 'pending' });
    } catch (error) {
      console.error('Error adding payment: ', error);
    }
  };

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rentalAgreementId"
          value={formData.rentalAgreementId}
          onChange={handleInputChange}
          placeholder="Rental Agreement ID"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <button type="submit">Add Payment</button>
      </form>
      <h3>Payment List</h3>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>
            Agreement ID: {payment.rentalAgreementId} - Amount: ${payment.amount} - Status: {payment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
```

# src/components/Customers.tsx

```tsx
// src/components/Customers.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, 'customers'));
    const customerList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Customer));
    setCustomers(customerList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'customers'), formData);
      fetchCustomers();
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error adding customer: ', error);
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
        <button type="submit">Add Customer</button>
      </form>
      <h3>Customer List</h3>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>{customer.name} - {customer.email} - {customer.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
```

# src/components/Agreements.tsx

```tsx
// src/components/Agreements.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface Agreement {
  id: string;
  customerId: string;
  rentalRequestId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
}

const Agreements: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [formData, setFormData] = useState({
    customerId: '',
    rentalRequestId: '',
    startDate: '',
    endDate: '',
    status: 'pending',
  });

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    const querySnapshot = await getDocs(collection(db, 'agreements'));
    const agreementList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Agreement));
    setAgreements(agreementList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'agreements'), {
        ...formData,
        startDate: Timestamp.fromDate(new Date(formData.startDate)),
        endDate: Timestamp.fromDate(new Date(formData.endDate)),
      });
      fetchAgreements();
      setFormData({
        customerId: '',
        rentalRequestId: '',
        startDate: '',
        endDate: '',
        status: 'pending',
      });
    } catch (error) {
      console.error('Error adding agreement: ', error);
    }
  };

  return (
    <div>
      <h2>Rental Agreements</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerId"
          value={formData.customerId}
          onChange={handleInputChange}
          placeholder="Customer ID"
          required
        />
        <input
          type="text"
          name="rentalRequestId"
          value={formData.rentalRequestId}
          onChange={handleInputChange}
          placeholder="Rental Request ID"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">Add Agreement</button>
      </form>
      <h3>Agreement List</h3>
      <ul>
        {agreements.map(agreement => (
          <li key={agreement.id}>
            Customer ID: {agreement.customerId} - Request ID: {agreement.rentalRequestId} - Status: {agreement.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agreements;
```

