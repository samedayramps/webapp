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
import AdminSettings from './pages/AdminSettings';

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
              <Route path="/admin/settings" element={<AdminSettings />} />
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