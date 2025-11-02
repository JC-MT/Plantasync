import { redirect } from "react-router";
import InputForm from "../../components/InputForm";
import Scanner from "../../components/Scanner";
import PageContainer from "~/layout/PageContainer.js";
import { Image } from "../../components/Image";
import { getScannerResults } from "../../utils/plantNetAPI";
import { postData } from "../../db/query";
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
  const headers = new Headers({ "Content-Type": "application/json" });
  try {
    const formData = await request.formData();
    const intent = formData.get("intent");
    formData.delete("intent");

    if (intent === "scan") {
      const result = await getScannerResults(formData);
      return new Response(
        JSON.stringify(!result.ok ? { error: result.error } : result),
        {
          status: result.ok ? 200 : 400,
          headers
        }
      );
    }

    if (intent === "add") {
      // Remove image until image handling is implemented
      formData.delete("image");
      const data = Object.fromEntries(formData.entries());

      try {
        const result = await postData("garden", data);
        return redirect("/plants/" + result[0].id);
      } catch (error) {
        console.error("Database error:", error);
        return new Response(
          JSON.stringify({
            error: error || "Failed to add plant"
          }),
          { status: 400, headers }
        );
      }
    }
    return new Response(JSON.stringify({ error: "Invalid intent" }), {
      status: 400,
      headers
    });
  } catch (error) {
    if (error instanceof Response) throw error;

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers
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
      <section className="grid md:grid-cols-[40%_auto] gap-5 md:gap-10">
        <Image
          imageUrl="planta_campaign.jpg?v=1735059317"
          classNames="aspect-square md:aspect-auto object-[0%_42%] w-full h-auto rounded-lg object-cover bg-slate-300 shadow-md"
          sizes="(min-width: 768px) 20vw, 90vw"
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
            <InputForm />
          </TabsContent>
          <TabsContent
            value="scan"
            className="flex items-center justify-center"
            tabIndex={-1}
          >
            <Scanner className="grid gap-5 pr-5" />
          </TabsContent>
        </Tabs>
      </section>
    </PageContainer>
  );
}
