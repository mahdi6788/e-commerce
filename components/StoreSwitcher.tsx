"use client";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/Command";

type PopoverTriggerProps = 
React.ComponentPropsWithoutRef< typeof PopoverTrigger >;

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
}

export default function StoreSwitcher({
  className,
  stores = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const currentStore = stores.find((store) => store.id === params.storeId);

  const onStoreSelect = (store: { name: string; id: string }) => {
    setOpen(false);
    router.push(`${store.id}`);
  };

  const handleAddNewStore = () => {
    setOpen(false);
    storeModal.onOpen();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.name}
                  <Check
                    className={
                      cn("ml-auto h-4 w-4", currentStore?.id === store.id)
                        ? "opacity-100"
                        : "opacity-0"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandGroup>
            <CommandItem onSelect={handleAddNewStore}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
