import { CrudService } from '../services/crudService';
import { PriceVariablesType, BaseEntity } from '../types/common';

class PriceVariablesManager {
  private static crudService = new CrudService<PriceVariablesType & BaseEntity>('priceVariables');

  static async getVariables(): Promise<PriceVariablesType> {
    const variables = await this.crudService.getAll();
    return variables[0] || {
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      baseDeliveryFee: 0,
      deliveryFeePerMile: 0,
      installFeePerRampSection: 0,
      installFeePerLanding: 0,
      monthlyRatePerFoot: 0,
      warehouseAddress: '',
    };
  }

  static async saveVariables(variables: Omit<PriceVariablesType, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const existingVariables = await this.crudService.getAll();
    if (existingVariables.length > 0) {
      await this.crudService.update(existingVariables[0].id, variables as PriceVariablesType & BaseEntity);
    } else {
      await this.crudService.create(variables as PriceVariablesType & BaseEntity);
    }
  }
}

export default PriceVariablesManager;