import { model, models, Schema } from "mongoose";

export interface IApplication {
  applicationId: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  jobDescription: string;
  jobType: string;
  applicationDate: Date;
  applicationStatus: string;
  applicationLink: string;
  applicationNotes: string;
  jobReferenceNumber: string;
  applicationDeadline: Date;
  resume: string;
  coverLetter: string;
  referral: boolean;
  referralSource: string;
  referralContact: string;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    applicationId: { type: String, required: true },
    userId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobLocation: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobType: { type: String, required: true },
    applicationDate: { type: Date, required: true },
    applicationStatus: { type: String, required: true },
    applicationLink: { type: String, required: true },
    applicationNotes: { type: String, required: true },
    jobReferenceNumber: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String, required: true },
    referral: { type: Boolean, required: true },
    referralSource: { type: String, required: true },
    referralContact: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);
const Application =
  models.Application || model("Application", ApplicationSchema);
export default Application;