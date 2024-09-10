import { useState, useEffect, useCallback } from 'react';
import { Quote, Customer } from '../types/common';
import { CrudService } from '../services/crudService';
import { Timestamp } from 'firebase/firestore';

const quoteService = new CrudService<Quote>('quotes');
const customerService = new CrudService<Customer>('customers');

export interface QuoteWithCustomer extends Quote {
  customer: Customer;
}

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteWithCustomer[]>([]);

  const fetchQuotes = useCallback(async () => {
    const fetchedQuotes = await quoteService.getAll();
    const quotesWithCustomers = await Promise.all(
      fetchedQuotes.map(async (quote) => {
        const customer = await customerService.getById(quote.customerId);
        return { ...quote, customer } as QuoteWithCustomer;
      })
    );
    setQuotes(quotesWithCustomers);
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleAddOrUpdateQuote = async (quoteData: Partial<Quote>) => {
    try {
      if (quoteData.id) {
        await quoteService.update(quoteData.id, quoteData);
      } else {
        await quoteService.create({
          ...quoteData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        } as Omit<Quote, 'id'>);
      }
      await fetchQuotes();
    } catch (error) {
      console.error('Error adding/updating quote: ', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await quoteService.delete(id);
      await fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote: ', error);
    }
  };

  return {
    quotes,
    fetchQuotes,
    handleAddOrUpdateQuote,
    handleDelete,
  };
};