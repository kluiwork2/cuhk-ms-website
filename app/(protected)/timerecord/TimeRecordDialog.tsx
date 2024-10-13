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
import { TimeRecordDTO as TimeRecord } from "@/app/api/timeRecords/dto";

const formSchema = z.object({
  datetime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/g),
  location: z.string().optional(),
  activityType: z.string(),
  durationInMin: z.number().min(1),
});

interface Props {
  onSuccess: () => void;
  timeRecord?: TimeRecord;
}
export const TimeRecordDialog: React.FC<Props> = ({
  onSuccess,
  timeRecord,
}) => {
  const isEditing = !!timeRecord;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: dayjs().format("YYYY-MM-DDTHH:mm"),
      ...(timeRecord && {
        datetime: dayjs(timeRecord.datetime).format("YYYY-MM-DDTHH:mm"),
        location: timeRecord.location ?? undefined,
        activityType: timeRecord.activityType,
        durationInMin: timeRecord.durationInMin,
      }),
    },
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const data = {
      datetime: new Date(values.datetime).toISOString(),
    };

    try {
      if (timeRecord) {
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/timeRecords/${timeRecord.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              ...data,
            }),
          }
        );
        toast.success("成功編輯");
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/timeRecords`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            ...data,
          }),
        });
        toast.success("運動紀錄新增成功!");
      }
      setOpen(false);
      onSuccess();
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
        <Button variant="outline">{isEditing ? "編輯" : "新增運動紀錄"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "編輯運動紀錄" : "新增運動紀錄"}
          </DialogTitle>
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
                      <Input
                        type="datetime-local"
                        max={dayjs().format("YYYY-MM-DDT23:59")}
                        {...field}
                      />
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
              name="durationInMin"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>分鐘</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(event) => {
                          if (Number.isNaN(+event.target.value)) {
                            event.preventDefault();
                            return;
                          }
                          field.onChange(+event.target.value);
                        }}
                      />
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
