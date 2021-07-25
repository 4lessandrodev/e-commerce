interface Term {
	acceptedAt: Date;
	browser: string;
	ip: string;
	os: string;
	termVersion: string;
}
export interface SignUpDto {
	email: string;
	password: string;
	acceptedTerm: boolean;
	term: Term;
}
