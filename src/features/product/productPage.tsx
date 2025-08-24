import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModalCreateProduct } from "./modalCreate";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { getProduct } from "@/store/product/async";
import { ModalView } from "./modalView";
import { Pencil, Trash, View } from "lucide-react";
import { ModalEdit } from "./modalEdit";
import { ModalDelete } from "./modalDelete";

export function ProductPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="w-full mt-10 max-w-6xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Products</h2>

        <ModalCreateProduct
          trigger={
            <Button
              variant="blue"
              className="w-24 md:w-25 text-sm py-2 px-4 shadow-[6px_6px_0px_#222222] active:shadow-[4px_4px_0px_#222222] transition-all duration-150"
            >
              Create
            </Button>
          }
        />
      </div>

      <div className="rounded-lg shadow-[8px_8px_0px_#222222] border border-black overflow-x-auto">
        <Table className="bg-[#f2f7f5] text-black font-mono w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] hidden md:table-cell">#</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[250px] hidden sm:table-cell">
                Description
              </TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product, index) => (
              <TableRow>
                <TableCell className="hidden md:table-cell">
                  {index + 1}
                </TableCell>
                <TableCell className="max-w-[150px] truncate">
                  {product.name}
                </TableCell>
                <TableCell className="max-w-[200px] truncate hidden sm:table-cell">
                  {product.price}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {product.description}
                </TableCell>
                <TableCell className="flex gap-2">
                  <ModalView
                    product={product}
                    trigger={
                      <button className="bg-[#f2f7f5] border cursor-pointer border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm">
                        <View className="w-4 h-4" />
                      </button>
                    }
                  />
                  <ModalEdit
                    product={product}
                    trigger={
                      <button className="bg-[#f2f7f5] border cursor-pointer border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm">
                        <Pencil className="w-4 h-4" />
                      </button>
                    }
                  />
                  <ModalDelete
                    product={product}
                    trigger={
                      <button className="bg-[#f2f7f5] border cursor-pointer border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm">
                        <Trash className="w-4 h-4" />
                      </button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
