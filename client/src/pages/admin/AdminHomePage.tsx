import { useNavigate } from "react-router";
import { selectUser } from "../../store/features/user/authSlice";
import { useAppSelector } from "../../store/store";
import { useEffect } from "react";

export const AdminHomePage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "ADMIN") {
      if (user.role === "USER") {
        navigate("/profilis");
      } else {
        navigate("/");
      }
    }
  }, [user.role, navigate]);
  return <div>AdminHomePage</div>;
};
