import { SetMetadata } from '@nestjs/common';
import { ActionEnum } from '@constant/enum';

export const ABAC_ACTION_KEY = 'abac_action';
export const AbacAction = (action: ActionEnum) => SetMetadata(ABAC_ACTION_KEY, action);
