import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IProducts } from "@/type/IProducts";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as React from "react";

interface ModalViewProps {
  product: IProducts | null;
  trigger?: React.ReactNode;
}

export function ModalView({ product, trigger }: ModalViewProps) {
  if (!product) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="text-sm px-3 py-1">
            View
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-[#FFFDF6] text-black border border-black rounded-lg font-mono shadow-[8px_8px_0px_#222222]">
        <DialogHeader>
          <DialogTitle className="text-lg">Products Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <p>
            <span className="font-semibold">Name:</span> {product.name}
          </p>
          <p>
            <span className="font-semibold">Price:</span> {product.price}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {product.description}
          </p>
        </div>

        <DialogClose asChild>
          <Button variant="blue">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
