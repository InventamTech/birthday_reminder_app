import { get } from 'config';
import { sign, verify } from 'jsonwebtoken';
const jwtConfig: any = get('jwt');
const jwtOption = {
  expiresIn: jwtConfig.expiresIn || '30m',
};
export interface IAuth {
  name: string;
  email: string;
  id: string;
}

export function getJwt(data: IAuth) {
  return sign(data, jwtConfig.secret, jwtOption);
}

export async function verifyJwt(authorization: string): Promise<IAuth | any> {
  return await verify(authorization, jwtConfig.secret);
}
