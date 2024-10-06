import db from './db';

export type TrainingType = {
  id: number;
  title: string;
  description: string;
  image: string;
};
const getTrainings = (): TrainingType[] => {
  const stmt = db.prepare('SELECT * FROM trainings');
  return stmt.all() as unknown as TrainingType[];
};

export default getTrainings;
