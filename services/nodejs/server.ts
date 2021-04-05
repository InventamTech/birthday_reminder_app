import logger from './src/logger';
import server from './src';
import birthDayReminderTask from './src/cron/birthday-reminder';
const port = process.env.PORT || 8081;
server.listen(port, () => {
  logger.info(`server started on port ${port}`);
  birthDayReminderTask.start();
});
