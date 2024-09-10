import { CrudService } from '../services/crudService';
import { PriceVariablesType } from '../types/common';
import { Timestamp } from 'firebase/firestore';

class PriceVariablesManager {
  private static crudService = new CrudService<PriceVariablesType>('priceVariables');

  static async getVariables(): Promise<PriceVariablesType> {
    try {
      const variables = await this.crudService.getAll();
      if (variables.length > 0) {
        return variables[0];
      } else {
        console.warn('No price variables found in the database.');
        return this.getDefaultVariables();
      }
    } catch (error) {
      console.error('Error fetching price variables:', error);
      return this.getDefaultVariables();
    }
  }

  static async saveVariables(variables: Omit<PriceVariablesType, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const existingVariables = await this.crudService.getAll();
      if (existingVariables.length > 0) {
        await this.crudService.update(existingVariables[0].id, variables as PriceVariablesType);
      } else {
        await this.crudService.create(variables as PriceVariablesType);
      }
    } catch (error) {
      console.error('Error saving price variables:', error);
      throw error;
    }
  }

  static getDefaultVariables(): PriceVariablesType {
    return {
      id: '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      baseDeliveryFee: 0,
      deliveryFeePerMile: 0,
      installFeePerRampSection: 0,
      installFeePerLanding: 0,
      monthlyRatePerFoot: 0,
      warehouseAddress: '',
    };
  }
}

export default PriceVariablesManager;