import { RegionName } from './RegionName.value-object';

describe('RegionName.value-object', () => {
  it('should be defined', () => {
    const region = RegionName.create('street name');
    expect(region).toBeDefined();
  });

  it('should fail if description length is greater than 20 characters', () => {
    const region = RegionName.create('invalid_long_description'.repeat(10));
    expect(region.isFailure).toBe(true);
  });

  it('should create a valid region name', () => {
    const region = RegionName.create('valid description');
    expect(region.isSuccess).toBe(true);
  });
});
