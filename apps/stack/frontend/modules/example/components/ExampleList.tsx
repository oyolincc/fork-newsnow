import type { Example } from "@newsnow/definition/frontend";

export function ExampleList({ examples }: { examples?: Example[] }) {
  return (
    <ul className="grid gap-2">
      {examples?.map((example) => (
        <li className="rounded border border-zinc-800 p-3" key={example.id}>
          {example.message}
        </li>
      ))}
    </ul>
  );
}
