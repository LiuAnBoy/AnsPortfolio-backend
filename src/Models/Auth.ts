import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

export interface UserModel extends UserProps, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  profile: {
    avatar: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      line: { type: String, default: '' },
    },
    experience: [
      {
        image: { type: String, default: '' },
        company: { type: String, default: '' },
        title: { type: String, default: '' },
        startAt: { type: Date, default: '' },
        endAt: { type: Date },
        current: { type: Boolean, default: '' },
        description: [{ type: String, default: '' }],
      },
    ],
  },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password as string, salt);

    this.password = hash;
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model<UserModel>('User', userSchema);

export default User;

export interface UserProps {
  name: string;
  email: string;
  password: string;
  profile: ProfileProps;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileProps {
  avatar: string;
  title: string;
  subtitle: string;
  description: string;
  social: SocialProps;
  experience: ExperienceProps[];
}

export interface SocialProps {
  facebook: string;
  instagram: string;
  github: string;
  linkedin: string;
  line: string;
}

export interface ExperienceProps {
  image: string;
  company: string;
  title: string;
  startAt: Date;
  endAt?: Date;
  current: boolean;
  description: string[];
}
