import { Button, Html, Tailwind } from "@react-email/components";
import * as React from "react";


export const EmailTemplate3: React.FC = () => (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Html>
        <Button
          href="https://example.com"
          className="bg-red-400 text-white py-3 px-5"
        >
          Click 2
        </Button>
      </Html>
    </Tailwind>
  );;