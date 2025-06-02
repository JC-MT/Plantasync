import { Form } from "react-router";
import { InputForm } from "../../components/InputForm";
import PageContainer from "~/layout/PageContainer.js";

export function meta() {
  return [
    { title: "Plantasync — Add a new plant" },
    { name: "description", content: "Add a new plant to your garden" }
  ];
}

export default function Add() {
  return (
    <PageContainer>
      <h1 className="text-3xl/none md:text-5xl font-bold tracking-tight">
        Add a new plant
      </h1>
      <Form action="/add" method="post">
        <InputForm />
      </Form>
    </PageContainer>
  );
}
