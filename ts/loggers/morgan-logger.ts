import fs from 'fs';
import morgan from 'morgan';

const stream = fs.createWriteStream('/log/log.txt', { flags: 'a' });

export default morgan('tiny', { stream: stream });