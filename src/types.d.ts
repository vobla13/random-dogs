export type Headers = {
  Authorization?: string;
  "Content-Type"?: string;
  Accept?: string;
};

export type FileToUpload = {
  path: string;
  name: string;
  source: string;
};
