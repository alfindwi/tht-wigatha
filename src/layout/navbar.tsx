import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store";
import { LOGOUT } from "@/store/auth/slice";
import { DoorOpen, Menu, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export function Navbar() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(LOGOUT());
    Cookies.remove("token");
  };
  return (
    <nav className="bg-[#f4fafa] border-b border-black shadow-[4px_4px_0px_#222] font-mono z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold text-black">
          THT - Wigatha
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="rounded-full size-10 cursor-pointer">
                <AvatarImage
                  src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg "
                  alt="User"
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#faae2b] border border-black/20 rounded-xl w-52 px-2 py-2 shadow-[6px_6px_0px_#222] font-mono"
            >
              <DropdownMenuItem asChild>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 text-sm text-black w-full px-3 py-2 rounded-md transition hover:bg-black/10"
                >
                  <Settings className="w-4 h-4 opacity-80" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button onClick={handleLogout} className="flex justify-start items-center bg-transparent text-left text-sm cursor-pointer font-mono text-black w-full px-3 py-2 rounded-lg transition hover:bg-black/10">
                  <DoorOpen />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          // onClick={() => setOpen(!open)}
          className="md:hidden p-2 border border-black rounded shadow-[2px_2px_0px_#222] bg-white"
        >
          <Menu className="w-5 h-5 text-black" />
        </button>
      </div>
    </nav>
  );
}
