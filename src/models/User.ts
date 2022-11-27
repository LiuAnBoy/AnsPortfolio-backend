import bcrypt from 'bcrypt';
import { model, Schema, Document } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';

import { IUser } from '../interfaces/models/User';

export interface IUserModel extends IUser, Document {
  comparePassword(
    password: string,
    cb: (err: Error | undefined, isMatch: boolean) => void
  ): string;
  genAuthToken(secret: string): string;
}

export const UserSchema = new Schema<IUserModel>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tokens: [{ token: { type: String, required: true } }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.tokens;
        delete ret.createdAt;
      },
    },
  }
);

// Password hash middleware
UserSchema.pre('save', function (this: IUserModel, _next) {
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
  _cb: (_err: Error | undefined, _isMatch: boolean) => void
) {
  bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
    return _cb(_err, _isMatch);
  });
};

UserSchema.methods.genAuthToken = async function (secret: string) {
  const token = jsonwebtoken.sign({ _id: this._id.toString() }, secret);

  this.tokens = this.tokens.concat({ token });

  await this.save();

  return token;
};

const User = model<IUserModel>('user', UserSchema);

export default User;
