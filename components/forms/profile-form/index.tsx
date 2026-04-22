"use client";

import { useActionState, useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { OwnUserProfile, profileFormState, profileFormValues } from "@/types";
import profileAction from "./profile-action";
import { Button } from "@/components/ui/button";

export default function ProfileForm({ profile }: { profile: OwnUserProfile }) {
	const { firstname, lastname, nickname, user: { email } } = profile;
	const [formState, formAction, pending] = useActionState<profileFormState, FormData>(profileAction, {});

	return (
		<form action={formAction}>
			<FieldGroup>
				<Field>
					<FieldLabel className="flex flex-col items-start">
						<span>First Name</span>
						<Input type="text" name="firstname" defaultValue={firstname as string} />
					</FieldLabel>
				</Field>
				<Field>
					<FieldLabel className="flex flex-col items-start">
						<span>Last Name</span>
						<Input type="text" name="lastname" defaultValue={lastname as string} />
					</FieldLabel>
				</Field>
				<Field>
					<FieldLabel className="flex flex-col items-start">
						<span>Nickname</span>
						<Input type="text" name="nickname" defaultValue={nickname as string} />
						<FieldDescription>
							Your nick name is what other users see instead of your first and last name.
						</FieldDescription>
					</FieldLabel>
				</Field>
				<Field>
					<FieldLabel className="flex flex-col items-start">
						<span>E-mail</span>
						<Input type="email" defaultValue={email as string} />
					</FieldLabel>
				</Field>
			</FieldGroup>
			<Button type="submit">Save</Button>
		</form>
	);
}