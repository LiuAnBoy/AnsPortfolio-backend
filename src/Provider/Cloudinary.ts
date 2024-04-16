import cloudinary from 'cloudinary';

import Locals from './Locals';

cloudinary.v2.config({
  cloud_name: Locals.config().cloudinaryCloudName,
  api_key: Locals.config().cloudinaryApiKey,
  api_secret: Locals.config().cloudinaryApiSecret,
  secure: true,
});

export default cloudinary;
