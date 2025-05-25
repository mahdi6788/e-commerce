import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/modals/Modal";
import { formSchema, FormType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function StoreModal() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);

  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      if (!response) return null;

      window.location.assign(`/${response.data.id}`)

    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="E-commerce"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="p-6 space-x-2 flex items-center justify-end w-full">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
