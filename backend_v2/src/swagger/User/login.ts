const loginUserBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'ericgfds123hgfdh3gf@gmail.com',
      required: true,
    },
    password: {
      type: 'string',
      example: '123456',
      required: true,
    },
  },
};

const login = {
  tags: ['Users'],
  summary: 'User Login',
  operationId: 'userLogin',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          $ref: '#/components/schemas/loginUserBody',
        },
        encoding: {
          contentType: 'application/json',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Login Successful',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/loginUserBody',
          },
          encoding: {
            contentType: 'application/json',
          },
        },
      },
    },
    '422': {
      description: 'Validator Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Please check your credentials',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    },
  },
};

export { login, loginUserBody };
