import { Resource } from '@constant/enum';
import { Type } from '@nestjs/common';

export interface IResourceRepository {
  resource: Resource;
  repositories: Type[];
}
