import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  return (
    <header className="w-full bg-slate-300">
      <div className="w-container flex gap-3 items-center justify-between">
        <Logo />
        <MainNav />
        <UserMenu />
      </div>
    </header>
  );
};
