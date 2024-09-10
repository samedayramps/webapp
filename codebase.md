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
    "@react-google-maps/api": "^2.19.3",
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
    "react-router-dom": "^6.26.2",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "push": "git add . && git commit -m \"Auto-commit\" && git push"
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
  },
  "devDependencies": {
    "@types/google.maps": "^3.58.0"
  }
}

```

# README.md

```md
     # Ramp Rental Management

     This is a React application for managing ramp rentals. It includes features for handling rental requests, customers, quotes, payments, agreements, and rentals.

     ## Setup

     1. Clone the repository
     2. Run `npm install` to install dependencies
     3. Run `npm start` to start the development server

     ## Features

     - Rental request management
     - Customer management
     - Quote generation
     - Payment tracking
     - Agreement handling
     - Rental management
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
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
import Settings from './components/Settings';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Ramp Rental Management</h1>
          {user ? (
            <div>
              <p>Welcome, {user.displayName || user.email}</p>
              <button onClick={handleSignOut}>Sign Out</button>
              <Link to="/settings">
                <button>Settings</button>
              </Link>
            </div>
          ) : (
            <button onClick={handleSignIn}>Sign In with Google</button>
          )}
        </header>
        {user && (
          <nav>
            <Link to="/rental-requests"><button>Rental Requests</button></Link>
            <Link to="/customers"><button>Customers</button></Link>
            <Link to="/quotes"><button>Quotes</button></Link>
            <Link to="/payments"><button>Payments</button></Link>
            <Link to="/agreements"><button>Agreements</button></Link>
            <Link to="/rentals"><button>Rentals</button></Link>
          </nav>
        )}
        <main>
          {user ? (
            <Routes>
              <Route path="/rental-requests" element={<RentalRequests />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/agreements" element={<Agreements />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<RentalRequests />} />
            </Routes>
          ) : (
            <p>Please sign in to access the application.</p>
          )}
        </main>
      </div>
    </Router>
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

# src/types/google-maps.d.ts

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps {
  class DistanceMatrixService {
    getDistanceMatrix(
      request: DistanceMatrixRequest,
      callback: (response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void
    ): void;
  }

  interface DistanceMatrixRequest {
    origins: string[];
    destinations: string[];
    travelMode: TravelMode;
    unitSystem: UnitSystem;
  }

  interface DistanceMatrixResponse {
    rows: DistanceMatrixResponseRow[];
  }

  interface DistanceMatrixResponseRow {
    elements: DistanceMatrixResponseElement[];
  }

  interface DistanceMatrixResponseElement {
    distance: {
      value: number;
    };
  }

  enum TravelMode {
    DRIVING
  }

  enum UnitSystem {
    IMPERIAL
  }

  type DistanceMatrixStatus = 'OK' | 'INVALID_REQUEST' | 'MAX_ELEMENTS_EXCEEDED' | 'MAX_DIMENSIONS_EXCEEDED' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR';
}

export {};
```

# src/types/common.ts

```ts
import { Timestamp } from 'firebase/firestore';

export interface BaseEntity {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Customer extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  rentalRequestId?: string;
  quoteId?: string;
}

export interface RentalRequest extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  mobilityAids: string[];
  estimatedLength: number | null;
  estimatedDuration: number | null;
  status: string;
  customerId?: string;
  quoteId?: string;
}

export interface Quote extends BaseEntity {
  customerId: string;
  rentalRequestId: string;
  components: { [key: string]: number };
  monthlyRate: number;
  installationFee: number;
  deliveryFee: number;
  totalLength: number;
  status: string;
}

export interface Payment extends BaseEntity {
  rentalAgreementId: string;
  amount: number;
  status: string;
}

export interface Agreement extends BaseEntity {
  customerId: string;
  rentalRequestId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
}

export interface Rental extends BaseEntity {
  agreementId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
}

export interface QuoteWithCustomer extends Quote {
  customerName: string;
  customerAddress: string;
}
```

# src/services/crudService.ts

```ts
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { BaseEntity } from '../types/common';

export class CrudService<T extends BaseEntity> {
  constructor(private collectionName: string) {}

  async getAll(): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
    console.log(`Document with ID ${id} deleted from ${this.collectionName}`);
  }
}
```

# src/hooks/useInstallationFee.ts

```ts
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useInstallationFee = (ramps: number, landings: number) => {
  const [feePerRamp, setFeePerRamp] = useState(50); // Default values
  const [feePerLanding, setFeePerLanding] = useState(100);

  useEffect(() => {
    const fetchInstallationFees = async () => {
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFeePerRamp(data.installFeePerRamp);
        setFeePerLanding(data.installFeePerLanding);
      }
    };
    fetchInstallationFees();
  }, []);

  return (ramps * feePerRamp) + (landings * feePerLanding);
};
```

# src/hooks/useFirestoreDocument.ts

```ts
// src/hooks/useFirestoreDocument.ts
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function useFirestoreDocument<T>(collection: string, id: string | null) {
  const [document, setDocument] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDocument = async () => {
      try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() } as T);
        } else {
          setError(new Error('Document not found'));
        }
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchDocument();
  }, [collection, id]);

  return { document, error };
}

export default useFirestoreDocument;
```

# src/hooks/useDeliveryFee.ts

```ts
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useDeliveryFee = (distance: number) => {
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    const fetchPriceVariables = async () => {
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const baseDeliveryFee = data.baseDeliveryFee || 100;
        const deliveryFeePerMile = data.deliveryFeePerMile || 2;
        
        const calculatedFee = baseDeliveryFee + (distance * deliveryFeePerMile);
        setDeliveryFee(Math.round(calculatedFee));
      }
    };

    fetchPriceVariables();
  }, [distance]);

  return deliveryFee;
};
```

# src/components/types.ts

```ts
// src/components/RampPricingCalculator/types.ts
export interface RampComponent {
    id: string;
    name: string;
    length: number;
    isLanding: boolean;
  }
  
  export interface RampPricingCalculatorProps {
    onPriceCalculated: (
      monthlyRate: number,
      components: { [key: string]: number },
      installationFee: number,
      deliveryFee: number,
      totalLength: number
    ) => void;
    customerAddress: string;
    initialComponents?: { [key: string]: number };
  }

