import { SubjectEnum } from '@constant/enum';
import { Type } from '@nestjs/common';

export interface ISubjectRepository {
  subject: SubjectEnum;
  repositories: Type[];
}
