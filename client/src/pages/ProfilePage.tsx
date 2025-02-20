import { useEffect } from "react";
import { selectUser } from "../store/features/user/authSlice";
import { useAppSelector } from "../store/store";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id && !user.role) {
      navigate("/prisijungimas");
    }
  }, [user.id, user.role, navigate]);

  return <div>ProfilePage</div>;
};
