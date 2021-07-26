import {
	MAX_REGION_DESCRIPTION_LENGTH,
	MIN_REGION_DESCRIPTION_LENGTH
} from './region.domain-aggregate-root';
export const ERROR_REGION_DESCRIPTION_LENGTH = `Region Description length Should be between ${MIN_REGION_DESCRIPTION_LENGTH} and ${MAX_REGION_DESCRIPTION_LENGTH}`;
export const ERROR_FREIGHT_PRICE_FOR_REGION = 'Freight must be positive value';
