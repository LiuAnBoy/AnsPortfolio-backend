const registerUserBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
};

const register = {
  tags: ['Users'],
  summary: 'User Register',
  operationId: 'userRegister',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          $ref: '#/components/schemas/registerUserBody',
        },
        encoding: {
          contentType: 'application/json',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Register Successful',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/registerUserBody',
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

export { register, registerUserBody };
