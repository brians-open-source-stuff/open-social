"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useActionState } from "react";
import postAction from "./post-action";
import { Textarea } from "@/components/ui/textarea";
import { FiFeather } from "react-icons/fi";

export default function PostForm() {
	const [formState, formAction, pending] = useActionState(postAction, {});

	return (
		<form action={formAction}>
			<FieldGroup>
				<Field>
					<FieldLabel className="flex flex-col items-start">
						<span>What's on your mind?</span>
						<Textarea name="content" />
					</FieldLabel>
				</Field>
				<Button type="submit"><FiFeather /> Post</Button>
			</FieldGroup>
		</form>
	);
}