```

# src/components/TotalCostDisplay.tsx

```tsx
// src/components/RampPricingCalculator/TotalCostDisplay.tsx
import React from 'react';

interface TotalCostDisplayProps {
  totalCost: number;
}

const TotalCostDisplay: React.FC<TotalCostDisplayProps> = ({ totalCost }) => (
  <div>
    <label>
      <strong>Total Cost: ${totalCost}</strong>
    </label>
  </div>
);

export default TotalCostDisplay;
```

# src/components/Settings.tsx

```tsx
import React, { useState } from 'react';
import PriceVariables from './PriceVariables';
import PriceVariablesManager from './PriceVariablesManager';

const Settings: React.FC = () => {
  const [priceVariables, setPriceVariables] = useState({
    baseDeliveryFee: 0,
    deliveryFeePerMile: 0,
    installFeePerRampSection: 0,
    installFeePerLanding: 0,
    monthlyRatePerFoot: 0,
    warehouseAddress: '',
  });

  const [showPriceVariables, setShowPriceVariables] = useState(false);

  const handleVariablesLoaded = (variables: typeof priceVariables) => {
    setPriceVariables(variables);
  };

  const handleClosePriceVariables = () => {
    setShowPriceVariables(false);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <section className="price-variables-section">
        <h2>Price Variables</h2>
        <button onClick={() => setShowPriceVariables(true)}>View Price Variables</button>
        {showPriceVariables && (
          <PriceVariables onClose={handleClosePriceVariables} />
        )}
      </section>
      
      <section className="price-variables-manager-section">
        <h2>Manage Price Variables</h2>
        <PriceVariablesManager 
          onVariablesLoaded={handleVariablesLoaded}
        />
      </section>
    </div>
  );
};

export default Settings;
```

# src/components/SelectedComponentsList.tsx

```tsx
// src/components/RampPricingCalculator/SelectedComponentsList.tsx
import React from 'react';
import { RampComponent } from './types';

interface SelectedComponentsListProps {
  selectedComponents: { component: RampComponent; quantity: number }[];
  monthlyRatePerFoot: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemoveComponent: (index: number) => void;
}

const SelectedComponentsList: React.FC<SelectedComponentsListProps> = ({
  selectedComponents,
  monthlyRatePerFoot,
  onQuantityChange,
  onRemoveComponent,
}) => (
  <ul>
    {selectedComponents.map(({ component, quantity }, index) => (
      <li key={index}>
        {component.name} - ${(component.length * monthlyRatePerFoot).toFixed(2)}/month
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onQuantityChange(index, parseInt(e.target.value))}
        />
        <button onClick={() => onRemoveComponent(index)}>Remove</button>
      </li>
    ))}
  </ul>
);

export default SelectedComponentsList;
```

# src/components/Rentals.tsx

```tsx
// src/components/Rentals.tsx
import React, { useState, useEffect } from 'react';
import { Rental } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import { Timestamp } from 'firebase/firestore';

const rentalService = new CrudService<Rental>('rentals');

