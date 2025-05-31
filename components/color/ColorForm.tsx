"use client";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/Separator";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/AlertModal";


const colorSchema = z.object({
  name: z.string().min(1, "Required"),
  value: z.string().min(4).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});
type ColorType = z.infer<typeof colorSchema>;

export default function ColorForm({
  initialData,
}: {
  initialData: Color | null;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<ColorType>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit the color" : "Add a new color";
  const toastMessage = initialData ? "color updated" : "color create";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: ColorType) => {
    try {
      setLoading(true);
      // if there is color, update it
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        // if there is not, create a new color
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("color deleted");
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all products using this color first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        {/* Static part */}
        <Heading title={title} description={description} />
        {/* Dynamic part */}
        {initialData && (
          <Button
            variant="destructive"
            color="icon"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      {/* form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      {/* Alert API */}
      <Separator />
    </>
  );
}
