/**
 * @author Pritesh Bhanderi
 */
import { get } from 'config';
import logger from '../logger';
const list: string[] = get('white_listed_sources');
export const appOptions = {
  origin: (origin: string, cb: (error: any, allow?: boolean) => void) => {
    const allowed = list.indexOf(origin) > -1;
    logger.info('checking cors:' + origin + ' is it allowed?=' + allowed);
    if (allowed) {
      cb(null, allowed);
    } else {
      logger.error(`the origin ${origin} is not white listed so returning 500`);
      cb('Internal server error, unauthorized activity');
    }
  },
};
