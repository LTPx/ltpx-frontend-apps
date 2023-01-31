import { useAppStore } from "../store";

export const useAdmin = () => {
  const {
    applications,
    getStoreApplication,
    currentApplication,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
  } = useAppStore();

  return {
    applications,
    getStoreApplication,
    currentApplication,
    _pendingApplications,
    _getApplication,
    _approveApplication,
    _approvedApplications,
  }
}
