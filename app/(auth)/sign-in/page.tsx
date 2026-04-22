import { LoginForm } from "@/components/forms/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign in"
};

export default function Login() {
	return (

		<LoginForm />

	);
}