const Rentals: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [formData, setFormData] = useState<Partial<Rental>>({
    agreementId: '',
    startDate: Timestamp.now(),
    endDate: Timestamp.now(),
    status: 'active',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const fetchedRentals = await rentalService.getAll();
    setRentals(fetchedRentals);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: Timestamp.fromDate(new Date(value)) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await rentalService.update(formData.id, formData);
      } else {
        await rentalService.create(formData as Omit<Rental, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchRentals();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating rental: ', error);
    }
  };

  const resetForm = () => {
    setFormData({ agreementId: '', startDate: Timestamp.now(), endDate: Timestamp.now(), status: 'active' });
    setIsEditing(false);
  };

  const handleEdit = (rental: Rental) => {
    setFormData(rental);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await rentalService.delete(id);
      fetchRentals();
    } catch (error) {
      console.error('Error deleting rental: ', error);
    }
  };

  const columns: Column<Rental>[] = [
    { label: 'Agreement ID', render: (rental) => rental.agreementId },
    { label: 'Start Date', render: (rental) => rental.startDate.toDate().toLocaleDateString() },
    { label: 'End Date', render: (rental) => rental.endDate.toDate().toLocaleDateString() },
    { label: 'Status', render: (rental) => rental.status },
  ];

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
          value={formData.startDate?.toDate().toISOString().split('T')[0]}
          onChange={handleDateChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate?.toDate().toISOString().split('T')[0]}
          onChange={handleDateChange}
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
        <button type="submit">{isEditing ? 'Update Rental' : 'Add Rental'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Rental List</h3>
      <DataTable 
        items={rentals} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Rentals;
```

# src/components/RentalRequests.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { RentalRequest, Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';

const rentalRequestService = new CrudService<RentalRequest>('rentalRequests');
const customerService = new CrudService<Customer>('customers');

const RentalRequests: React.FC = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [formData, setFormData] = useState<Partial<RentalRequest>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    mobilityAids: [],
    estimatedLength: null,
    estimatedDuration: null,
    status: 'new',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [knowLength, setKnowLength] = useState(false);
  const [knowDuration, setKnowDuration] = useState(false);

  useEffect(() => {
    fetchRentalRequests();
  }, []);

  const fetchRentalRequests = async () => {
    const fetchedRequests = await rentalRequestService.getAll();
    setRentalRequests(fetchedRequests);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleMobilityAidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      mobilityAids: checked
        ? [...(prevState.mobilityAids || []), value]
        : (prevState.mobilityAids || []).filter(aid => aid !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formData,
        estimatedLength: knowLength ? Number(formData.estimatedLength) : null,
        estimatedDuration: knowDuration ? Number(formData.estimatedDuration) : null,
      };
      
      if (isEditing && formData.id) {
        await rentalRequestService.update(formData.id, requestData);
      } else {
        await rentalRequestService.create(requestData as Omit<RentalRequest, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchRentalRequests();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating rental request: ', error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      mobilityAids: [],
      estimatedLength: null,
      estimatedDuration: null,
      status: 'new',
    });
    setIsEditing(false);
    setKnowLength(false);
    setKnowDuration(false);
  };

  const handleEdit = (request: RentalRequest) => {
    setFormData(request);
    setIsEditing(true);
    setKnowLength(request.estimatedLength !== null);
    setKnowDuration(request.estimatedDuration !== null);
  };

  const handleDelete = async (id: string) => {
    try {
      await rentalRequestService.delete(id);
      // After deleting, fetch the updated list of rental requests
      fetchRentalRequests();
    } catch (error) {
      console.error('Error deleting rental request: ', error);
    }
  };

  const handleCreateCustomer = async (request: RentalRequest) => {
    try {
      const customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'> = {
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        address: request.address,
        rentalRequestId: request.id,
      };

      const newCustomerId = await customerService.create(customerData);
      await rentalRequestService.update(request.id, { customerId: newCustomerId });

      alert('Customer created successfully!');
      // After creating a customer, fetch the updated list of rental requests
      fetchRentalRequests();
    } catch (error) {
      console.error('Error creating customer: ', error);
      alert('Error creating customer. Please try again.');
    }
  };

  const columns: Column<RentalRequest>[] = [
    { label: 'Name', render: (request) => `${request.firstName} ${request.lastName}` },
    { label: 'Email', render: (request) => request.email },
    { label: 'Phone', render: (request) => request.phone },
    { label: 'Address', render: (request) => request.address },
    { label: 'Mobility Aids', render: (request) => request.mobilityAids.join(', ') },
    { label: 'Estimated Length', render: (request) => request.estimatedLength ? `${request.estimatedLength} ft` : 'None' },
    { label: 'Estimated Duration', render: (request) => request.estimatedDuration ? `${request.estimatedDuration} months` : 'None' },
    { label: 'Status', render: (request) => request.status },
  ];

  return (
    <div>
      <h2>Rental Requests</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
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
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <div>
          <h4>Mobility Aids</h4>
          {['wheelchair', 'scooter', 'walker', 'none'].map(aid => (
            <label key={aid}>
              <input
                type="checkbox"
                name="mobilityAids"
                value={aid}
                checked={formData.mobilityAids?.includes(aid)}
                onChange={handleMobilityAidChange}
              />
              {aid.charAt(0).toUpperCase() + aid.slice(1)}
            </label>
          ))}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={knowLength}
              onChange={(e) => setKnowLength(e.target.checked)}
            />
            Do you know the ramp length needed?
          </label>
          {knowLength && (
            <input
              type="number"
              name="estimatedLength"
              value={formData.estimatedLength || ''}
              onChange={handleInputChange}
              placeholder="Estimated Length (ft)"
            />
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={knowDuration}
              onChange={(e) => setKnowDuration(e.target.checked)}
            />
            Do you know the duration of the rental?
          </label>
          {knowDuration && (
            <input
              type="number"
              name="estimatedDuration"
              value={formData.estimatedDuration || ''}
              onChange={handleInputChange}
              placeholder="Estimated Duration (months)"
            />
          )}
        </div>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">{isEditing ? 'Update Request' : 'Add Request'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Rental Request List</h3>
      <DataTable 
        items={rentalRequests} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        additionalAction={{
          label: 'Create Customer',
          action: handleCreateCustomer,
          showIf: (request) => !request.customerId
        }}
      />
    </div>
  );
};

export default RentalRequests;
```

# src/components/RampPricingCalculator.css

```css
.ramp-pricing-calculator {
  border: 2px solid #007bff; /* You can change the color as needed */
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ramp-pricing-calculator-component {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.ramp-pricing-calculator-component h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1em;
}
```

# src/components/RampComponentsManager.tsx

```tsx
import React from 'react';
import { RampComponent } from './types';

interface RampComponentsManagerProps {
  rampComponents: RampComponent[];
  selectedComponents: { component: RampComponent; quantity: number }[];
  monthlyRatePerFoot: number;
  onAddComponent: (id: string) => void;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemoveComponent: (index: number) => void;
}

const RampComponentsManager: React.FC<RampComponentsManagerProps> = ({
  rampComponents,
  selectedComponents,
  monthlyRatePerFoot,
  onAddComponent,
  onQuantityChange,
  onRemoveComponent,
}) => {
  return (
    <div>
      <h4>Available Components:</h4>
      <ul>
        {rampComponents.map((component) => (
          <li key={component.id}>
            {component.name} {/* Removed the length unit */}
            <button onClick={() => onAddComponent(component.id)}>Add</button>
          </li>
        ))}
      </ul>

      <h4>Selected Components:</h4>
      <ul>
        {selectedComponents.map(({ component, quantity }, index) => (
          <li key={`${component.id}-${index}`}>
            {component.name} ({component.length}ft)
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => onQuantityChange(index, parseInt(e.target.value, 10))}
            />
            <button onClick={() => onRemoveComponent(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RampComponentsManager;
```

# src/components/RampComponents.tsx

```tsx
// src/components/RampPricingCalculator/RampPricingCalculator.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { RampComponent, RampPricingCalculatorProps } from './types';
import RampComponentsManager from './RampComponentsManager';
import PriceVariablesManager from './PriceVariablesManager';
import DistanceCalculator from './DistanceCalculator';
import PriceCalculator from './PriceCalculator';
import InstallationFeeCalculator from './InstallationFeeCalculator';
import FeesAndRatesDisplay from './FeesAndRatesDisplay';
import './RampPricingCalculator.css'; // Make sure to create this CSS file

const rampComponents: RampComponent[] = [
  { id: 'R4', name: '4ft Ramp', length: 4, isLanding: false },
  { id: 'R5', name: '5ft Ramp', length: 5, isLanding: false },
  { id: 'R6', name: '6ft Ramp', length: 6, isLanding: false },
  { id: 'R7', name: '7ft Ramp', length: 7, isLanding: false },
  { id: 'R8', name: '8ft Ramp', length: 8, isLanding: false },
  { id: 'L54', name: '5x4 Landing', length: 5, isLanding: true },
  { id: 'L55', name: '5x5 Landing', length: 5, isLanding: true },
  { id: 'L58', name: '5x8 Landing', length: 5, isLanding: true },
];

const RampPricingCalculator: React.FC<RampPricingCalculatorProps> = ({ onPriceCalculated, customerAddress, initialComponents }) => {
  const [selectedComponents, setSelectedComponents] = useState<{ component: RampComponent; quantity: number }[]>([]);
  const [priceVariables, setPriceVariables] = useState({
    baseDeliveryFee: 100,
    deliveryFeePerMile: 2,
    installFeePerRampSection: 50,
    installFeePerLanding: 100,
    monthlyRatePerFoot: 10,
    warehouseAddress: '',
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [installationFee, setInstallationFee] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    if (initialComponents) {
      const initialSelectedComponents = Object.entries(initialComponents).map(([id, quantity]) => {
        const component = rampComponents.find(c => c.id === id);
        return component ? { component, quantity } : null;
      }).filter((item): item is { component: RampComponent; quantity: number } => item !== null);

      setSelectedComponents(initialSelectedComponents);
    }
  }, [initialComponents]);

  const handleAddComponent = (selectedId: string) => {
    const component = rampComponents.find(c => c.id === selectedId);
    if (component) {
      setSelectedComponents(prev => [...prev, { component, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedComponents(prev => 
      prev.map((item, i) => i === index ? { ...item, quantity } : item)
    );
  };

  const handleRemoveComponent = (index: number) => {
    setSelectedComponents(prev => prev.filter((_, i) => i !== index));
  };

  const handleMonthlyRateCalculated = useCallback((calculatedMonthlyRate: number, calculatedTotalLength: number) => {
    setMonthlyRate(calculatedMonthlyRate);
    setTotalLength(calculatedTotalLength);
  }, []);

  const handleInstallationFeeCalculated = useCallback((calculatedInstallationFee: number) => {
    setInstallationFee(calculatedInstallationFee);
  }, []);

  const handlePriceCalculated = useCallback(() => {
    onPriceCalculated(
      monthlyRate,
      selectedComponents.reduce((obj, { component, quantity }) => {
        obj[component.id] = quantity;
        return obj;
      }, {} as { [key: string]: number }),
      installationFee,
      deliveryFee,
      totalLength
    );
  }, [onPriceCalculated, monthlyRate, selectedComponents, installationFee, deliveryFee, totalLength]);

  useEffect(() => {
    handlePriceCalculated();
  }, [handlePriceCalculated]);

  return (
    <div className="ramp-pricing-calculator">
      <PriceVariablesManager onVariablesLoaded={setPriceVariables} />
      
      <DistanceCalculator
        warehouseAddress={priceVariables.warehouseAddress}
        customerAddress={customerAddress}
        baseDeliveryFee={priceVariables.baseDeliveryFee}
        deliveryFeePerMile={priceVariables.deliveryFeePerMile}
        onDistanceCalculated={(_, fee: number) => {
          setDeliveryFee(fee);
        }}
      />

      <div className="ramp-pricing-calculator-component">
        <h3>Ramp Components</h3>
        <RampComponentsManager
          rampComponents={rampComponents}
          selectedComponents={selectedComponents}
          monthlyRatePerFoot={priceVariables.monthlyRatePerFoot}
          onAddComponent={handleAddComponent}
          onQuantityChange={handleQuantityChange}
          onRemoveComponent={handleRemoveComponent}
        />
      </div>

      <PriceCalculator
        selectedComponents={selectedComponents}
        monthlyRatePerFoot={priceVariables.monthlyRatePerFoot}
        onMonthlyRateCalculated={handleMonthlyRateCalculated}
      />

      <InstallationFeeCalculator
        selectedComponents={selectedComponents}
        installFeePerRampSection={priceVariables.installFeePerRampSection}
        installFeePerLanding={priceVariables.installFeePerLanding}
        onInstallationFeeCalculated={handleInstallationFeeCalculated}
      />

      <div className="ramp-pricing-calculator-component">
        <h3>Fees and Rates Summary</h3>
        <FeesAndRatesDisplay
          installationFee={installationFee}
          deliveryFee={deliveryFee}
          monthlyRate={monthlyRate}
        />
      </div>
    </div>
  );
};

export default React.memo(RampPricingCalculator);
```

# src/components/Quotes.tsx

```tsx
// src/components/Quotes.tsx
import React, { useState, useEffect } from 'react';
import { Quote, Customer, QuoteWithCustomer } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import QuoteDetails from './QuoteDetails'; // We'll create this component next

const quoteService = new CrudService<Quote>('quotes');
const customerService = new CrudService<Customer>('customers');

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteWithCustomer[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteWithCustomer | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const [fetchedQuotes, customers] = await Promise.all([
        quoteService.getAll(),
        customerService.getAll()
      ]);

      const quotesWithCustomerInfo = fetchedQuotes.map((quote) => {
        const customer = customers.find(c => c.id === quote.customerId);
        return {
          ...quote,
          customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown',
          customerAddress: customer ? customer.address : 'Unknown',
        };
      });

      setQuotes(quotesWithCustomerInfo);
    } catch (error) {
      console.error('Error fetching quotes and customers:', error);
    }
  };

  const handleEdit = (quote: QuoteWithCustomer) => {
    // Implement edit functionality if needed
    console.log('Edit quote:', quote);
  };

  const handleDelete = async (id: string) => {
    try {
      await quoteService.delete(id);
      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote: ', error);
    }
  };

  const handleView = (quote: QuoteWithCustomer) => {
    setSelectedQuote(quote);
  };

  const columns: Column<QuoteWithCustomer>[] = [
    { label: 'Customer Name', render: (quote) => quote.customerName },
    { label: 'Customer Address', render: (quote) => quote.customerAddress },
    { label: 'Monthly Rate', render: (quote) => `$${quote.monthlyRate.toFixed(2)}` },
    { 
      label: 'Upfront Cost', 
      render: (quote) => `$${(quote.installationFee + quote.deliveryFee).toFixed(2)}` 
    },
    { label: 'Total Length', render: (quote) => `${quote.totalLength} ft` },
    { label: 'Status', render: (quote) => quote.status },
  ];

  return (
    <div>
      <h2>Quotes</h2>
      <DataTable 
        items={quotes} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        additionalAction={{
          label: 'View',
          action: handleView,
        }}
      />
      {selectedQuote && (
        <QuoteDetails 
          quote={selectedQuote} 
          onClose={() => setSelectedQuote(null)} 
        />
      )}
    </div>
  );
};

export default Quotes;
```

# src/components/QuoteForm.tsx

```tsx
import React, { useState, useCallback } from 'react';
import { Customer, Quote } from '../types/common';
import { CrudService } from '../services/crudService';
import RampPricingCalculator from './RampComponents';
import CustomerInfo from './CustomerInfo';

interface QuoteFormProps {
  customer: Customer;
  onClose: () => void;
  onQuoteCreated: () => void;
}

const quoteService = new CrudService<Quote>('quotes');
const customerService = new CrudService<Customer>('customers');

const QuoteForm: React.FC<QuoteFormProps> = ({ customer, onClose, onQuoteCreated }) => {
  const [quote, setQuote] = useState<Partial<Quote>>({
    components: {},
    monthlyRate: 0,
    installationFee: 0,
    deliveryFee: 0,
    totalLength: 0,
  });

  const handlePriceCalculated = useCallback((
    monthlyRate: number,
    components: { [key: string]: number },
    installationFee: number,
    deliveryFee: number,
    totalLength: number
  ) => {
    setQuote(prevQuote => ({
      ...prevQuote,
      monthlyRate,
      components,
      installationFee,
      deliveryFee,
      totalLength
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const quoteData: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'> = {
        customerId: customer.id,
        rentalRequestId: customer.rentalRequestId || '',
        components: quote.components || {},
        monthlyRate: quote.monthlyRate || 0,
        installationFee: quote.installationFee || 0,
        deliveryFee: quote.deliveryFee || 0,
        totalLength: quote.totalLength || 0,
        status: 'pending',
      };

      const newQuoteId = await quoteService.create(quoteData);
      await customerService.update(customer.id, { quoteId: newQuoteId });

      alert('Quote created successfully!');
      onQuoteCreated();
      onClose();
    } catch (error) {
      console.error('Error creating quote: ', error);
      alert('Error creating quote. Please try again.');
    }
  };

  return (
    <div className="quote-form-overlay">
      <div className="quote-form">
        <h2>Create Quote for {customer.firstName} {customer.lastName}</h2>
        <CustomerInfo customer={customer} />
        <RampPricingCalculator 
          onPriceCalculated={handlePriceCalculated} 
          customerAddress={customer.address}
        />
        <button onClick={handleSubmit}>Create Quote</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default QuoteForm;
```

# src/components/QuoteDetails.tsx

```tsx
// src/components/QuoteDetails.tsx
import React from 'react';
import { QuoteWithCustomer } from '../types/common';

interface QuoteDetailsProps {
  quote: QuoteWithCustomer;
  onClose: () => void;
}

const QuoteDetails: React.FC<QuoteDetailsProps> = ({ quote, onClose }) => {
  return (
    <div className="quote-details-modal">
      <div className="quote-details-content">
        <h2>Quote Details</h2>
        <p><strong>Customer Name:</strong> {quote.customerName}</p>
        <p><strong>Customer Address:</strong> {quote.customerAddress}</p>
        <p><strong>Monthly Rate:</strong> ${quote.monthlyRate.toFixed(2)}</p>
        <p><strong>Installation Fee:</strong> ${quote.installationFee.toFixed(2)}</p>
        <p><strong>Delivery Fee:</strong> ${quote.deliveryFee.toFixed(2)}</p>
        <p><strong>Upfront Cost:</strong> ${(quote.installationFee + quote.deliveryFee).toFixed(2)}</p>
        <p><strong>Total Length:</strong> {quote.totalLength} ft</p>
        <p><strong>Status:</strong> {quote.status}</p>
        <h3>Components:</h3>
        <ul>
          {Object.entries(quote.components).map(([componentId, quantity]) => (
            <li key={componentId}>{componentId}: {quantity}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuoteDetails;
```

# src/components/PriceVariablesManager.tsx

```tsx
// src/components/RampPricingCalculator/PriceVariablesManager.tsx
import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface PriceVariablesManagerProps {
  onVariablesLoaded: (variables: {
    baseDeliveryFee: number;
    deliveryFeePerMile: number;
    installFeePerRampSection: number;
    installFeePerLanding: number;
    monthlyRatePerFoot: number;
    warehouseAddress: string;
  }) => void;
}

const PriceVariablesManager: React.FC<PriceVariablesManagerProps> = ({ onVariablesLoaded }) => {
  useEffect(() => {
    const fetchPriceVariables = async () => {
      console.log('Fetching price variables in PriceVariablesManager');
      const docRef = doc(db, 'settings', 'priceVariables');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Fetched data:', data);
        onVariablesLoaded({
          baseDeliveryFee: data.baseDeliveryFee || 100,
          deliveryFeePerMile: data.deliveryFeePerMile || 2,
          installFeePerRampSection: data.installFeePerRampSection || 50,
          installFeePerLanding: data.installFeePerLanding || 100,
          monthlyRatePerFoot: data.monthlyRatePerFoot || 10,
          warehouseAddress: data.warehouseAddress || '',
        });
      }
    };
    fetchPriceVariables();
  }, [onVariablesLoaded]);

  return null;
};

export default PriceVariablesManager;
```

# src/components/PriceVariables.tsx

```tsx
import React from 'react';
import PriceVariablesManager from './PriceVariablesManager';

interface PriceVariablesProps {
  onClose: () => void;
}

const PriceVariables: React.FC<PriceVariablesProps> = ({ onClose }) => {
  const handleVariablesLoaded = (variables: any) => {
    console.log('Price variables loaded:', variables);
    // You can add more logic here if needed
  };

  return (
    <div>
      <PriceVariablesManager onVariablesLoaded={handleVariablesLoaded} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PriceVariables;
```

# src/components/PriceCalculator.tsx

```tsx
import React, { useCallback, useEffect } from 'react';
import { RampComponent } from './types';

interface PriceCalculatorProps {
  selectedComponents: { component: RampComponent; quantity: number }[];
  monthlyRatePerFoot: number;
  onMonthlyRateCalculated: (monthlyRate: number, totalLength: number) => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  selectedComponents,
  monthlyRatePerFoot,
  onMonthlyRateCalculated,
}) => {
  const calculateMonthlyRate = useCallback(() => {
    const totalLength = selectedComponents.reduce((total, { component, quantity }) => {
      return total + (component.length * quantity);
    }, 0);

    const monthlyRate = Math.round(totalLength * monthlyRatePerFoot);

    return { monthlyRate, totalLength };
  }, [selectedComponents, monthlyRatePerFoot]);

  useEffect(() => {
    const { monthlyRate, totalLength } = calculateMonthlyRate();
    onMonthlyRateCalculated(monthlyRate, totalLength);
  }, [calculateMonthlyRate, onMonthlyRateCalculated]);

  return null;
};

export default PriceCalculator;
```

# src/components/Payments.tsx

```tsx
// src/components/Payments.tsx
import React, { useState, useEffect } from 'react';
import { Payment } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';

const paymentService = new CrudService<Payment>('payments');

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [formData, setFormData] = useState<Partial<Payment>>({
    rentalAgreementId: '',
    amount: 0,
    status: 'pending',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const fetchedPayments = await paymentService.getAll();
    setPayments(fetchedPayments);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await paymentService.update(formData.id, formData);
      } else {
        await paymentService.create(formData as Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchPayments();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating payment: ', error);
    }
  };

  const resetForm = () => {
    setFormData({ rentalAgreementId: '', amount: 0, status: 'pending' });
    setIsEditing(false);
  };

  const handleEdit = (payment: Payment) => {
    setFormData(payment);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await paymentService.delete(id);
      fetchPayments();
    } catch (error) {
      console.error('Error deleting payment: ', error);
    }
  };

  const columns: Column<Payment>[] = [
    { label: 'Agreement ID', render: (payment) => payment.rentalAgreementId },
    { label: 'Amount', render: (payment) => `$${payment.amount}` },
    { label: 'Status', render: (payment) => payment.status },
  ];

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
        <button type="submit">{isEditing ? 'Update Payment' : 'Add Payment'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Payment List</h3>
      <DataTable 
        items={payments} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Payments;
```

# src/components/InstallationFeeCalculator.tsx

```tsx
import React, { useCallback, useEffect } from 'react';
import { RampComponent } from './types';

interface InstallationFeeCalculatorProps {
  selectedComponents: { component: RampComponent; quantity: number }[];
  installFeePerRampSection: number;
  installFeePerLanding: number;
  onInstallationFeeCalculated: (installationFee: number) => void;
}

const InstallationFeeCalculator: React.FC<InstallationFeeCalculatorProps> = ({
  selectedComponents,
  installFeePerRampSection,
  installFeePerLanding,
  onInstallationFeeCalculated,
}) => {
  const calculateInstallationFee = useCallback(() => {
    return selectedComponents.reduce((total, { component, quantity }) => {
      if (component.isLanding) {
        return total + (installFeePerLanding * quantity);
      } else {
        return total + (installFeePerRampSection * quantity);
      }
    }, 0);
  }, [selectedComponents, installFeePerRampSection, installFeePerLanding]);

  useEffect(() => {
    const installationFee = calculateInstallationFee();
    onInstallationFeeCalculated(installationFee);
  }, [calculateInstallationFee, onInstallationFeeCalculated]);

  return null;
};

export default InstallationFeeCalculator;
```

# src/components/FeesAndRatesDisplay.tsx

```tsx
import React from 'react';

interface FeesAndRatesDisplayProps {
  installationFee: number;
  deliveryFee: number;
  monthlyRate: number;
}

const FeesAndRatesDisplay: React.FC<FeesAndRatesDisplayProps> = ({
  installationFee,
  deliveryFee,
  monthlyRate
}) => {
  return (
    <div>
      <h3>Fees and Rates</h3>
      <p><strong>Installation Fee:</strong> ${installationFee}</p>
      <p><strong>Delivery Fee:</strong> ${deliveryFee}</p>
      <p><strong>Monthly Rental Rate:</strong> ${monthlyRate}</p>
    </div>
  );
};

export default FeesAndRatesDisplay;
```

# src/components/DistanceCalculator.tsx

```tsx
/// <reference types="@types/google.maps" />
import React, { useEffect, useState } from 'react';

interface DistanceCalculatorProps {
  warehouseAddress: string;
  customerAddress: string;
  baseDeliveryFee: number;
  deliveryFeePerMile: number;
  onDistanceCalculated: (distance: number, fee: number) => void;
}

const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({
  warehouseAddress,
  customerAddress,
  baseDeliveryFee,
  deliveryFeePerMile,
  onDistanceCalculated,
}) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => setIsGoogleMapsLoaded(true));
      document.head.appendChild(script);
    } else {
      setIsGoogleMapsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const calculateDistance = () => {
      if (isGoogleMapsLoaded && warehouseAddress && customerAddress) {
        const service = new google.maps.DistanceMatrixService();
        const request: google.maps.DistanceMatrixRequest = {
          origins: [warehouseAddress],
          destinations: [customerAddress],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        };

        service.getDistanceMatrix(request, (response, status) => {
          if (status === 'OK' && response) {
            const distance = response.rows[0].elements[0].distance.value;
            const distanceInMiles = distance / 1609.34;
            const roundedDistance = Math.round(distanceInMiles * 10) / 10;
            
            const calculatedDeliveryFee = baseDeliveryFee + (roundedDistance * deliveryFeePerMile);
            const roundedDeliveryFee = Math.round(calculatedDeliveryFee);
            
            onDistanceCalculated(roundedDistance, roundedDeliveryFee);
          }
        });
      }
    };

    calculateDistance();
  }, [isGoogleMapsLoaded, warehouseAddress, customerAddress, baseDeliveryFee, deliveryFeePerMile, onDistanceCalculated]);

  return null;
};

export default DistanceCalculator;
```

# src/components/DeliveryFeeDisplay.tsx

```tsx
// src/components/RampPricingCalculator/DeliveryFeeDisplay.tsx
import React from 'react';

interface DeliveryFeeDisplayProps {
  distance: number;
  deliveryFee: number;
}

const DeliveryFeeDisplay: React.FC<DeliveryFeeDisplayProps> = ({ distance, deliveryFee }) => {
  return (
    <div>
      <h3>Delivery Fee</h3>
      <p>Distance: {distance} miles</p>
      <p>Fee: ${deliveryFee}</p>
    </div>
  );
};

export default DeliveryFeeDisplay;
```

# src/components/Customers.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import QuoteForm from './QuoteForm';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';  // Make sure to import your Firestore instance
import AddCustomerForm from './AddCustomerForm';

const customerService = new CrudService<Customer>('customers');

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const fetchedCustomers = await customerService.getAll();
    setCustomers(fetchedCustomers);
  };

  const handleEdit = (customer: Customer) => {
    // Implement edit functionality if needed
    console.log('Edit customer:', customer);
  };

  const handleDelete = async (id: string) => {
    try {
      const customerToDelete = customers.find(customer => customer.id === id);
      
      if (customerToDelete) {
        const batch = writeBatch(db);

        // Delete the customer
        const customerRef = doc(db, 'customers', id);
        batch.delete(customerRef);

        // If the customer has an associated rental request, update it
        if (customerToDelete.rentalRequestId) {
          const requestRef = doc(db, 'rentalRequests', customerToDelete.rentalRequestId);
          batch.update(requestRef, { customerId: null });
        }

        // Commit the batch
        await batch.commit();
        console.log('Customer and related documents updated successfully');

        // After deleting, fetch the updated list of customers
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error in batch delete operation: ', error);
    }
  };

  const handleCreateQuote = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowQuoteForm(true);
  };

  const handleQuoteFormClose = () => {
    setShowQuoteForm(false);
    setSelectedCustomer(null);
    fetchCustomers();
  };

  const handleAddCustomer = () => {
    setShowAddForm(true);
  };

  const handleCustomerAdded = () => {
    setShowAddForm(false);
    fetchCustomers();
  };

  const columns: Column<Customer>[] = [
    { label: 'Name', render: (customer) => `${customer.firstName} ${customer.lastName}` },
    { label: 'Email', render: (customer) => customer.email },
    { label: 'Phone', render: (customer) => customer.phone },
    { label: 'Address', render: (customer) => customer.address },
  ];

  return (
    <div>
      <h2>Customers</h2>
      <button onClick={handleAddCustomer}>Add New Customer</button>
      
      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <AddCustomerForm
              onCustomerAdded={handleCustomerAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      <h3>Customer List</h3>
      <DataTable 
        items={customers} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        additionalAction={{
          label: 'Create Quote',
          action: handleCreateQuote,
          showIf: (customer) => !customer.quoteId
        }}
      />
      {showQuoteForm && selectedCustomer && (
        <QuoteForm 
          customer={selectedCustomer} 
          onClose={handleQuoteFormClose}
          onQuoteCreated={fetchCustomers}
        />
      )}
    </div>
  );
};

