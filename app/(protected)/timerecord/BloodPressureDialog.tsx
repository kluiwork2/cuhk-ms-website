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

const formSchema = z.object({
  datetime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/g),
  sbp: z.number().min(0),
  dbp: z.number().min(0),
  pulse: z.number().min(0),
});

interface Props {
  onSuccess: () => void;
  bloodPressure?: BloodPressure;
}
export const BloodPressureDialog: React.FC<Props> = ({ onSuccess, bloodPressure }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: dayjs(bloodPressure?.datetime).format("YYYY-MM-DDTHH:mm"),
      ...(bloodPressure && {
        sbp: bloodPressure.sbp ?? 20,
        dbp: bloodPressure.dbp ?? 20,
        pulse: bloodPressure.pulse ?? 20,
      })
    },
  });

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      if (bloodPressure) {
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/bloodPressures/${bloodPressure.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              id: bloodPressure.id,
              sbp: values.sbp,
              dbp: values.dbp,
              pulse: values.pulse,
              datetime: new Date(values.datetime).toISOString(),
            }),
          }
        );
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/bloodPressures`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            sbp: Number(values.sbp),
            dbp: Number(values.dbp),
            pulse: Number(values.pulse),
            datetime: new Date(values.datetime).toISOString(),
          }),
        });
      }
      setOpen(false);
      onSuccess();
      toast.success("血壓紀錄新增!");
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
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {(
              [
                { field: "sbp", label: "上壓(mmhg)" },
                { field: "dbp", label: "下壓(mmhg)" },
                { field: "pulse", label: "脈搏(mmhg)" },
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
