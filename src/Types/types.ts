// classModel.ts

export interface ILecture {
  title: string;
  content?: string; // Could be text
  url?: string; //URL for videos etc.
}

export interface ISession {
  title: string;
  lectures: ILecture[];
}

export interface IUnit {
  title: string;
  sessions: ISession[];
}

// const lectureSchema = new Schema<ILecture>({
//   title: { type: String, required: true },
//   content: { type: String, required: true }, // Content of the lecture (could be a URL for video)
// });

// const sessionSchema = new Schema<ISession>({
//   title: { type: String, required: true },
//   lectures: [lectureSchema], // Each session contains multiple lectures
// });

// const unitSchema = new Schema<IUnit>({
//   title: { type: String, required: true },
//   sessions: [sessionSchema], // Each unit contains multiple sessions
// });

// const classSchema = new Schema<IClass>({
//   title: { type: String, required: true },
//   description: { type: String },
//   instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   units: [unitSchema], // A class contains multiple units
// });

// export const Class = mongoose.model<IClass>("Class", classSchema);
