import { useFetcher } from "react-router";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export default function Scanner({
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  let fetcher = useFetcher();

  return (
    <section className="space-y-8 p-10 bg-white rounded-lg shadow-md w-full self-start">
      <fetcher.Form
        method="post"
        action="/plants/add"
        encType="multipart/form-data"
        {...props}
      >
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          name="images"
          accept="image/*"
          required
        />
        <input type="hidden" name="intent" value="scan" />
        <Button type="submit" disabled={fetcher.state === "submitting"}>
          {fetcher.state === "submitting" ? "Scanning..." : "Scan"}
        </Button>
      </fetcher.Form>
      {fetcher.data && (
        <div className="mt-4 p-4 border rounded">
          {fetcher.data.ok ? (
            <div>
              <h3 className="font-semibold text-green-600">Scan Results:</h3>
              <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(fetcher.data.data, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-red-600">Error:</h3>
              <p className="text-red-500">{fetcher.data.error}</p>
              {fetcher.data.details && (
                <pre className="mt-2 text-xs bg-red-50 p-2 rounded">
                  {JSON.stringify(fetcher.data.details, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
