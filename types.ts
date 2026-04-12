export type formErrorType = {
	errors?: String[];
};

export type signinFormState = {
	errors?: [];
	properties?: {};
	success?: Boolean;
	data?: {
		email?: String;
		password?: String;
	};
};

export type signupFormState = {
	errors?: [];
	properties?: {
		email?: formErrorType;
		password?: formErrorType;
		confirmPassword?: formErrorType;
	};
	success?: Boolean;
	data?: {
		email?: String;
		password?: String;
		confirmPassword?: String;
	};
};