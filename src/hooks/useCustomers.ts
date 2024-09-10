import { useState, useEffect, useCallback } from 'react';
import { Customer, Quote } from '../types/common';
import { CrudService } from '../services/crudService';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';

const customerService = new CrudService<Customer>('customers');
const quoteService = new CrudService<Quote>('quotes');

export const useCustomers = () => {
  const [customers, setCustomers] = useState<(Customer & { quote?: Quote })[]>([]);

  const fetchCustomers = useCallback(async () => {
    const fetchedCustomers = await customerService.getAll();
    const quotes = await quoteService.getAll();
    
    const customersWithQuotes = fetchedCustomers.map(customer => {
      const customerQuote = quotes.find(quote => quote.customerId === customer.id);
      return { ...customer, quote: customerQuote };
    });

    setCustomers(customersWithQuotes);
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleDelete = async (id: string) => {
    try {
      const customerToDelete = customers.find(customer => customer.id === id);
      
      if (customerToDelete) {
        const batch = writeBatch(db);

        const customerRef = doc(db, 'customers', id);
        batch.delete(customerRef);

        if (customerToDelete.rentalRequestId) {
          const requestRef = doc(db, 'rentalRequests', customerToDelete.rentalRequestId);
          batch.update(requestRef, { customerId: null });
        }

        if (customerToDelete.quote) {
          const quoteRef = doc(db, 'quotes', customerToDelete.quote.id);
          batch.delete(quoteRef);
        }

        await batch.commit();
        console.log('Customer and related documents updated successfully');

        fetchCustomers();
      }
    } catch (error) {
      console.error('Error in batch delete operation: ', error);
    }
  };

  return {
    customers,
    fetchCustomers,
    handleDelete,
  };
};