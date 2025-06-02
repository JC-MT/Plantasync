const { VITE_PLANT_NET_KEY, VITE_PLANT_NET_URL } = import.meta.env;
import { Form } from "react-router";
import InputForm from "../../components/InputForm";
import Scanner from "../../components/Scanner";
import PageContainer from "~/layout/PageContainer.js";
import type { Route } from "./+types/add";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../components/ui/tabs";

export function meta() {
  return [
    { title: "Plantasync — Add a new plant" },
    { name: "description", content: "Add a new plant to your garden" }
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  if (!formData.get("images"))
    return {
      ok: false,
      error: "No file provided. Please select an image file before scanning."
    };

  try {
    const response = await fetch(
      `${VITE_PLANT_NET_URL}?api-key=${VITE_PLANT_NET_KEY}`,
      {
        method: "POST",
        body: formData
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { ok: true, data };
    } else {
      return { ok: false, error: `API Error: ${response.status}` };
    }
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

export default function Add() {
  return (
    <PageContainer>
      <div className="grid gap-2 mb-4">
        <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight">
          Add a new plant
        </h1>
        <p className="text-base md:text-xl">
          You can either add your plants via this form or simply scan it and
          we'll identify it for you.
        </p>
      </div>
      <Tabs defaultValue="form" className="max-w-3xl mx-auto">
        <TabsList className="">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="scan">Scanner</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <InputForm />
        </TabsContent>
        <TabsContent value="scan" className="flex items-center justify-center">
          <Scanner className="grid w-full items-center gap-3" />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
