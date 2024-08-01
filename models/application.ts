import { model, models, Schema } from "mongoose";
export interface IApplication {
  userId: Object;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  jobDescription: string;
  jobType: string;
  applicationDate: Date;
  applicationStatus: string;
  applicationLink?: string;
  applicationNotes?: string;
  jobReferenceNumber?: string;
  applicationDeadline?: Date;
  resume?: string;
  coverLetter?: string;
  referral: boolean;
  referralSource?: string;
  referralContact?: string;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobLocation: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobType: { type: String, required: true },
    applicationDate: { type: Date, required: true },
    applicationStatus: { type: String, required: true },
    applicationLink: { type: String, required: false },
    applicationNotes: { type: String, required: false },
    jobReferenceNumber: { type: String, required: false },
    applicationDeadline: { type: Date, required: false },
    resume: { type: String, required: false },
    coverLetter: { type: String, required: false },
    referral: { type: Boolean, required: true },
    referralSource: { type: String, required: false },
    referralContact: { type: String, required: false },
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
