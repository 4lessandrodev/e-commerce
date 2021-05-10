import { BasketService } from '../basket.service';

describe('basket.service', () => {
  it('should be defined', () => {
    const service = new BasketService();
    expect(service).toBeDefined();
  });
});
