import { useNavigate } from "react-router";
import { logoutUser, selectUser } from "../../store/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div>
      {user.role ? (
        <button
          onClick={() => dispatch(logoutUser())}
          className="flex gap-2 items-center justify-center py-1 px-2 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-200"
        >
          <MdLogout size={20} />
          <span>Atsijungti</span>
        </button>
      ) : (
        <button
          onClick={() => navigate("/prisijungimas")}
          className="flex gap-2 items-center justify-center py-1 px-2 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-200"
        >
          <FaRegUser size={20} />
          <span>Prisijungti</span>
        </button>
      )}
    </div>
  );
};
