"use server";

import { profileFormState } from "@/types";

export default async function profileAction(prevState: profileFormState, formData: FormData): Promise<profileFormState> {
	//const { firstname } = Object.fromEntries(formData);
	console.log("action", formData);
	return {
		success: true,
		data: {}
	};
}