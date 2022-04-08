import bcrypt from 'bcrypt';
import { model, Schema, Model, Document } from 'mongoose';
import MongooseService from '../providers/Database';

import { IUser } from '../interfaces/models/User';

export interface IUserModel extends IUser, Document {
  comparePassword(password: string, cb: any): string;
  validPassword(password: string, cb: any): string;
}

export const UserSchema = new Schema<IUserModel>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    tokens: Array,

    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.tokens;
      },
    },
  }
);

// Password hash middleware
UserSchema.pre('save', function (this: IUserModel, _next: any) {
  if (!this.isModified('password')) {
    return _next();
  }

  bcrypt.genSalt(10, (_err, _salt) => {
    if (_err) {
      return _next(_err);
    }

    bcrypt.hash(this.password, _salt, (_error, _hash) => {
      if (_error) {
        return _next(_error);
      }

      this.password = _hash;
      return _next();
    });
  });
});

// Custom Methods
// Compares the user's password with the request password
UserSchema.methods.comparePassword = function (
  _requestPassword: string,
  _cb: any
) {
  bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
    return _cb(_err, _isMatch);
  });
};

const User = model<IUserModel>('user', UserSchema);

export default User;
