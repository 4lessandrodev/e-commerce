// @ts-expect-error
import { Headers } from '@nestjs/common';
export interface HeaderUserAgent extends Headers {
	'user-agent': string;
}
