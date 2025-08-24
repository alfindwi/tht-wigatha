import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store";
import { Label } from "@/components/ui/label"; // jangan pakai dari radix, lebih konsisten
import { useState } from "react";
import { updateProfileAsync } from "@/store/auth/async"; // misal bikin async thunk
import { toast } from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

export function Settings() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await dispatch(updateProfileAsync({ name }));
    setLoading(false);

    if (updateProfileAsync.fulfilled.match(res)) {
      toast.success("Profile updated successfully!", {
        duration: 3000,
        icon: "🚀",
        style: {
          background: "#3A7D44",
          color: "#FCFAEE",
          fontWeight: "600",
          borderRadius: "6px",
          boxShadow: "5px 5px 0px #222222",
          fontFamily: "monospace",
        },
      });
    } else {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div
      className="py-4 flex mt-5 px-4 max-w-sm shadow-[8px_8px_0px_#222222] 
    rounded-md mx-auto border border-black bg-[#ffbdc4] hover:shadow-[6px_6px_0px_#222222] transition"
    >
      <div className="flex flex-col w-full font-mono gap-4">
        <div>
          <h1 className="font-semibold text-lg">Settings</h1>
          <p className="text-sm text-gray-700">Change your settings here.</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="username" className="text-sm font-semibold">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#f2f7f5] border-black text-black font-mono placeholder:text-gray-500 placeholder:text-sm shadow-[4px_4px_0px_#222222]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email
          </Label>
          <Input
            id="email"
            type="text"
            value={user?.email || ""}
            readOnly
            className="bg-gray-200 border-black text-gray-700 font-mono placeholder:text-gray-500 placeholder:text-sm shadow-[4px_4px_0px_#222222] cursor-not-allowed"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="border shadow-[4px_4px_0px_#222222] w-40 bg-[#faae2b] border-black hover:bg-[#faae2b] cursor-pointer text-black font-mono"
          >
            {loading ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
