import { useAppStore } from "../store";

export const useAdmin = () => {
  const {
    applications,
    pendingApplications,
  } = useAppStore();

  return {
    applications,
    pendingApplications,
  }
}
