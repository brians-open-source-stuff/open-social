export type formErrorType = {
	errors?: string[];
};

export type signinFormState = {
	errors?: [];
	properties?: {
		email?: formErrorType;
		password?: formErrorType;
	};
	success?: boolean;
	data?: {
		email?: string;
		password?: string;
	};
};

export type signupFormState = {
	errors?: [];
	properties?: {
		email?: formErrorType;
		password?: formErrorType;
		confirmPassword?: formErrorType;
	};
	success?: boolean;
	data?: {
		email?: string;
		password?: string;
		confirmPassword?: string;
	};
};

export type profileFormState = {
	errors?: [];
	properties?: {
		firstname?: string;
		lastname?: string;
		nickname?: string;
		email?: string;
	};
	success?: boolean;
	data?: profileFormValues;
};

export type profileFormValues = {
	firstname?: string | null;
	lastname?: string | null;
	nickname?: string | null;
	email?: string | null;
}

export type OwnUserProfile = {
	kind: "self";
	id: string;
	firstname: string | null;
	lastname: string | null;
	nickname: string | null;
	avatar: string | null;
	user: { id: string; email: string; };
};

export type PublicUserProfile = {
	kind: "public";
	id: string;
	firstname: string | null;
	lastname: string | null;
	avatar: string | null;
};

export type UserProfile = OwnUserProfile | PublicUserProfile | null;