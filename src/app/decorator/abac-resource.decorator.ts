import { Resource } from '@constant/enum';
import { SetMetadata } from '@nestjs/common';

export const ABAC_RESOURCE_KEY = 'abac_action';
export const AbacResource = (resource: Resource) => SetMetadata(ABAC_RESOURCE_KEY, resource);
