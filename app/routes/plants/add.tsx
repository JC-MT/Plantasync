import { redirect } from "react-router";
import type { Route } from "./+types/add";
import { postData } from "../../db/query";
import Scanner from "../../components/Scanner";
import { Image } from "../../components/Image";
import { AddForm } from "../../components/Forms";
import PageContainer from "~/layout/PageContainer.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export function meta() {
  return [
    { title: "Plantasync — Add a new plant" },
    { name: "description", content: "Add a new plant to your garden" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const plant = await postData("garden", formData);
    
    return redirect("/plants/" + plant[0].id);
  } catch (error) {
    return new Response(`error: ${error || "Failed to add plant"}`, {
      status: 400,
    });
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
      <section className="grid grid-cols-1 sm:grid-cols-[40%_auto] gap-2 sm:gap-5 md:gap-10 lg:gap-16">
        <Image
          imageUrl="planta_campaign.jpg?v=1735059317"
          classNames="aspect-square md:aspect-auto object-[0%_42%] w-full h-auto rounded-lg object-cover bg-slate-300 shadow-md"
          sizes="(min-width: 768px) 40vw, 90vw"
          alt="Planta campaign image"
          loading="eager"
          fetchpriority="high"
          isHero={false}
          width={1639}
          height={2458}
          viewTransition={undefined}
        />
        <Tabs defaultValue="form">
          <TabsList>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="scan">Scanner</TabsTrigger>
          </TabsList>
          <TabsContent value="form" tabIndex={-1}>
            <AddForm />
          </TabsContent>
          <TabsContent
            value="scan"
            className="flex items-center justify-center"
            tabIndex={-1}
          >
            <Scanner className="grid gap-5 pr-4" />
          </TabsContent>
        </Tabs>
      </section>
    </PageContainer>
  );
}
