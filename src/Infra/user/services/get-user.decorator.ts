import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt.payload.interface';

export const GetUser = createParamDecorator(
	(_data, ctx: ExecutionContext): JwtPayload => {
		const req = ctx.switchToHttp().getRequest();
		return req.user;
	}
);
