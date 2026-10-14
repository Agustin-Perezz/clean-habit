"use client";

import type { VariantProps } from "class-variance-authority";
import { useFormStatus } from "react-dom";
import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

type FocusObjectivePendingButtonProps = VariantProps<typeof buttonVariants> & {
  label: string;
  pendingLabel: string;
};

export function FocusObjectivePendingButton({
  label,
  pendingLabel,
  variant,
}: FocusObjectivePendingButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending}
      className="w-full"
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}
