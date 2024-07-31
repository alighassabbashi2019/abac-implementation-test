import { SubjectEnum } from '@constant/enum';
import { SetMetadata } from '@nestjs/common';

export const ABAC_SUBJECT_KEY = 'abac_action';
export const AbacSubject = (subject: SubjectEnum) => SetMetadata(ABAC_SUBJECT_KEY, subject);
