import { Button, Html, Text } from "@react-email/components";
import * as React from "react";

type ConfirmEmailProps = {
  url: string;
  name: string;
};

export default function ConfirmEmail({ url, name }: ConfirmEmailProps) {
  return (
    <Html>
      <Text>{name}</Text>
      <Button
        href={url}
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}
