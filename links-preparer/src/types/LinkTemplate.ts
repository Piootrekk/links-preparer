export type LinkTemplate = {
  maskName: string;
  content: string;
};

export type PreparedLinks = {
  id: string;
  link: string;
  inputValues: string[];
  areaValues: string[];
};
