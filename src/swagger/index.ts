import { login, loginUserBody } from './User/login';

const apiDoc = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: "An's Portfolio API Document",
    description: 'API Example',
  },
  servers: [
    {
      url: 'https://swagger-demo-ts.herokuapp.com',
      description: 'Local server',
    },
  ],
  tags: [
    {
      name: 'Users',
    },
  ],
  paths: {
    '/api/auth/login': {
      post: login,
    },
  },
  components: {
    schemas: {
      loginUserBody,
    },
  },
};

export default apiDoc;
