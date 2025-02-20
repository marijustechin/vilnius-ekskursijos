import { useEffect, useState } from 'react';
import { selectUser } from '../store/features/user/authSlice';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router';
import HelperService from '../services/HelperService';
import UserService from '../services/UserService';
import { IUserData } from '../types/user';
import avatar from '/avatar.jpg';

export const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<IUserData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user.id && !user.role) {
      navigate('/prisijungimas');
    } else if (user.id) {
      getUserData(user?.id);
    }
  }, [user.id, user.role, navigate]);

  const getUserData = async (user_id: string) => {
    setIsLoading(true);
    try {
      const response = await UserService.getUserById(user_id);
      setUserData(response.data);
    } catch (e: unknown) {
      setError(HelperService.errorToString(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Naudotojo profilis</h1>
      {isLoading && <p>Informacija įekliama...</p>}
      {error && <h3>{error}</h3>}
      {userData && (
        <div>
          <div className="flex gap2 items-center justify-center">
            <img className="w-10 rounded-full" src={avatar} alt="avatar" />
            <p className="text-lg font-semibold">{userData.first_name}</p>
          </div>
        </div>
      )}
    </div>
  );
};
