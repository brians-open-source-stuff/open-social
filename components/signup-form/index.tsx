"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import signupAction from "./signup-action"
import { formErrorType, signupFormState } from "@/types";

function Label({children, status}: { children: Readonly<React.ReactNode>, status: formErrorType }) {
  return (
     <span>
      {children}
      &nbsp;
      {status && <span className="text-red-500">{status.errors}</span>}
    </span>
  )
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [formState, formAction, pending] = useActionState(signupAction, {} as signupFormState);

  useEffect(function() {
    console.log("formState", formState);
  }, [formState]);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel className="flex flex-col items-start">
                <Label status={formState.properties?.email}>Email</Label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  required
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your email
                  with anyone else.
                </FieldDescription>
              </FieldLabel>
            </Field>
            <Field>
              <FieldLabel className="flex flex-col items-start">
                <Label status={formState.properties?.password}>Password</Label>
                <Input name="password" type="password" placeholder="••••••••" required />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </FieldLabel>
            </Field>
            <Field>
              <FieldLabel className="flex flex-col items-start">
                <Label status={formState.properties?.confirmPassword}>Confirm Password</Label>
                <Input name="confirmPassword" type="password" placeholder="••••••••" required />
                <FieldDescription>Please confirm your password.</FieldDescription>
              </FieldLabel>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
