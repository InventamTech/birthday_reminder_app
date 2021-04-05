import { Request, Response, NextFunction } from 'express';
import { isUndefined } from 'util';
import { verifyJwt } from '../helpers';
import logger from '../logger';

export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
  logger.debug('inside middleware >>> authorizeUser');
  try {
    const { authorization } = req.headers;
    logger.info(`path:${req.path}, token:${authorization}`);
    if (isUndefined(authorization)) {
      logger.error('no authorization header found so sending 401');
      return res.status(401).json({
        message: 'Unauthorized access',
      });
    }
    const tokenData = await verifyJwt(authorization);
    logger.debug(`tokenData : ${JSON.stringify(tokenData)}`);
    req.headers.tokenData = tokenData;
    next();
  } catch (error) {
    logger.error('error while verifying user so sending 401');
    console.log(error);
    return res.status(401).json({
      message: 'Unauthorized access',
    });
  }
};
