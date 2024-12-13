import { DynamicModule, Module } from '@nestjs/common';
import { ResourceResolverService } from './resource-resolver.service';
import { RESOURCE_STORE_KEY, RESOURCE_TOKEN, USELESS_TOKEN } from './constant';
import { IResourceRepository } from './interface';
import { ObjectLiteral, Repository } from 'typeorm';

@Module({})
export class ResourceResolverModule {
  public static forRoot(): DynamicModule {
    return {
      module: ResourceResolverModule,
      providers: [
        {
          provide: RESOURCE_STORE_KEY,
          useValue: {},
        },
      ],
      exports: [RESOURCE_STORE_KEY],
      global: true,
    };
  }

  public static forFeature(resourceRepositories: IResourceRepository): DynamicModule {
    return {
      module: ResourceResolverModule,
      providers: [
        {
          provide: USELESS_TOKEN,
          useFactory: (store: Record<string, Repository<ObjectLiteral>>) => {
            resourceRepositories.repositories.forEach(repo => {
              Object.assign(store, { [resourceRepositories.resource]: repo });
            });
          },
          inject: [RESOURCE_STORE_KEY],
        },
        {
          provide: RESOURCE_TOKEN,
          useValue: resourceRepositories.resource,
        },
        ResourceResolverService,
        ...resourceRepositories.repositories,
      ],
      exports: [ResourceResolverService],
    };
  }
}
