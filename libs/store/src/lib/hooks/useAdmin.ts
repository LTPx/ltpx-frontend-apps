import { useAppStore } from "../store";

export const useAdmin = () => {
  const {
    applications,
    pendingApplications,
    getStoreApplication,
    currentApplication,
  } = useAppStore();

  return {
    applications,
    pendingApplications,
    getStoreApplication,
    currentApplication,
  }
}
