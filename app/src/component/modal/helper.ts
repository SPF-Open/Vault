export type Type = "MCQ" | "OQ";
export type Sheet = { name: string; selected: boolean };
export type Template = "BOSA" | "FIN" | "OTHER";
export type Columns = {
  competence: string;
  dimension: string;
  indicator: string;
  question: string;
  answer: string;
};

export type Rows = {
  offset: number;
};


export const defaultColumns = new Map<Template, { OQ: Columns; MCQ: Columns }>([
  [
    "BOSA",
    {
      OQ: {
        competence: "C",
        dimension: "D",
        indicator: "E",
        question: "H",
        answer: "I",
      },
      MCQ: {
        competence: "C",
        dimension: "D",
        indicator: "E",
        question: "H",
        answer: "I",
      },
    },
  ],
  [
    "FIN",
    {
      OQ: {
        competence: "A",
        dimension: "B",
        indicator: "C",
        question: "F",
        answer: "G",
      },
      MCQ: {
        competence: "A",
        dimension: "B",
        indicator: "C",
        question: "F",
        answer: "G",
      },
    },
  ],
]);
export const defaultRows = new Map<Template, { OQ: Rows; MCQ: Rows }>([
  ["BOSA", { OQ: { offset: 1 }, MCQ: { offset: 16 } }],
  ["FIN", { OQ: { offset: 1 }, MCQ: { offset: 7 } }],
]);