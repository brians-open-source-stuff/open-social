import { SignupForm } from "@/components/forms/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up"
};

export default function Register() {
  return <SignupForm />
}