import { model, Schema } from 'mongoose';

const contentSchema = new Schema(
  {
    ua: {
      type: {
        title: {
          type: String,
          required: true,
        },
        navigation: {
          type: {
            home: String,
            courses: String,
            admin: String,
          },
          required: true,
        },
        authNav: {
          type: {
            login: String,
            registration: String,
            forgotPassword: String,
            authTextLogin: String,
            authTextRegistration: String,
          },
        },
        footer: {
          type: {
            allRights: String,
          },
        },
      },
      required: true,
    },
    en: {
      type: {
        title: {
          type: String,
          required: true,
        },
        navigation: {
          type: {
            home: String,
            courses: String,
            admin: String,
          },
          required: true,
        },
        authNav: {
          type: {
            login: String,
            registration: String,
            forgotPassword: String,
            authTextLogin: String,
            authTextRegistration: String,
          },
        },
        footer: {
          type: {
            allRights: String,
          },
        },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ContentCollection = model('content', contentSchema);
