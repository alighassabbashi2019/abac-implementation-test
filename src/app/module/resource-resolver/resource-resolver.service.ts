import { Inject, Injectable, Type } from '@nestjs/common';
import { RESOURCE_STORE_KEY, RESOURCE_TOKEN } from './constant';
import { Resource } from '@constant/enum';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class ResourceResolverService {
  constructor(
    @Inject(RESOURCE_STORE_KEY) private readonly store: Record<Resource, Type>,
    @Inject(RESOURCE_TOKEN) private readonly resource: Resource,
    private readonly moduleRef: ModuleRef,
  ) {
  }

  resolveResource(id: string): any {
    const repository = this.moduleRef.get(this.store[this.resource]);
    return repository.findOne({ where: { id } });
  }
}
