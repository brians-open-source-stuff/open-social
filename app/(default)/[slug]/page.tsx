import ProfileForm from "@/components/forms/profile-form";
import { getUserProfile } from "@/data/profile-dto";
import { Metadata } from "next"
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Profile",
}

export default async function Profile({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const profile = await getUserProfile(slug);

	if (!profile) notFound();

	return (
		<>
			<h1>Profile</h1>
			{profile.kind === "public" ? (
				<p>{profile.firstname} {profile.lastname}</p>
			) : (
				<ProfileForm profile={profile} />
			)}
		</>
	);
}