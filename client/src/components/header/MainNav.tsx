import { Link } from "react-router";
import { useAppSelector } from "../../store/store";
import { selectUser } from "../../store/features/user/authSlice";

export const MainNav = () => {
  const { role } = useAppSelector(selectUser);

  return (
    <nav className="flex gap-3 items-center uppercase">
      <Link to={"/profilis"}>Profilis</Link>
      {role === "ADMIN" && <Link to={"/suvestine"}>Admin</Link>}
    </nav>
  );
};
