"use client";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
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
import { formSchema, FormType } from "@/lib/zodSchema";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/modals/AlertModal";
import ApiAlert from "@/components/ApiAlert";
import { useOrigin } from "@/hooks/use-origin";

export default function SettingsForm({ initialData }: { initialData: Store }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormType) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated");
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
        <Heading title="Settings" description="Manage store preference" />
        {/* Dynamic part */}
        <Button
          variant="destructive"
          size="icon"
          disabled={loading}
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
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
            Save changes
          </Button>
        </form>
      </Form>
      {/* Alert API */}
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
