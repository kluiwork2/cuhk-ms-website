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
import { BloodSugarDTO as BloodSugar } from "@/app/api/bloodSugars/dto";

const formSchema = z.object({
  datetime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/g),
  beforeBreakfast: z.number().optional(),
  afterBreakfast: z.number().optional(),
  beforeLunch: z.number().optional(),
  afterLunch: z.number().optional(),
  beforeDinner: z.number().optional(),
  afterDinner: z.number().optional(),
  beforeSleep: z.number().optional(),
  remarks: z.string().optional(),
});

interface Props {
  onSuccess: () => void;
  bloodSugar?: BloodSugar;
}
export const BloodSugarDialog: React.FC<Props> = ({
  onSuccess,
  bloodSugar,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: dayjs().format("YYYY-MM-DDTHH:mm"),
      ...(bloodSugar && {
        beforeBreakfast: bloodSugar.beforeBreakfast ?? undefined,
        afterBreakfast: bloodSugar.afterBreakfast ?? undefined,
        beforeLunch: bloodSugar.beforeLunch ?? undefined,
        afterLunch: bloodSugar.afterLunch ?? undefined,
        beforeDinner: bloodSugar.beforeDinner ?? undefined,
        afterDinner: bloodSugar.afterDinner ?? undefined,
        beforeSleep: bloodSugar.beforeSleep ?? undefined,
        remarks: bloodSugar.remarks ?? "",
      }),
    },
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const data = {
      ...(values.beforeBreakfast && {
        beforeBreakfast: values.beforeBreakfast,
      }),
      ...(values.afterBreakfast && {
        afterBreakfast: values.afterBreakfast,
      }),
      ...(values.beforeLunch && {
        beforeLunch: values.beforeLunch,
      }),
      ...(values.afterLunch && { afterLunch: values.afterLunch }),
      ...(values.beforeDinner && {
        beforeDinner: values.beforeDinner,
      }),
      ...(values.afterDinner && {
        afterDinner: values.afterDinner,
      }),
      ...(values.beforeSleep && {
        beforeSleep: values.beforeSleep,
      }),
      datetime: new Date(values.datetime).toISOString(),
    };

    try {
      if (bloodSugar) {
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/bloodSugars/${bloodSugar.id}`,
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
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/bloodSugars`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            ...data,
          }),
        });
      }
      setOpen(false);
      onSuccess();
      toast.success("血糖紀錄新增!");
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
        <Button variant="outline">
          {bloodSugar ? "編輯" : "新增血糖紀錄"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {bloodSugar ? "編輯血糖紀錄" : "新增血糖紀錄"}
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
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {(
              [
                { field: "beforeBreakfast", label: "早餐前" },
                { field: "afterBreakfast", label: "早餐後" },
                { field: "beforeLunch", label: "午餐前" },
                { field: "afterLunch", label: "午餐後" },
                { field: "beforeDinner", label: "晚餐前" },
                { field: "afterDinner", label: "晚餐後" },
                { field: "beforeSleep", label: "睡覺前" },
              ] as const
            ).map(({ field, label }) => (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="mmol/L"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value ?? 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>備註</FormLabel>
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
