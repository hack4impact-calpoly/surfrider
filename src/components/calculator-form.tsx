"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalculateInput } from "@/schema/api";
import { Location, PowerPlantClass } from "@/schema/egrid";
import { z } from "zod";

const powerPlantOptions = PowerPlantClass.options;
const locationOptions = Location.options;

const currentYear = new Date().getFullYear();

export const CalculateInputSchema = z.object({
  installedCapacity: z.number().min(0, { message: "Installed capacity must be at least 0" }).default(0),
  powerPlantClass: z.string().min(1, { message: "Please select a classification" }).default(""),
  location: z.string().min(1, { message: "Location selection required" }).default(""),
  capacityFactor: z
    .number()
    .min(0, { message: "Capacity factor must be at least 0" })
    .max(1, { message: "Capacity factor cannot exceed 1" })
    .default(0),
  population2070: z.number().min(0, { message: "Population must be at least 0" }).default(0),
  startYear: z
    .number()
    .min(currentYear, { message: `Start year must be at least ${currentYear}` })
    .default(currentYear),
  lifeTimeYears: z.number().min(1, { message: "Lifetime must be at least 1 year" }).default(30),
  yearOfStudy: z
    .number()
    .min(currentYear, { message: `Year of study must be at least ${currentYear}` })
    .default(currentYear),
});

export default function CalculatorForm() {
  const form = useForm({
    resolver: zodResolver(CalculateInput),
  });

  const onSubmit = (values: unknown) => {
    // TODO: Implement API request to /api/calculate
    console.log("Submitted", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border rounded-lg shadow-lg bg-white max-w-5xl mx-auto items-start"
      >
        <h2 className="text-xl font-semibold text-slate-900 text-center col-span-full">Energy Calculator</h2>

        <FormField
          control={form.control}
          name="installedCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Installed Capacity (kW)</FormLabel>
              <FormControl>
                <Input type="number" step="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="powerPlantClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Power Plant Classification</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-gray-300">
                  <SelectValue placeholder="Select Classification" />
                </SelectTrigger>
                <SelectContent>
                  {powerPlantOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-gray-300">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacityFactor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity Factor</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="population2070"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Population in 2070</FormLabel>
              <FormControl>
                <Input type="number" step="1" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Year</FormLabel>
              <FormControl>
                <Input type="number" step="1" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lifeTimeYears"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lifetime (years)</FormLabel>
              <FormControl>
                <Input type="number" step="1" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Study</FormLabel>
              <FormControl>
                <Input type="number" step="1" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex self-end">
          <Button type="submit" className="w-full">
            Calculate
          </Button>
        </div>
      </form>
    </Form>
  );
}
