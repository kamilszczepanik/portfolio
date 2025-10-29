export type Person = {
  id: number;
  name: string;
  designation: string;
  description: string | React.ReactNode;
  image: string;
  link: string;
};

export type Company = {
  name: string;
  image: string;
  link: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};
