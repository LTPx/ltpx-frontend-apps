export interface Certificate {
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
}
