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
import { BloodPressureDTO as BloodPressure } from "@/app/api/bloodPressures/dto";

const formSchema = z
  .object({
    datetime: z
      .string({ required_error: "必填項目" })
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/g),
    sbp: z
      .number({ required_error: "必填項目" })
      .min(0, { message: "血壓有效範圍：0-200mmHg" })
      .max(200, { message: "血壓有效範圍：0-200mmHg" }),
    dbp: z
      .number({ required_error: "必填項目" })
      .min(0, { message: "血壓有效範圍：0-200mmHg" })
      .max(200, { message: "血壓有效範圍：0-200mmHg" }),
    pulse: z
      .number({ required_error: "必填項目" })
      .min(20, { message: "脈搏有效範圍：20-200次/分鐘" })
      .max(200, { message: "脈搏有效範圍：20-200次/分鐘" }),
  })
  .refine((data) => data.sbp > data.dbp, {
    message: "下壓需要低於上壓",
    path: ["formError"],
  });

interface Props {
  onSuccess: () => void;
  bloodPressure?: BloodPressure;
}
export const BloodPressureDialog: React.FC<Props> = ({
  onSuccess,
  bloodPressure,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: dayjs().format("YYYY-MM-DDTHH:mm"),
      ...(bloodPressure && {
        datetime: dayjs(bloodPressure.datetime).format("YYYY-MM-DDTHH:mm"),
        sbp: bloodPressure.sbp ?? 20,
        dbp: bloodPressure.dbp ?? 20,
        pulse: bloodPressure.pulse ?? 20,
      }),
    },
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const data = {
        ...values,
        datetime: dayjs(values.datetime).toISOString(),
      };

      if (bloodPressure) {
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/bloodPressures/${bloodPressure.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: bloodPressure.id,
              ...data,
            }),
          }
        );
        toast.success("成功編輯");
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/bloodPressures`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        toast.success("血壓紀錄新增!");
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
          {bloodPressure ? "編輯" : "新增血壓紀錄"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {bloodPressure ? "編輯血壓紀錄" : "新增血壓紀錄"}
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
                { field: "sbp", label: "上壓(mmHg)", alertValue: 140 },
                { field: "dbp", label: "下壓(mmHg)", alertValue: 90 },
                {
                  field: "pulse",
                  label: "脈搏(次/分鐘)",
                  alertValue: Infinity,
                },
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
                          type="number"
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
            {Object.values(form.formState.errors)
              .filter(({ type }) => type === "custom")
              .map((error) => (
                <span
                  className="text-[0.8rem] font-medium text-destructive"
                  key={error.message}
                >
                  {error.message}
                </span>
              ))}
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
