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
  datetime: z
    .string({ required_error: "必填項目" })
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/g),
  beforeBreakfast: z
    .number()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
  afterBreakfast: z
    .number()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
  beforeLunch: z
    .number()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
  afterLunch: z
    .number()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
  beforeDinner: z
    .number()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
  afterDinner: z
    .number()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
  beforeSleep: z
    .number()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
  remarks: z
    .string()
    .min(1, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .max(30, { message: "血糖數值有效範圍: 1.0mmol/L至30.0mmol/L" })
    .optional(),
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
        datetime: dayjs(bloodSugar.datetime).format("YYYY-MM-DDTHH:mm"),
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
      datetime: dayjs(values.datetime).toISOString(),
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
              id: bloodSugar.id,
              ...data,
            }),
          }
        );
        toast.success("成功編輯");
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/bloodSugars`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        toast.success("血糖紀錄新增!");
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
            {(
              [
                { field: "beforeBreakfast", label: "早餐前", alertValue: 7 },
                { field: "afterBreakfast", label: "早餐後", alertValue: 10 },
                { field: "beforeLunch", label: "午餐前", alertValue: Infinity },
                { field: "afterLunch", label: "午餐後", alertValue: 10 },
                {
                  field: "beforeDinner",
                  label: "晚餐前",
                  alertValue: Infinity,
                },
                { field: "afterDinner", label: "晚餐後", alertValue: 10 },
                { field: "beforeSleep", label: "睡覺前", alertValue: Infinity },
              ] as const
            ).map(({ field, label, alertValue }) => (
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
                          className={
                            (field?.value ?? 0) >= alertValue
                              ? "text-destructive"
                              : ""
                          }
                          {...form.register(field.name, {
                            setValueAs: (v) =>
                              v === "" ? undefined : parseInt(v, 10),
                          })}
                          onChange={(event) => {
                            field.onChange(+event.target.value);
                          }}
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
