import { useCallback, useEffect, useState } from "react";
import { fetchUserById } from "../services/userService";

const useUserDetails = (userId, initialUser) => {
  const [user, setUser] = useState(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    if (!userId) {
      setError("User not found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedUser = await fetchUserById(userId);
      if (!fetchedUser) {
        setError("User not found");
        setUser(null);
      } else {
        setUser(fetchedUser);
      }
    } catch (loadError) {
      console.error("Failed to load user details", loadError);
      setError(
        loadError.response?.data?.message ||
          loadError.message ||
          "Failed to load user details"
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!initialUser) {
      loadUser();
    }
  }, [initialUser, loadUser]);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  return {
    user,
    loading,
    error,
    refresh: loadUser,
  };
};

export default useUserDetails;