export default Customers;
```

# src/components/CustomerInfo.tsx

```tsx
import React from 'react';
import { Customer } from '../types/common';

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <div className="customer-info">
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
    </div>
  );
};

export default CustomerInfo;
```

# src/components/ComponentSelector.tsx

```tsx
// src/components/RampPricingCalculator/ComponentSelector.tsx
import React from 'react';
import { RampComponent } from './types';

interface ComponentSelectorProps {
  rampComponents: RampComponent[];
  monthlyRatePerFoot: number;
  onAddComponent: (componentId: string) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ rampComponents, monthlyRatePerFoot, onAddComponent }) => (
  <select onChange={(e) => onAddComponent(e.target.value)} defaultValue="">
    <option value="" disabled>Select a component</option>
    {rampComponents.map((component) => (
      <option key={component.id} value={component.id}>
        {component.name} (${(component.length * monthlyRatePerFoot).toFixed(2)}/month)
      </option>
    ))}
  </select>
);

export default ComponentSelector;
```

# src/components/Agreements.tsx

```tsx
// src/components/Agreements.tsx
import React, { useState, useEffect } from 'react';
import { Agreement } from '../types/common';
import { CrudService } from '../services/crudService';
import DataTable, { Column } from './shared/DataTable';
import { Timestamp } from 'firebase/firestore';

