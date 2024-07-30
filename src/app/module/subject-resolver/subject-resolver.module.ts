import { DynamicModule, Module } from '@nestjs/common';
import { SubjectResolverService } from './subject-resolver.service';
import { SUBJECT_STORE_KEY, SUBJECT_TOKEN, USELESS_TOKEN } from './constant';
import { ISubjectRepository } from './interface';
import { ObjectLiteral, Repository } from 'typeorm';

@Module({})
export class SubjectResolverModule {
  public static forRoot(): DynamicModule {
    return {
      module: SubjectResolverModule,
      providers: [
        {
          provide: SUBJECT_STORE_KEY,
          useValue: {},
        },
      ],
      exports: [SUBJECT_STORE_KEY],
      global: true,
    };
  }

  public static forFeature(subjectRepositories: ISubjectRepository): DynamicModule {
    return {
      module: SubjectResolverModule,
      providers: [
        {
          provide: USELESS_TOKEN,
          useFactory: (store: Record<string, Repository<ObjectLiteral>>) => {
            subjectRepositories.repositories.forEach(repo => {
              Object.assign(store, { [subjectRepositories.subject]: repo });
            });
          },
          inject: [SUBJECT_STORE_KEY],
        },
        {
          provide: SUBJECT_TOKEN,
          useValue: subjectRepositories.subject,
        },
        SubjectResolverService,
        ...subjectRepositories.repositories,
      ],
      exports: [SubjectResolverService],
    };
  }
}
