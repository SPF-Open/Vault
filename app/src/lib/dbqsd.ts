interface DB {
  Assessment: {
    id: number;
    title: string;
    status: string;
    date: string;
    time: string;
  }[],
  Competency: {
    id: number;
    assessmentId: number

    title: string;
  }[],
  Dimension: {
    id: number;
    assessmentId: number
    competencyId: number;    

    title: string;
  }[],
  Indicator: {
    id: number;
    assessmentId: number
    competencyId: number;
    dimensionId: number;

    title: string;
  }[],
  Question: {
    id: number;
    assessmentId: number
    competencyId: number;
    dimensionId: number;
    indicatorId: number;

    title: string;
    prompt: string;
    type: "OQ" | "MCQ";
  }[],
  Response: {
    id: number;
    questionId: number;

    value: string;
    correct: boolean;
  }[],
}