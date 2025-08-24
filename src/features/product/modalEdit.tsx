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
import { getProduct, updateProduct } from "@/store/product/async";
import type { IProducts } from "@/type/IProducts";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface ModalEditProps {
  product: IProducts | null;
  trigger?: React.ReactNode;
}

export function ModalEdit({ product, trigger }: ModalEditProps) {
  if (!product) return null;

  const dispatch = useAppDispatch();
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || 0);

  useEffect(() => {
    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price || 0);
  }, [product]);

  const { loading } = useAppSelector((state) => state.product);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      price,
    };

    try {
      const result = await dispatch(
        updateProduct({ id: product.id, data: payload })
      );

      if (updateProduct.fulfilled.match(result)) {
        toast.success("Company updated successfully!", {
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
      const errorMessage =
        (error as { error?: string })?.error ?? "Update failed";
      toast.error(errorMessage, {
        duration: 3000,
        icon: "🚨",
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
            Edit
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-[#FFFDF6] text-black border border-black rounded-lg font-mono shadow-[8px_8px_0px_#222222]">
        <DialogHeader>
          <DialogTitle className="text-lg">Update Products</DialogTitle>
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
                value={name}
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
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="grid gap-3 mt-4">
              <Label>Description</Label>
              <Input
                type="text"
                value={description}
                placeholder="Kaos berbahan katun premium"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogClose asChild>
            <Button type="submit" className="mt-4" variant={"blue"}>
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
