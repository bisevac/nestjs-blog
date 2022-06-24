## Description

_Blog_

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API

---

### BaseResponse

```js
class APIResponse<T> {
  error: boolean;
  message: string;
  statusCode: HttpStatus;
  errorCode: string;
  result: T | any;
  timestamp: string;
}
```

### Blog Add

`POST /blog`

```js
class RequestDTO {
  title: string;
  shortContent?: string;
  content: string;
  image: file;
}

class ResponseDTO {
  id: number;
  atCreated: Date;
}
```

`EXAMPLE`

```bash
curl --location --request POST '{DOMAIN}/blog' \
--form 'title="Mauris eget risus tincidunt arcu viverra"' \
--form 'shortContent="Donec efficitur mauris non turpis mollis sollicitudin."' \
--form 'content="Integer vitae neque nunc. Integer orci tortor, "' \
--form 'image=@"{IMAGE_PATH}"'

RESPONSE
{
    "error": false,
    "message": "OK",
    "statusCode": 200,
    "errorCode": null,
    "result": {
        "id": 17,
        "atCreated": "2022-06-20T22:16:01.304Z"
    },
    "timestamp": "2022-06-20T22:16:01.424Z"
}
```

### Blog Pagination

`GET /blog`

```js
class RequestDTO {
  title: string;
  shortContent?: string;
  content: string;
  image: file;
}

class Blog {
  id: number;
  title: string;
  shortContent?: string;
}

class ResponseDTO {
  data: Blog[];
  total: number;
  totalPage: number;
  nextPage: number;
  prevPage: number;
  currentPage: number;
  limit: number;
}
```

`EXAMPLE`

```bash
curl --location --request GET '{DOMAIN}/blog?page=1&limit=5'

RESPONSE
{
    "error": false,
    "message": "OK",
    "statusCode": 200,
    "errorCode": null,
    "result": {
        "data": [
            {
                "id": 1,
                "title": "felis lorem congue enim",
                "shortContent": "Suspendisse id tellus quis risus"
            },
            {
                "id": 2,
                "title": "Nam nunc risus,",
                "shortContent": "test13"
            },
            {
                "id": 3,
                "title": "Suspendisse id tellus quis risus",
                "shortContent": "test13"
            },
            {
                "id": 4,
                "title": "Suspendisse T tellus quis risus",
                "shortContent": "et scelerisque orci consectetur sit amet."
            },
            {
                "id": 6,
                "title": "Phasellus vel metus fringilla,",
                "shortContent": " Nam nunc risus,"
            }
        ],
        "total": 16,
        "totalPage": 4,
        "nextPage": 2,
        "prevPage": null,
        "currentPage": 1,
        "limit": 5
    },
    "timestamp": "2022-06-20T22:17:48.788Z"
}
```


### Blog Detail

`GET /blog/:id`

```js

class ResponseDTO {
  id: number;
  title: string;
  shortContent?: string;
  content: string;
  image: string;
  totalViewCount: number;
  uniqueViewCount: number;
  atCreated: Date;
  atUpdated: Date;
}

```

`EXAMPLE`

```bash
curl --location --request GET '{DOMAIN}/blog/17'

RESPONSE
{
    "error": false,
    "message": "OK",
    "statusCode": 200,
    "errorCode": null,
    "result": {
        "id": 17,
        "title": "Mauris eget risus tincidunt arcu viverra",
        "shortContent": "Donec efficitur mauris non turpis mollis sollicitudin.",
        "content": "Integer vitae neque nunc. Integer orci tortor, ",
        "image": "localhost:3000/images/8BV9YYT.png",
        "totalViewCount": 5,
        "uniqueViewCount": 2,
        "atCreated": "2022-06-20T22:16:01.304Z",
        "atUpdated": "2022-06-20T22:21:49.000Z"
    },
    "timestamp": "2022-06-20T22:24:02.582Z"
}
```

### Blog Update

`UPDATE /blog/:id`

```js
class RequestDTO {
  id:number;
  title: string;
  shortContent?: string;
  content: string;
  image: file;
}
```

`EXAMPLE`

```bash
curl --location --request POST '{DOMAIN}/blog' \
--form 'id="5"' \
--form 'title="Mauris eget risus tincidunt arcu viverra"' \
--form 'shortContent="Donec efficitur mauris non turpis mollis sollicitudin."' \
--form 'content="Integer vitae neque nunc. Integer orci tortor, "' \
--form 'image=@"{IMAGE_PATH}"'

RESPONSE
{
    "error": false,
    "message": "OK",
    "statusCode": 200,
    "errorCode": null,
    "result": true,
    "timestamp": "2022-06-20T22:28:27.035Z"
}
```



### Blog Delete

`DELETE /blog/:id`

`EXAMPLE`

```bash
curl --location --request DELETE '{DOMAIN}/blog/2'

RESPONSE
{
    "error": false,
    "message": "OK",
    "statusCode": 200,
    "errorCode": null,
    "result": true,
    "timestamp": "2022-06-20T22:26:19.912Z"
}
```


## SWAGGER

You can find swagger api documentation on `/api-guide`