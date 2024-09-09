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