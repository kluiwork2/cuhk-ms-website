"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { ACTIVITIES_TYPE_OPTIONS } from "@/constants/monthlyscheduler";

const formSchema = z.object({
  datetime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/g),
  name: z.string(),
  details: z.string(),
  location: z.string().optional(),
  activityType: z.string(),
  endAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/g),
  sbp: z.string().min(0).max(300),
  dbp: z.string().min(0).max(300),
  pulse: z.string().min(0).max(300),
});

interface Props {
  onTimeRecordCreated: () => void;
}
export const CreateTimeRecord: React.FC<Props> = ({ onTimeRecordCreated }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: dayjs().format("YYYY-MM-DDTHH:mm"),
      endAt: dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
      sbp: String(80),
      dbp: String(80),
      pulse: String(80),
    },
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/timeRecords`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          datetime: new Date(values.datetime).toISOString(),
          endAt: new Date(values.endAt).toISOString(),
          sbp: Number(values.sbp),
          dbp: Number(values.dbp),
          pulse: Number(values.pulse),
        }),
      });
      setOpen(false);
      onTimeRecordCreated();
      toast.success("Event Created!");
      form.reset();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">新增</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>新增活動</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="max-w-md w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>日期時間</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>完成時間</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>活動名稱</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>詳情</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>地點</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="activityType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>類型</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACTIVITIES_TYPE_OPTIONS.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="sbp"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>上壓(mmhg)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="dbp"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>下壓(mmhg)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="pulse"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>脈搏(mmhg)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <DialogFooter>
              <Button type="submit">
                {isSubmitting ? "提交中..." : "提交"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};