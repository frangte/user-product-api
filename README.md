## Assignments

### Prerequisite

```
- node (v18.18.2), yarn, python (v3.12.0)
```


### Setup and run services

- We has 2 services and 1 proxy server to run, so please create 3 seperated terminal to run each of them

```
# Terminal (1), run user-apis
cd user-api
yarn
yarn prisma migrate deploy
yarn seed # for seeding data
yarn dev # for quit run server
# or run build file
yarn build && node ./dist/index.js 
```

```
# Terminal (2), run product-apis
cd product-api
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py loaddata seed.json
python3 manage.py runserver
```

```
# Terminal (3), run proxy
cd proxy
python3 run.py
```

```
# url to test full flow
http://localhost:8000/api/orders/a9d0c6b0-ba38-11eb-8b4e-bd5f3d3c3b40/
```

### Detail

1. User APIs
  - Using Prisma for database orm
  - Still missing some log, request validation, and error handling (needs to )


2. Product APIs
  - Using sqlite3 for database
  - Still missing some log, request validation, and error handling, production deploy
