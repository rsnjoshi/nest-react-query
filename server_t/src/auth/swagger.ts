export default {
  login: {
    operation: {
      summary: 'Post login credential through /login post request',
    },
    response: {
      err_400: {
        status: 400,
        description: 'Bad Request ["not valid"]',
      },
      err_401: {
        status: 401,
        description: 'unauthorized',
      },
      created_201: {
        status: 201,
        description: 'created token and succesfull login',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '2',
            },
            name: {
              type: 'string',
              example: 'john.doe@example.com',
            },
            accessToken: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2hhbi5qb3NoaUBnbWFpbC5jb20iLCJpYXQiOjE2NzIyMzY4MzgsImV4cCI6MTY3MjI0MDQzOH0.Ee6z0Zt3NvamIJl9ub5lZUwayMX5Cfvy9zV1YW_-eZI',
            },
            username: {
              type: 'string',
              example: 'johndoe23',
            },
          },
        },
      },
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'xyz@example.com',
            description: 'registered email address',
          },
          password: {
            type: 'string',
            example: '12$dfs&*?',
            description: 'registered password',
          },
        },
      },
    },
  },
  signUp: {
    operation: {
      summary: 'Post user details',
    },
    response: {
      err_400: {
        status: 400,
        description: 'Bad Request ["not valid"]',
      },
      created_201: {
        status: 201,
        description: 'created user',
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '5',
              description: 'User id',
            },
            username: {
              type: 'string',
              example: 'john345',
              description: 'username',
            },
          },
        },
      },
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            example: 'john',
          },
          lastName: {
            type: 'string',
            example: 'doe',
          },
          email: {
            type: 'string',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            example: '3243kl4%#@',
          },
          username: {
            type: 'string',
            example: 'johndoe23',
          },
        },
      },
    },
  },
};
