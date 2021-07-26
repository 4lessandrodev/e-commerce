import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HeaderUserAgent } from '../interfaces/user-agent.interface';
import { UAParser } from 'ua-parser-js';
import { Term } from '../entities/user.schema';

export const GetUserAgent = createParamDecorator(
	(_data: any, ctx: ExecutionContext): Term => {
		const req = ctx.switchToHttp().getRequest();
		const headers: HeaderUserAgent = req.headers;

		const parser = new UAParser();
		const userAgent = headers['user-agent'];

		parser.setUA(userAgent);

		const result = parser.getResult();

		return {
			acceptedAt: new Date(),
			browser: result?.browser?.name ?? 'Chrome',
			ip: '0.0.0.0.0',
			os: result?.os?.name ?? 'Mobile',
			termVersion: '1.0'
		};
	}
);
