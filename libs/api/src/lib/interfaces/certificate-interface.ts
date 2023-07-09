export interface CertificateModel {
  id: number;
  created_at: string;
  updated_at: string;
  teacher: {
    name: string;
    slug: string;
  }
  course: {
    id: number;
    name: string;
    cover_url: string;
    total_quizzes: number;
    total_tasks: number;
    total_achievements: number;
  }
  student: {
    name: string;
    email: string;
    country: string;
    city: string;
    join_at: string;
  }
  achievements: {
    title: string;
    created_at: string;
    points: number;
    image: string;
  }[]
  quizzes: {
    title: string;
    created_at: string;
    score: number;
  }[]
  tasks: {
    title: string;
    created_at: string;
    score: number;
  }[]
}
