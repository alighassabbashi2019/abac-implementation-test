import { Inject, Injectable, Type } from '@nestjs/common';
import { SUBJECT_STORE_KEY, SUBJECT_TOKEN } from './constant';
import { SubjectEnum } from '@constant/enum';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class SubjectResolverService {
  constructor(
    @Inject(SUBJECT_STORE_KEY) private readonly store: Record<SubjectEnum, Type>,
    @Inject(SUBJECT_TOKEN) private readonly subject: SubjectEnum,
    private readonly moduleRef: ModuleRef,
  ) {
  }

  resolveSubject(id: string): any {
    const repository = this.moduleRef.get(this.store[this.subject]);
    return repository.findOne({ where: { id } });
  }
}
