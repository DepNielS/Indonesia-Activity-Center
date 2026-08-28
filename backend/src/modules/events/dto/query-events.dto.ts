import {
  IsEnum,
  IsOptional,
} from 'class-validator';

import { EventStatus } from './create-event.dto';

export class QueryEventsDto {
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}