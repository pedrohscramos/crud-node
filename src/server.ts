import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(`${process.env.PORT || '3000'}`);

import app from './app';

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));