const agreementService = new CrudService<Agreement>('agreements');

const Agreements: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [formData, setFormData] = useState<Partial<Agreement>>({
    customerId: '',
    rentalRequestId: '',
    startDate: Timestamp.now(),
    endDate: Timestamp.now(),
    status: 'pending',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    const fetchedAgreements = await agreementService.getAll();
    setAgreements(fetchedAgreements);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: Timestamp.fromDate(new Date(value)) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await agreementService.update(formData.id, formData);
      } else {
        await agreementService.create(formData as Omit<Agreement, 'id' | 'createdAt' | 'updatedAt'>);
      }
      fetchAgreements();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating agreement: ', error);
    }
  };

  const resetForm = () => {
    setFormData({ customerId: '', rentalRequestId: '', startDate: Timestamp.now(), endDate: Timestamp.now(), status: 'pending' });
    setIsEditing(false);
  };

  const handleEdit = (agreement: Agreement) => {
    setFormData(agreement);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await agreementService.delete(id);
      fetchAgreements();
    } catch (error) {
      console.error('Error deleting agreement: ', error);
    }
  };

  const columns: Column<Agreement>[] = [
    { label: 'Customer ID', render: (agreement) => agreement.customerId },
    { label: 'Request ID', render: (agreement) => agreement.rentalRequestId },
    { label: 'Start Date', render: (agreement) => agreement.startDate.toDate().toLocaleDateString() },
    { label: 'End Date', render: (agreement) => agreement.endDate.toDate().toLocaleDateString() },
    { label: 'Status', render: (agreement) => agreement.status },
  ];

  return (
    <div>
      <h2>Agreements</h2>
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
          value={formData.startDate?.toDate().toISOString().split('T')[0]}
          onChange={handleDateChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate?.toDate().toISOString().split('T')[0]}
          onChange={handleDateChange}
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
        <button type="submit">{isEditing ? 'Update Agreement' : 'Add Agreement'}</button>
        {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
      </form>
      <h3>Agreement List</h3>
      <DataTable 
        items={agreements} 
        columns={columns} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Agreements;
```

# src/components/AddCustomerForm.tsx

```tsx
import React, { useState } from 'react';
import { CrudService } from '../services/crudService';
import { Customer } from '../types/common';
import AddressField from './shared/AddressField';

interface AddCustomerFormProps {
  onCustomerAdded: () => void;
  onCancel: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onCustomerAdded, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const customerService = new CrudService<Customer>('customers');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (address: string) => {
    setFormData(prevData => ({ ...prevData, address }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await customerService.create(formData);
      alert('Customer added successfully!');
      onCustomerAdded();
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Error adding customer. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Customer</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <AddressField
          value={formData.address}
          onChange={handleAddressChange}
          placeholder="Enter customer address"
        />
      </div>
      <button type="submit">Add Customer</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddCustomerForm;
```

# src/components/shared/SimpleList.tsx

```tsx
import React from 'react';

export interface Column<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

interface SimpleListProps<T> {
  items: T[];
  columns: Column<T>[];
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  color: '#333',
  fontWeight: 'bold',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

const trHoverStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
};

function SimpleList<T>({ items, columns }: SimpleListProps<T>) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={thStyle}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            style={{ ...tdStyle }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor || '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} style={tdStyle}>{column.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SimpleList;
```

# src/components/shared/FormInput.tsx

```tsx
// src/components/shared/FormInput.tsx
import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <input {...props} />
  </div>
);

export default FormInput;
```

# src/components/shared/DataTable.tsx

```tsx
import React from 'react';
import { BaseEntity } from '../../types/common';

export interface Column<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends BaseEntity> {
  items: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => Promise<void>;
  additionalAction?: {
    label: string;
    action: (item: T) => void;
    showIf?: (item: T) => boolean;
  };
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  color: '#333',
  fontWeight: 'bold',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

function DataTable<T extends BaseEntity>({ items, columns, onEdit, onDelete, additionalAction }: DataTableProps<T>) {
  const handleDelete = async (item: T) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await onDelete(item.id);
    }
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={thStyle}>{column.label}</th>
          ))}
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} style={tdStyle}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} style={tdStyle}>{column.render(item)}</td>
            ))}
            <td style={tdStyle}>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
              {additionalAction && (!additionalAction.showIf || additionalAction.showIf(item)) && (
                <button onClick={() => additionalAction.action(item)}>{additionalAction.label}</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
```

# src/components/shared/CustomerInfo.tsx

```tsx
import React from 'react';
import { Customer } from '../../types/common';

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <div className="customer-info" style={{
      backgroundColor: '#f0f0f0',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px'
    }}>
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
      {customer.rentalRequestId && (
        <p><strong>Rental Request ID:</strong> {customer.rentalRequestId}</p>
      )}
    </div>
  );
};

export default CustomerInfo;
```

# src/components/shared/ConfirmationDialog.tsx

```tsx
// src/components/shared/ConfirmationDialog.tsx
import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmationDialog;
```

# src/components/shared/AddressField.tsx

```tsx
/// <reference types="@types/google.maps" />
import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

interface AddressFieldProps {
  value?: string;  // Make value optional
  onChange: (address: string) => void;
  placeholder?: string;
}

// Define libraries array outside of the component
const libraries: ("places")[] = ['places'];

const AddressField: React.FC<AddressFieldProps> = ({ value = '', onChange, placeholder = 'Enter address' }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      if (address) {
        onChange(address);
      }
    }
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
    </Autocomplete>
  );
};

export default AddressField;
```

