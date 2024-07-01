"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/toaster"
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { HOURLY_WAGE, SALARY_DATA } from "@/lib/constant";
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react";


const formSchema = z.object({
  monthlySalary: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Salary must be a positive number",
  }).transform(Number),
  monthlyBonus: z.string().refine((val) => val === '' || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Bonus must be a positive number",
  }).transform((val) => val === '' ? undefined : Number(val)).optional(),
  dailyWorkHours: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 24, {
    message: "Work hours must be between 1 and 24",
  }).transform(Number),
  weeklyWorkDays: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 7, {
    message: "Work days must be between 1 and 7",
  }).transform(Number),
  hourlyRate: z.string().optional(),
});

export default function PersonalInfoForm() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlySalary: '0',
      monthlyBonus: '0',
      dailyWorkHours: '8',
      weeklyWorkDays: '5',
      hourlyRate: '0',
    },
  });

  useEffect(() => {
    const salaryDataJson = localStorage.getItem(SALARY_DATA);

    if (salaryDataJson) {
      const defaultValues = JSON.parse(salaryDataJson);

      form.setValue('monthlySalary', defaultValues.monthlySalary)
      form.setValue('monthlyBonus', defaultValues.monthlyBonus)
      form.setValue('dailyWorkHours', defaultValues.dailyWorkHours)
      form.setValue('weeklyWorkDays', defaultValues.weeklyWorkDays)
      form.setValue('hourlyRate', defaultValues.hourlyRate)
    }

  }, [])


  const onSave = (values) => {
    // Handle form submission
    const { hourlyRate } = form.getValues();

    if (hourlyRate == 0) {
      form.setError('hourlyRate', {
        type: 'manual',
        message: 'Please calculate the hourly wage before saving.'
      });

      return;
    }

    // save hourly wage to localstore
    localStorage.setItem(HOURLY_WAGE, hourlyRate);

    const salaryData = form.getValues();
    localStorage.setItem(SALARY_DATA, JSON.stringify(salaryData));

    toast({
      title: "Save success!",
    })
  };

  const calculateHourlyRate = () => {
    const { monthlySalary, monthlyBonus, dailyWorkHours, weeklyWorkDays } = form.getValues();
    const totalMonthlyIncome = monthlySalary + (monthlyBonus || 0);
    const monthlyWorkHours = dailyWorkHours * weeklyWorkDays * 4.33; // Assuming 4.33 weeks per month
    const hourlyRate = (totalMonthlyIncome / monthlyWorkHours).toFixed(2);
    form.setValue("hourlyRate", hourlyRate);
  };

  return (
    <div className="mx-auto my-9 flex-1 w-[350px] md:w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle className="">Personal Information</CardTitle>
          <CardDescription>
            Update your income and work details.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(calculateHourlyRate)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="monthlySalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your monthly salary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyBonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Bonus (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your monthly bonus" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dailyWorkHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Work Hours</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your daily work hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weeklyWorkDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekly Work Days</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your weekly work days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" variant="secondary" className="w-full" onClick={calculateHourlyRate}>
                  Calculate
                </Button>
              </div>
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Wage</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Calculated hourly wage" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={onSave} className="w-full">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Toaster />
    </div>
  );
}