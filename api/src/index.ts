import app from './app';

const port = process.env.PORT || 5000;
console.log('process.env.PORT - ', process.env.PORT);
console.log(`ConnDb - mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`)
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
