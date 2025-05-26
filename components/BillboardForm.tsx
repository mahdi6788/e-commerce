"use client";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/Separator";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/AlertModal";
import { z } from "zod";
import ImageUpload from "./ImageUpload";

const billboardSchema = z.object({
  label: z.string().min(1, "Required"),
  imageUrl: z.string().min(1, "Required"),
});
type BillboardType = z.infer<typeof billboardSchema>;

export default function BillboardForm({
  initialData,
}: {
  initialData: Billboard | null;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<BillboardType>({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialData || { label: "", imageUrl: "" },
  });

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData
    ? "Edit the billboard"
    : "Add a new billboard";
  const toastMessage = initialData ? "Billboard updated" : "Billboard create";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: BillboardType) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success(`${toastMessage}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all products and categories first.");
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
            size="icon"
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value ? [field.value] : []}
                  disabled={loading}
                  onChange={url => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
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
