# property-manager-api

## Running
First, install all dependencies:
```bash
npm ci
```
To run, use:
```bash
npm run prod
```
Or in dev environment:
```bash
npm run dev
```

## Environmental variables
To set application port, provide:
```bash
PORT=3000
```
To set Weatherstack API access key, provide:
```bash
WEATHERSTACK_API_ACCESS_KEY=your-access-key
```

To set MongoDB, provide:
```bash
MONGO_HOSTNAME=mongo-hostname
MONGO_PORT=27017
MONGO_DBNAME=propertydb
```

You can modify those values to adjust to your settings.
