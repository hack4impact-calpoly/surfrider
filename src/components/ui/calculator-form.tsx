"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

//form schema
const formSchema = z.object({
  installedCapacity: z.number(),
  powerPlantClass: z.string(),
  location: z.string(),
  capacityFactor: z.coerce.number(),
  population2070: z.coerce.number(),
  startYear: z.coerce.number(),
  lifeTimeYears: z.coerce.number(),
  yearOfStudy: z.coerce.number(),
});

const powerPlantOptions = ["Offshore Wind", "Solar PV", "Hydropower", "Nuclear", "Coal", "Natural Gas"];
const locationOptions = ["USA", "Europe", "Asia", "Other"];

export default function CalculatorForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      installedCapacity: 0,
      powerPlantClass: "",
      location: "",
      capacityFactor: 0,
      population2070: 0,
      startYear: 2025,
      lifeTimeYears: 30,
      yearOfStudy: 2025,
    },
  });

  const onSubmit = (values: unknown) => {
    console.log("Submitted", values);
  };

  //not 100% positive on how to follow figma
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border rounded-lg shadow-lg bg-white max-w-lg mx-auto"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center">Energy Calculator</h2>

        <FormField
          control={form.control}
          name="installedCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Installed Capacity (MW)</FormLabel>
              <FormControl>
                <Input type="number" step="1" {...field} className="input-field" />
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
              <FormLabel>Power Plant Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Power Plant Class" />
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
                <SelectTrigger>
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
              <FormLabel>Capacity Factor (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {">"}

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
              <FormLabel>Lifetime (Years)</FormLabel>
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

        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Submit
        </Button>
      </form>
    </Form>
  );
}
