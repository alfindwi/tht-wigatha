import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store";
import { createProduct, getProduct } from "@/store/product/async";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ModalCreateProduct({ trigger }: { trigger?: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const { loading } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      id: 0,
      name,
      description,
      price,
    };

    try {
      const data = await dispatch(createProduct(payload));
      if (createProduct.fulfilled.match(data)) {
        toast.success("Product created successfully!", {
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
        await dispatch(getProduct());
      }
    } catch (error) {
      const errorMessage = (error as { error?: string })?.error ?? "";
      toast.error(errorMessage, {
        duration: 3000,
        icon: "🚀",
        style: {
          background: "#B8001F",
          color: "#FCFAEE",
          fontWeight: "600",
          borderRadius: "6px",
          boxShadow: "5px 5px 0px #222222",
          fontFamily: "monospace",
        },
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="text-sm px-3 py-1">
            Create
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-[#FFFDF6] text-black border border-black rounded-lg font-mono shadow-[8px_8px_0px_#222222]">
        <DialogHeader>
          <DialogTitle className="text-lg">Create Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2 mt-4">
            <div className="grid gap-3">
              <Label>
                Products<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Product A"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-3 mt-4">
              <Label>
                Price<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="1000"
                required
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="grid gap-3 mt-4">
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Kaos berbahan katun premium"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogClose asChild>
            <Button type="submit" disabled={loading} className="mt-4" variant={"blue"}>
              {loading ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
